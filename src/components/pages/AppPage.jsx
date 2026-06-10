import React, { useState, useRef } from "react";
import { Shield, Upload, Key, Lock, Globe, Download, Info } from "lucide-react";
import { Notification } from "../ui/Notification";
import { FileDropzone } from "../upload/FileDropzone";
import { FileList } from "../upload/FileList";
import { VaultKeyDisplay } from "../upload/VaultKeyDisplay";
import { FileListItem } from "../ui/FileListItem";
import { PaymentModal } from "../upload/PaymentModal";
import { UploadProgress } from "../upload/UploadProgress";
import { useFileUpload } from "../../hooks/useFileUpload";
import { useFileRetrieval } from "../../hooks/useFileRetrieval";
import { decryptFile } from "../../utils/crypto";

export const AppPage = ({ notification, showNotification }) => {
  const [mode, setMode] = useState("upload");
  const [files, setFiles] = useState([]);
  const [inputVaultKey, setInputVaultKey] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [decryptProgress, setDecryptProgress] = useState({});
  const fileInputRef = useRef();

  const {
    uploading,
    vaultKey,
    setVaultKey,
    handleUpload,
    uploadStep,
    stepProgress,
    currentFileIndex,
    totalFiles,
    setUploadStep,
  } = useFileUpload(showNotification);

  const {
    retrieving,
    retrievedFiles,
    setRetrievedFiles,
    handleRetrieve,
    retrieveProgress,
  } = useFileRetrieval(showNotification);

  const handleFileSelect = (selectedFiles) => setFiles(Array.from(selectedFiles));
  const handleDrop = (e) => { e.preventDefault(); setFiles(Array.from(e.dataTransfer.files)); };
  const handleDragOver = (e) => e.preventDefault();

  const handleUploadClick = () => {
    if (files.length === 0) return;
    setShowPayment(true);
  };

  const handlePaymentConfirm = (paymentMethod) => {
    setShowPayment(false);
    handleUpload(files, paymentMethod);
  };

  const copyVaultKey = () => {
    navigator.clipboard.writeText(vaultKey);
    showNotification("success", "Vault Key copied to clipboard!");
  };

  const downloadFile = async (fileInfo) => {
    try {
      setDecryptProgress((prev) => ({ ...prev, [fileInfo.txId]: 0 }));
      showNotification("info", `Decrypting ${fileInfo.name}...`);

      const decryptedData = await decryptFile(
        fileInfo.encryptedData,
        fileInfo.masterKey,
        fileInfo.iv,
        (p) => setDecryptProgress((prev) => ({ ...prev, [fileInfo.txId]: p }))
      );

      const blob = new Blob([decryptedData], { type: fileInfo.type || "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileInfo.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDecryptProgress((prev) => { const n = { ...prev }; delete n[fileInfo.txId]; return n; });
      showNotification("success", `Downloaded ${fileInfo.name}`);
    } catch (error) {
      console.error("Download failed:", error);
      setDecryptProgress((prev) => { const n = { ...prev }; delete n[fileInfo.txId]; return n; });
      showNotification("error", "Failed to decrypt file — check your Vault Key.");
    }
  };

  const resetMode = () => {
    setFiles([]);
    setVaultKey("");
    setInputVaultKey("");
    setRetrievedFiles([]);
    setUploadStep(null);
  };

  const isUploading = uploading && uploadStep && uploadStep !== "done";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      {showPayment && (
        <PaymentModal
          files={files}
          onConfirm={handlePaymentConfirm}
          onCancel={() => setShowPayment(false)}
        />
      )}

      {/* Header */}
      <div className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
        <div className="relative max-w-4xl mx-auto px-6 py-10">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-3">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h1 className="text-4xl font-bold text-white">
                Vault<span className="text-purple-400">3</span>
              </h1>
            </div>
            <p className="text-gray-400 mb-8">Encrypted · Permanent · Decentralized</p>

            <div className="flex justify-center">
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-1 flex border border-slate-700/50">
                <button
                  onClick={() => { setMode("upload"); resetMode(); }}
                  className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    mode === "upload"
                      ? "bg-purple-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload Files
                </button>
                <button
                  onClick={() => { setMode("retrieve"); resetMode(); }}
                  className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    mode === "retrieve"
                      ? "bg-purple-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <Key className="w-4 h-4" />
                  Access Vault
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Notification notification={notification} />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {mode === "upload" ? (
          <div className="space-y-6">
            {/* Upload area — hidden while uploading */}
            {!isUploading && uploadStep !== "done" && (
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-purple-400" />
                  Encrypt & Upload Files
                </h2>

                {files.length === 0 ? (
                  <FileDropzone
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                  />
                ) : (
                  <div className="space-y-5">
                    <FileList files={files} onClear={() => setFiles([])} />
                    <button
                      onClick={handleUploadClick}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-3 text-lg shadow-lg"
                    >
                      <Globe className="w-5 h-5" />
                      Encrypt & Upload to Arweave
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </div>
            )}

            {/* Progress tracker */}
            {(isUploading || uploadStep === "done") && (
              <UploadProgress
                uploadStep={uploadStep}
                stepProgress={stepProgress}
                currentFileIndex={currentFileIndex}
                totalFiles={totalFiles}
              />
            )}

            {/* Vault Key display */}
            {vaultKey && uploadStep === "done" && (
              <VaultKeyDisplay vaultKey={vaultKey} onCopy={copyVaultKey} />
            )}

            {/* Reset after done */}
            {uploadStep === "done" && (
              <div className="text-center">
                <button
                  onClick={resetMode}
                  className="text-gray-400 hover:text-white transition-colors text-sm underline underline-offset-2"
                >
                  Upload more files
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Retrieve mode */
          <div className="space-y-6">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <Key className="w-6 h-6 text-blue-400" />
                Access Your Vault
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-2 text-sm">
                    Enter Your Vault Key
                  </label>
                  <textarea
                    rows={3}
                    placeholder="vault://vi_...#abcdef..."
                    value={inputVaultKey}
                    onChange={(e) => setInputVaultKey(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Your key starts with <code className="text-gray-400">vault://</code>
                  </p>
                </div>

                {retrieving && (
                  <div className="bg-slate-700/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-300">Fetching from Arweave...</p>
                      <span className="text-sm text-blue-400 font-mono">{retrieveProgress}%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${retrieveProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleRetrieve(inputVaultKey)}
                  disabled={!inputVaultKey.trim() || retrieving}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                >
                  {retrieving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Accessing Vault...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Access Vault
                    </>
                  )}
                </button>
              </div>
            </div>

            {retrievedFiles.length > 0 && (
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <Download className="w-6 h-6 text-green-400" />
                  Files in Vault ({retrievedFiles.length})
                </h3>

                <div className="space-y-3">
                  {retrievedFiles.map((file, index) => (
                    <div key={index}>
                      <FileListItem
                        file={file}
                        onDownload={downloadFile}
                        showDownloadButton={true}
                      />
                      {decryptProgress[file.txId] !== undefined && (
                        <div className="mt-1 mx-4">
                          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500 rounded-full transition-all"
                              style={{ width: `${decryptProgress[file.txId]}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Decrypting... {decryptProgress[file.txId]}%</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mt-6 text-center">
                  Files are decrypted locally in your browser. Nothing is sent to any server.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Security badges */}
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {[
            { icon: Lock, color: "text-purple-400", bg: "bg-purple-500/10", title: "End-to-End Encrypted", desc: "AES-256-GCM in your browser. No plaintext ever leaves your device." },
            { icon: Globe, color: "text-blue-400",   bg: "bg-blue-500/10",   title: "Arweave Permaweb",     desc: "Files stored permanently on blockchain. No subscriptions." },
            { icon: Shield, color: "text-green-400", bg: "bg-green-500/10",  title: "Zero Registration",   desc: "No email, no account. Your Vault Key is your only credential." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={`rounded-xl p-5 border border-slate-700/30 ${item.bg}`}>
                <Icon className={`w-7 h-7 ${item.color} mb-3`} />
                <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
