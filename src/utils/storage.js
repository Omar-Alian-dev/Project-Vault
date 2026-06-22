import { WebUploader } from "@irys/web-upload";
import { WebEthereum } from "@irys/web-upload-ethereum";

const IRYS_GATEWAY = "https://gateway.irys.xyz";
const ARWEAVE_GATEWAY = "https://arweave.net";

// MetaMask path: initialise Irys browser uploader
export const getIrysUploader = async () => {
  const irys = await WebUploader(WebEthereum).withProvider(window.ethereum);
  return irys;
};

// Upload encrypted file bytes to Arweave
// MetaMask → direct Irys | Credit card → server-funded | Neither → localStorage mock
export const uploadToArweave = async (
  encryptedFile,
  irys,
  onProgress,
  uploadToken,
) => {
  if (!irys && uploadToken) {
    return uploadToArweaveViaServer(encryptedFile, uploadToken, onProgress);
  }
  if (!irys) return mockArweaveUpload(encryptedFile, onProgress);

  const data = new Uint8Array(encryptedFile.data);
  const receipt = await irys.upload(data, {
    tags: [
      { name: "Content-Type", value: "application/octet-stream" },
      { name: "App-Name", value: "Project-Vault" },
      { name: "App-Version", value: "3" },
    ],
  });
  if (onProgress) onProgress(100);
  return receipt.id;
};

// Upload vault index JSON to Arweave
export const saveVaultIndex = async (vaultIndex, irys, uploadToken) => {
  if (!irys && uploadToken) {
    return saveVaultIndexViaServer(vaultIndex, uploadToken);
  }

  if (!irys) {
    const vaultIndexTxId = "vi_" + Math.random().toString(36).substr(2, 43);
    localStorage.setItem(
      `vault3_index_${vaultIndexTxId}`,
      JSON.stringify(vaultIndex),
    );
    return vaultIndexTxId;
  }

  const receipt = await irys.upload(JSON.stringify(vaultIndex), {
    tags: [
      { name: "Content-Type", value: "application/json" },
      { name: "App-Name", value: "Project-Vault" },
      { name: "Type", value: "vault-index" },
      { name: "App-Version", value: "3" },
    ],
  });
  return receipt.id;
};

// Server-funded upload helpers (credit-card path)
const serverUploadHeaders = (uploadToken) => ({
  Authorization: `Bearer ${uploadToken}`,
});

async function uploadToArweaveViaServer(
  encryptedFile,
  uploadToken,
  onProgress,
) {
  if (onProgress) onProgress(10);

  const bytes = new Uint8Array(encryptedFile.data);
  const res = await fetch("/api/upload-to-arweave", {
    method: "POST",
    headers: {
      ...serverUploadHeaders(uploadToken),
      "Content-Type": "application/octet-stream",
    },
    body: bytes,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Server upload failed.");
  }

  if (onProgress) onProgress(100);
  const { txId } = await res.json();
  return txId;
}

async function saveVaultIndexViaServer(vaultIndex, uploadToken) {
  const res = await fetch("/api/upload-vault-index", {
    method: "POST",
    headers: {
      ...serverUploadHeaders(uploadToken),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ vaultIndex }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Server vault index upload failed.");
  }

  const { txId } = await res.json();
  return txId;
}

// Retrieve encrypted file bytes from Arweave
export const retrieveFromArweave = async (txId) => {
  if (txId.startsWith("aw_")) {
    const data = localStorage.getItem(`vault3_${txId}`);
    return data ? JSON.parse(data) : null;
  }

  for (const gateway of [IRYS_GATEWAY, ARWEAVE_GATEWAY]) {
    try {
      const res = await fetch(`${gateway}/${txId}`);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        return { data: Array.from(new Uint8Array(buffer)) };
      }
    } catch (_) {}
  }
  return null;
};

// Retrieve vault index JSON from Arweave
export const getVaultIndex = async (vaultIndexTxId) => {
  if (vaultIndexTxId.startsWith("vi_")) {
    const data = localStorage.getItem(`vault3_index_${vaultIndexTxId}`);
    return data ? JSON.parse(data) : null;
  }

  for (const gateway of [IRYS_GATEWAY, ARWEAVE_GATEWAY]) {
    try {
      const res = await fetch(`${gateway}/${vaultIndexTxId}`);
      if (res.ok) return res.json();
    } catch (_) {}
  }
  return null;
};

// Mock fallback — only used when no wallet AND no upload token
export const mockArweaveUpload = async (encryptedFile, onProgress) => {
  const steps = 10;
  for (let i = 1; i <= steps; i++) {
    await new Promise((resolve) =>
      setTimeout(resolve, 150 + Math.random() * 100),
    );
    if (onProgress) onProgress(Math.round((i / steps) * 100));
  }

  const txId = "aw_" + Math.random().toString(36).substr(2, 43);
  localStorage.setItem(
    `vault3_${txId}`,
    JSON.stringify({
      data: Array.from(new Uint8Array(encryptedFile.data)),
      iv: encryptedFile.iv,
      name: encryptedFile.name,
      type: encryptedFile.type,
      size: encryptedFile.size,
      chunks: encryptedFile.chunks || 1,
      txId,
      uploadedAt: new Date().toISOString(),
    }),
  );
  return txId;
};
