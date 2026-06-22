import { WebUploader } from "@irys/web-upload";
import { WebEthereum } from "@irys/web-upload-ethereum";

const IRYS_GATEWAY = "https://gateway.irys.xyz";
const ARWEAVE_GATEWAY = "https://arweave.net";

// --- Irys (Bundlr) uploader initialisation ---

export const getIrysUploader = async () => {
  const irys = await WebUploader(WebEthereum).withProvider(window.ethereum);
  return irys;
};

// --- Upload encrypted file bytes to Arweave via Irys ---

export const uploadToArweave = async (encryptedFile, irys, onProgress) => {
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

// --- Upload vault index JSON to Arweave via Irys ---

export const saveVaultIndex = async (vaultIndex, irys) => {
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

// --- Retrieve encrypted file bytes from Arweave ---

export const retrieveFromArweave = async (txId) => {
  // Legacy: mock txIds stored in localStorage
  if (txId.startsWith("aw_")) {
    const data = localStorage.getItem(`vault3_${txId}`);
    return data ? JSON.parse(data) : null;
  }

  // Try Irys gateway first (instant for recent uploads), then Arweave
  for (const gateway of [IRYS_GATEWAY, ARWEAVE_GATEWAY]) {
    try {
      const res = await fetch(`${gateway}/${txId}`);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        return { data: Array.from(new Uint8Array(buffer)) };
      }
    } catch (_) {
      // try next gateway
    }
  }
  return null;
};

// --- Retrieve vault index JSON from Arweave ---

export const getVaultIndex = async (vaultIndexTxId) => {
  // Legacy: mock vault index stored in localStorage
  if (vaultIndexTxId.startsWith("vi_")) {
    const data = localStorage.getItem(`vault3_index_${vaultIndexTxId}`);
    return data ? JSON.parse(data) : null;
  }

  for (const gateway of [IRYS_GATEWAY, ARWEAVE_GATEWAY]) {
    try {
      const res = await fetch(`${gateway}/${vaultIndexTxId}`);
      if (res.ok) return res.json();
    } catch (_) {
      // try next gateway
    }
  }
  return null;
};

// --- Mock fallback (localStorage) for credit-card / no-wallet uploads ---

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
