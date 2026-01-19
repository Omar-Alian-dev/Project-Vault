import { useState } from "react";
import { generateKey, exportKey, encryptFile } from "../utils/crypto";
import { mockArweaveUpload, saveVaultIndex } from "../utils/storage";

export const useFileUpload = (showNotification) => {
  const [uploading, setUploading] = useState(false);
  const [vaultKey, setVaultKey] = useState("");

  const handleUpload = async (files) => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      const masterKey = await generateKey();
      const masterKeyHex = await exportKey(masterKey);

      const uploadedFiles = [];

      for (const file of files) {
        showNotification("info", `Encrypting ${file.name}...`);
        const encrypted = await encryptFile(file, masterKey);

        showNotification("info", `Uploading ${file.name} to Arweave...`);
        const txId = await mockArweaveUpload(encrypted);

        uploadedFiles.push({
          name: file.name,
          txId,
          iv: encrypted.iv,
          type: file.type,
          size: file.size,
        });
      }

      const vaultIndex = {
        files: uploadedFiles,
        created: new Date().toISOString(),
        version: 1,
      };

      const vaultIndexTxId = saveVaultIndex(vaultIndex);
      const generatedVaultKey = `vault://${vaultIndexTxId}#${masterKeyHex}`;
      setVaultKey(generatedVaultKey);

      showNotification(
        "success",
        `Successfully uploaded ${files.length} file(s) to your vault!`
      );
    } catch (error) {
      console.error("Upload failed:", error);
      showNotification("error", "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return { uploading, vaultKey, setVaultKey, handleUpload };
};

// ============================================
// src/hooks/useFileRetrieval.js
// ============================================
