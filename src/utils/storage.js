export const mockArweaveUpload = async (encryptedFile, onProgress) => {
  const steps = 10;
  for (let i = 1; i <= steps; i++) {
    await new Promise((resolve) => setTimeout(resolve, 150 + Math.random() * 100));
    if (onProgress) onProgress(Math.round((i / steps) * 100));
  }

  const txId = "aw_" + Math.random().toString(36).substr(2, 43);

  const fileData = {
    data: Array.from(new Uint8Array(encryptedFile.data)),
    iv: encryptedFile.iv,
    name: encryptedFile.name,
    type: encryptedFile.type,
    size: encryptedFile.size,
    chunks: encryptedFile.chunks || 1,
    txId,
    uploadedAt: new Date().toISOString(),
  };

  localStorage.setItem(`vault3_${txId}`, JSON.stringify(fileData));
  return txId;
};

export const retrieveFromArweave = (txId) => {
  const data = localStorage.getItem(`vault3_${txId}`);
  return data ? JSON.parse(data) : null;
};

export const saveVaultIndex = (vaultIndex) => {
  const vaultIndexTxId = "vi_" + Math.random().toString(36).substr(2, 43);
  localStorage.setItem(
    `vault3_index_${vaultIndexTxId}`,
    JSON.stringify(vaultIndex)
  );
  return vaultIndexTxId;
};

export const getVaultIndex = (vaultIndexTxId) => {
  const data = localStorage.getItem(`vault3_index_${vaultIndexTxId}`);
  return data ? JSON.parse(data) : null;
};
