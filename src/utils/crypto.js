export const generateKey = async () => {
  const key = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  return key;
};

export const exportKey = async (key) => {
  const exported = await window.crypto.subtle.exportKey("raw", key);
  return Array.from(new Uint8Array(exported))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const importKey = async (keyHex) => {
  const keyBytes = new Uint8Array(
    keyHex.match(/.{2}/g).map((byte) => parseInt(byte, 16))
  );
  return await window.crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
};

export const encryptFile = async (file, key) => {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const fileBuffer = await file.arrayBuffer();

  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    fileBuffer
  );

  return {
    data: encrypted,
    iv: Array.from(iv)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""),
    name: file.name,
    type: file.type,
    size: file.size,
  };
};

export const decryptFile = async (encryptedData, keyHex, ivHex) => {
  const key = await importKey(keyHex);
  const iv = new Uint8Array(
    ivHex.match(/.{2}/g).map((byte) => parseInt(byte, 16))
  );

  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encryptedData
  );

  return decrypted;
};
