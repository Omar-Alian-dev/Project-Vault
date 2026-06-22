import React, { useState, useRef } from "react";
import { Key, Copy, Eye, EyeOff, AlertCircle, Download, QrCode, CheckCircle } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export const VaultKeyDisplay = ({ vaultKey, onCopy }) => {
  const [showVaultKey, setShowVaultKey] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrCanvasRef = useRef(null);

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
    const canvas = qrCanvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
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

      {showQR && (
        <div className="mb-6 bg-slate-900/50 rounded-xl p-6 border border-slate-700/50 text-center">
          <p className="text-gray-400 text-sm mb-4">Scan or download this QR to back up your Vault Key</p>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-3 rounded-xl inline-block" ref={qrCanvasRef}>
              <QRCodeCanvas
                value={vaultKey}
                size={192}
                level="M"
                includeMargin={false}
              />
            </div>
            <button
              onClick={downloadQR}
              className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download QR Image
            </button>
          </div>
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