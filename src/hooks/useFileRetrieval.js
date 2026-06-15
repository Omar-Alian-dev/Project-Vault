import { useState } from "react";
import { getVaultIndex, retrieveFromArweave } from "../utils/storage";

export const useFileRetrieval = (showNotification) => {
  const [retrieving, setRetrieving] = useState(false);
  const [retrievedFiles, setRetrievedFiles] = useState([]);
  const [retrieveStep, setRetrieveStep] = useState(null);
  const [retrieveProgress, setRetrieveProgress] = useState(0);

  const handleRetrieve = async (inputKey) => {
    if (!inputKey.startsWith("vault://")) {
      showNotification("error", "Invalid vault key format. Must start with vault://");
      return;
    }

    setRetrieving(true);
    setRetrievedFiles([]);

    try {
      const [vaultIndexTxId, masterKeyHex] = inputKey.replace("vault://", "").split("#");

      if (!vaultIndexTxId || !masterKeyHex) {
        showNotification("error", "Malformed vault key — missing index or encryption key.");
        setRetrieving(false);
        return;
      }

      setRetrieveStep("fetch");
      setRetrieveProgress(20);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const vaultIndex = getVaultIndex(vaultIndexTxId);
      if (!vaultIndex) {
        showNotification("error", "Vault not found. The key may be from a different session.");
        setRetrieving(false);
        setRetrieveStep(null);
        return;
      }

      setRetrieveProgress(60);
      await new Promise((resolve) => setTimeout(resolve, 400));

      const filesWithDecryption = [];
      for (const fileInfo of vaultIndex.files) {
        const fileData = retrieveFromArweave(fileInfo.txId);
        if (fileData) {
          filesWithDecryption.push({
            ...fileInfo,
            encryptedData: new Uint8Array(fileData.data),
            masterKey: masterKeyHex,
            uploadedAt: fileData.uploadedAt,
          });
        }
      }

      setRetrieveProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setRetrievedFiles(filesWithDecryption);
      setRetrieveStep("done");
      showNotification("success", `Retrieved ${filesWithDecryption.length} file(s) from vault!`);
    } catch (error) {
      console.error("Retrieval failed:", error);
      showNotification("error", "Failed to retrieve vault. Please check your vault key.");
      setRetrieveStep(null);
    } finally {
      setRetrieving(false);
    }
  };

  return {
    retrieving,
    retrievedFiles,
    setRetrievedFiles,
    handleRetrieve,
    retrieveStep,
    retrieveProgress,
  };
};
