import { useState } from "react";
import { generateKey, exportKey, encryptFile } from "../utils/crypto";
import { mockArweaveUpload, saveVaultIndex } from "../utils/storage";

export const UPLOAD_STEPS = ["encrypt", "pay", "upload", "finalize"];

export const useFileUpload = (showNotification) => {
  const [uploading, setUploading] = useState(false);
  const [vaultKey, setVaultKey] = useState("");
  const [uploadStep, setUploadStep] = useState(null); // null | 'encrypt' | 'pay' | 'upload' | 'finalize' | 'done'
  const [stepProgress, setStepProgress] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  const handleUpload = async (files, paymentMethod) => {
    if (files.length === 0) return;

    setUploading(true);
    setTotalFiles(files.length);
    setCurrentFileIndex(0);

    try {
      const masterKey = await generateKey();
      const masterKeyHex = await exportKey(masterKey);
      const uploadedFiles = [];

      for (let idx = 0; idx < files.length; idx++) {
        const file = files[idx];
        setCurrentFileIndex(idx + 1);

        // Step 1: Encrypt
        setUploadStep("encrypt");
        setStepProgress(0);
        const encrypted = await encryptFile(file, masterKey, (p) => setStepProgress(p));

        // Step 2: Payment (already done via modal, just show briefly)
        setUploadStep("pay");
        setStepProgress(0);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setStepProgress(100);
        await new Promise((resolve) => setTimeout(resolve, 400));

        // Step 3: Upload to Arweave
        setUploadStep("upload");
        setStepProgress(0);
        const txId = await mockArweaveUpload(encrypted, (p) => setStepProgress(p));

        uploadedFiles.push({
          name: file.name,
          txId,
          iv: encrypted.iv,
          type: file.type,
          size: file.size,
          chunks: encrypted.chunks,
        });
      }

      // Step 4: Finalize vault
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

      const vaultIndexTxId = saveVaultIndex(vaultIndex);
      const generatedVaultKey = `vault://${vaultIndexTxId}#${masterKeyHex}`;
      setStepProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setVaultKey(generatedVaultKey);
      setUploadStep("done");
      showNotification("success", `Successfully uploaded ${files.length} file(s) to your vault!`);
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
