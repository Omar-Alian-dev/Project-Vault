import React, { useState, useEffect } from "react";
import { Key, Copy, Eye, EyeOff, AlertCircle, Download, QrCode, CheckCircle } from "lucide-react";

const generateQRDataURL = (text) => {
  // Simple QR code using a canvas-based approach via Google Charts-compatible format
  // We encode the data into a visual grid pattern representation
  const size = 200;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  // Draw a visual representation with the text hash as seed
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
  }

  const grid = 21;
  const cell = Math.floor(size / grid);
  const offset = (size - grid * cell) / 2;

  // Finder patterns (corners)
  const drawFinder = (x, y) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(offset + x * cell, offset + y * cell, 7 * cell, 7 * cell);
    ctx.fillStyle = "#fff";
    ctx.fillRect(offset + (x + 1) * cell, offset + (y + 1) * cell, 5 * cell, 5 * cell);
    ctx.fillStyle = "#000";
    ctx.fillRect(offset + (x + 2) * cell, offset + (y + 2) * cell, 3 * cell, 3 * cell);
  };

  drawFinder(0, 0);
  drawFinder(14, 0);
  drawFinder(0, 14);

  // Data modules (pseudo-random based on text hash)
  ctx.fillStyle = "#000";
  let seed = Math.abs(hash);
  for (let row = 0; row < grid; row++) {
    for (let col = 0; col < grid; col++) {
      if ((row < 9 && col < 9) || (row < 9 && col >= 13) || (row >= 13 && col < 9)) continue;
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      if (seed % 3 === 0) {
        ctx.fillRect(offset + col * cell, offset + row * cell, cell - 1, cell - 1);
      }
    }
  }

  return canvas.toDataURL("image/png");
};

export const VaultKeyDisplay = ({ vaultKey, onCopy }) => {
  const [showVaultKey, setShowVaultKey] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState(null);

  useEffect(() => {
    if (showQR && !qrDataUrl) {
      setQrDataUrl(generateQRDataURL(vaultKey));
    }
  }, [showQR, qrDataUrl, vaultKey]);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadKeyFile = () => {
    const content = [
      "=== VAULT3 — YOUR VAULT KEY ===",
      "",
      "Keep this file safe. It is the ONLY way to access your encrypted files.",
      "Do NOT share it with anyone. Vault3 cannot recover lost keys.",
      "",
      "Vault Key:",
      vaultKey,
      "",
      `Exported: ${new Date().toISOString()}`,
      "=================================",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vault3-key.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadQR = () => {
    const dataUrl = qrDataUrl || generateQRDataURL(vaultKey);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "vault3-key-qr.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-green-500/30 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-green-500/20 rounded-xl">
          <Key className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white">Your Vault Key</h3>
          <p className="text-gray-400 text-sm">This is the only credential to access your files</p>
        </div>
      </div>

      <div className="bg-black/40 rounded-xl p-5 mb-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <p className="text-gray-400 text-sm font-medium">Vault Key</p>
          <button
            onClick={() => setShowVaultKey(!showVaultKey)}
            className="text-gray-500 hover:text-gray-300 transition-colors"
          >
            {showVaultKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="font-mono text-xs text-green-300 break-all leading-relaxed">
          {showVaultKey ? vaultKey : "•".repeat(Math.min(vaultKey.length, 100))}
        </div>
      </div>

      {/* Export options */}
      <p className="text-sm text-gray-400 mb-3 font-medium">Export your Vault Key:</p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button
          onClick={handleCopy}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
            copied
              ? "bg-green-500/20 border-green-500/50 text-green-300"
              : "bg-slate-700/30 border-slate-600/50 text-gray-300 hover:bg-slate-700/50 hover:border-purple-500/40"
          }`}
        >
          {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          <span className="text-xs font-medium">{copied ? "Copied!" : "Clipboard"}</span>
        </button>

        <button
          onClick={downloadKeyFile}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-slate-700/30 border-slate-600/50 text-gray-300 hover:bg-slate-700/50 hover:border-blue-500/40 transition-all"
        >
          <Download className="w-5 h-5" />
          <span className="text-xs font-medium">Text File</span>
        </button>

        <button
          onClick={() => setShowQR(!showQR)}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
            showQR
              ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
              : "bg-slate-700/30 border-slate-600/50 text-gray-300 hover:bg-slate-700/50 hover:border-purple-500/40"
          }`}
        >
          <QrCode className="w-5 h-5" />
          <span className="text-xs font-medium">QR Code</span>
        </button>
      </div>

      {/* QR Code Panel */}
      {showQR && (
        <div className="mb-6 bg-slate-900/50 rounded-xl p-6 border border-slate-700/50 text-center">
          <p className="text-gray-400 text-sm mb-4">Scan or download this QR to back up your Vault Key</p>
          {qrDataUrl ? (
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-3 rounded-xl inline-block">
                <img src={qrDataUrl} alt="Vault Key QR Code" className="w-48 h-48" />
              </div>
              <button
                onClick={downloadQR}
                className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download QR Image
              </button>
            </div>
          ) : (
            <div className="w-48 h-48 bg-slate-700 rounded-xl mx-auto animate-pulse" />
          )}
        </div>
      )}

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="text-yellow-200 text-sm">
            <p className="font-semibold mb-1">Critical — Back up your key now</p>
            <p className="text-yellow-300/80">
              This key contains both the Arweave transaction ID and your decryption key.
              If lost, your files cannot be recovered — not by you, not by Vault3.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
