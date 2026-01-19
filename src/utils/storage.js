export const mockArweaveUpload = async (encryptedFile) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 2000)
  );
  const txId = "aw_" + Math.random().toString(36).substr(2, 43);

  const fileData = {
    data: Array.from(new Uint8Array(encryptedFile.data)),
    iv: encryptedFile.iv,
    name: encryptedFile.name,
    type: encryptedFile.type,
    size: encryptedFile.size,
    txId,
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
