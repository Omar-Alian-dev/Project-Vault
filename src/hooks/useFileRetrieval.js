import { useState } from "react";
import { getVaultIndex, retrieveFromArweave } from "../utils/storage";

export const useFileRetrieval = (showNotification) => {
  const [retrieving, setRetrieving] = useState(false);
  const [retrievedFiles, setRetrievedFiles] = useState([]);

  const handleRetrieve = async (inputKey) => {
    if (!inputKey.startsWith("vault://")) {
      showNotification("error", "Invalid vault key format");
      return;
    }

    setRetrieving(true);
    try {
      const [vaultIndexTxId, masterKeyHex] = inputKey
        .replace("vault://", "")
        .split("#");

      const vaultIndex = getVaultIndex(vaultIndexTxId);
      if (!vaultIndex) {
        showNotification("error", "Vault not found");
        setRetrieving(false);
        return;
      }

      const filesWithDecryption = [];

      for (const fileInfo of vaultIndex.files) {
        const fileData = retrieveFromArweave(fileInfo.txId);
        if (fileData) {
          filesWithDecryption.push({
            ...fileInfo,
            encryptedData: new Uint8Array(fileData.data),
            masterKey: masterKeyHex,
          });
        }
      }

      setRetrievedFiles(filesWithDecryption);
      showNotification(
        "success",
        `Retrieved ${filesWithDecryption.length} file(s) from vault!`
      );
    } catch (error) {
      console.error("Retrieval failed:", error);
      showNotification(
        "error",
        "Failed to retrieve vault. Please check your vault key."
      );
    } finally {
      setRetrieving(false);
    }
  };

  return { retrieving, retrievedFiles, setRetrievedFiles, handleRetrieve };
};
