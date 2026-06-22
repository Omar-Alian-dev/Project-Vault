import { useState } from "react";
import { generateKey, exportKey, encryptFile } from "../utils/crypto";
import {
  getIrysUploader,
  uploadToArweave,
  saveVaultIndex,
} from "../utils/storage";

export const UPLOAD_STEPS = ["encrypt", "pay", "upload", "finalize"];

export const useFileUpload = (showNotification) => {
  const [uploading, setUploading] = useState(false);
  const [vaultKey, setVaultKey] = useState("");
  const [uploadStep, setUploadStep] = useState(null);
  const [stepProgress, setStepProgress] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  const handleUpload = async (files, paymentMethod, uploadToken) => {
    if (files.length === 0) return;

    setUploading(true);
    setTotalFiles(files.length);
    setCurrentFileIndex(0);

    try {
      let irys = null;
      if (paymentMethod === "metamask" && window.ethereum) {
        try {
          irys = await getIrysUploader();
        } catch (err) {
          console.warn("Irys init failed, falling back to mock storage:", err);
          showNotification(
            "info",
            "Arweave uploader unavailable — using local storage fallback.",
          );
        }
      }

      const masterKey = await generateKey();
      const masterKeyHex = await exportKey(masterKey);
      const uploadedFiles = [];

      for (let idx = 0; idx < files.length; idx++) {
        const file = files[idx];
        setCurrentFileIndex(idx + 1);

        setUploadStep("encrypt");
        setStepProgress(0);
        const encrypted = await encryptFile(file, masterKey, (p) =>
          setStepProgress(p),
        );

        setUploadStep("pay");
        setStepProgress(0);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setStepProgress(100);
        await new Promise((resolve) => setTimeout(resolve, 400));

        setUploadStep("upload");
        setStepProgress(0);
        const txId = await uploadToArweave(
          encrypted,
          irys,
          (p) => setStepProgress(p),
          uploadToken,
        );

        uploadedFiles.push({
          name: file.name,
          txId,
          iv: encrypted.iv,
          type: file.type,
          size: file.size,
          chunks: encrypted.chunks,
          uploadedAt: new Date().toISOString(),
        });
      }

      setUploadStep("finalize");
      setStepProgress(0);
      await new Promise((resolve) => setTimeout(resolve, 400));
      setStepProgress(50);

      const vaultIndex = {
        files: uploadedFiles,
        created: new Date().toISOString(),
        paymentMethod: paymentMethod || "credit_card",
        version: 2,
      };

      const vaultIndexTxId = await saveVaultIndex(
        vaultIndex,
        irys,
        uploadToken,
      );
      const generatedVaultKey = `vault://${vaultIndexTxId}#${masterKeyHex}`;
      setStepProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setVaultKey(generatedVaultKey);
      setUploadStep("done");
      showNotification(
        "success",
        `Successfully uploaded ${files.length} file(s) to your vault!`,
      );
    } catch (error) {
      console.error("Upload failed:", error);
      showNotification("error", "Upload failed. Please try again.");
      setUploadStep(null);
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    vaultKey,
    setVaultKey,
    handleUpload,
    uploadStep,
    stepProgress,
    currentFileIndex,
    totalFiles,
    setUploadStep,
  };
};
