const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB chunks

export const generateKey = async () => {
  return await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
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

export const encryptFile = async (file, key, onProgress) => {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const fileBuffer = await file.arrayBuffer();

  const chunkCount = Math.ceil(fileBuffer.byteLength / CHUNK_SIZE);
  const encryptedChunks = [];

  for (let i = 0; i < chunkCount; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, fileBuffer.byteLength);
    const chunk = fileBuffer.slice(start, end);

    const chunkIv = new Uint8Array(12);
    chunkIv.set(iv);
    new DataView(chunkIv.buffer).setUint32(8, i, false);

    const encryptedChunk = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: chunkIv },
      key,
      chunk
    );
    encryptedChunks.push(encryptedChunk);

    if (onProgress) {
      onProgress(Math.round(((i + 1) / chunkCount) * 100));
    }

    // Yield to event loop to prevent UI freeze
    if (i % 5 === 4) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  const totalSize = encryptedChunks.reduce((s, c) => s + c.byteLength, 0);
  const combined = new Uint8Array(totalSize);
  let offset = 0;
  for (const chunk of encryptedChunks) {
    combined.set(new Uint8Array(chunk), offset);
    offset += chunk.byteLength;
  }

  return {
    data: combined.buffer,
    iv: Array.from(iv)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""),
    name: file.name,
    type: file.type,
    size: file.size,
    chunks: chunkCount,
  };
};

export const decryptFile = async (encryptedData, keyHex, ivHex, onProgress) => {
  const key = await importKey(keyHex);
  const iv = new Uint8Array(
    ivHex.match(/.{2}/g).map((byte) => parseInt(byte, 16))
  );

  const dataArray = encryptedData instanceof Uint8Array
    ? encryptedData
    : new Uint8Array(encryptedData);

  const chunkSize = CHUNK_SIZE + 16; // 16 bytes GCM tag
  const chunkCount = Math.ceil(dataArray.byteLength / chunkSize);
  const decryptedChunks = [];

  for (let i = 0; i < chunkCount; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, dataArray.byteLength);
    const chunk = dataArray.slice(start, end);

    const chunkIv = new Uint8Array(12);
    chunkIv.set(iv);
    new DataView(chunkIv.buffer).setUint32(8, i, false);

    try {
      const decryptedChunk = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: chunkIv },
        key,
        chunk
      );
      decryptedChunks.push(decryptedChunk);
    } catch {
      // Fallback: try decrypting the whole blob as one chunk (legacy uploads)
      if (i === 0 && chunkCount === 1) {
        const decrypted = await window.crypto.subtle.decrypt(
          { name: "AES-GCM", iv },
          key,
          dataArray
        );
        return decrypted;
      }
      throw new Error("Decryption failed — invalid key or corrupted data.");
    }

    if (onProgress) {
      onProgress(Math.round(((i + 1) / chunkCount) * 100));
    }

    if (i % 5 === 4) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  const totalSize = decryptedChunks.reduce((s, c) => s + c.byteLength, 0);
  const combined = new Uint8Array(totalSize);
  let offset = 0;
  for (const chunk of decryptedChunks) {
    combined.set(new Uint8Array(chunk), offset);
    offset += chunk.byteLength;
  }

  return combined.buffer;
};
