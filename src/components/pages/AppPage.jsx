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
    <div className="min-h-screen bg-vault-bg relative overflow-hidden pt-20">
      {/* ── Background Ambient Lights ── */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-vault-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-vault-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      {showPayment && (
        <PaymentModal
          files={files}
          onConfirm={handlePaymentConfirm}
          onCancel={() => setShowPayment(false)}
        />
      )}

      {/* Header */}
      <div className="relative z-10">
        <div className="relative max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-wide">
              Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-secondary to-vault-primary">Vault</span>
            </h1>
            <p className="text-gray-400 font-body text-lg">Military-grade encryption · Zero-knowledge · Arweave permaweb</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="glass-panel p-1.5 rounded-2xl flex relative w-full sm:w-auto overflow-hidden">
              <button
                onClick={() => { setMode("upload"); resetMode(); }}
                className={`relative z-10 px-8 py-3.5 rounded-xl font-heading font-bold transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none ${
                  mode === "upload"
                    ? "text-vault-bg shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {mode === "upload" && <div className="absolute inset-0 bg-vault-cta rounded-xl -z-10 shadow-[0_0_15px_rgba(251,191,36,0.3)]" />}
                <Upload className="w-5 h-5" />
                Upload
              </button>
              <button
                onClick={() => { setMode("retrieve"); resetMode(); }}
                className={`relative z-10 px-8 py-3.5 rounded-xl font-heading font-bold transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none ${
                  mode === "retrieve"
                    ? "text-vault-bg shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {mode === "retrieve" && <div className="absolute inset-0 bg-vault-cta rounded-xl -z-10 shadow-[0_0_15px_rgba(251,191,36,0.3)]" />}
                <Key className="w-5 h-5" />
                Retrieve
              </button>
            </div>
          </div>
        </div>
      </div>

      <Notification notification={notification} />

      <div className="relative max-w-4xl mx-auto px-6 pb-20 z-10">
        {mode === "upload" ? (
          <div className="space-y-6">
            {/* Upload area — hidden while uploading */}
            {!isUploading && uploadStep !== "done" && (
              <div className="glass-panel rounded-3xl p-8 md:p-10 border-white/10 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-vault-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
                <h2 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-vault-secondary" />
                  Encrypt & Upload
                </h2>

                {files.length === 0 ? (
                  <FileDropzone
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                  />
                ) : (
                  <div className="space-y-6">
                    <FileList files={files} onClear={() => setFiles([])} />
                    <button
                      onClick={handleUploadClick}
                      className="w-full bg-vault-cta hover:bg-yellow-400 text-vault-bg py-4 px-6 rounded-xl font-bold font-heading transition-all flex items-center justify-center gap-3 text-lg shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:-translate-y-1"
                    >
                      <Globe className="w-6 h-6" />
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
              <div className="text-center mt-8">
                <button
                  onClick={resetMode}
                  className="text-vault-secondary hover:text-white transition-colors font-medium underline underline-offset-4"
                >
                  Upload more files
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Retrieve mode */
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-8 md:p-10 border-white/10 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-vault-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
              <h2 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3">
                <Key className="w-6 h-6 text-vault-secondary" />
                Access Your Vault
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 font-heading font-semibold mb-3">
                    Enter Your Vault Key
                  </label>
                  <textarea
                    rows={3}
                    placeholder="vault://vi_...#abcdef..."
                    value={inputVaultKey}
                    onChange={(e) => setInputVaultKey(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white font-mono text-sm focus:ring-2 focus:ring-vault-secondary focus:border-transparent resize-none transition-all"
                  />
                  <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-vault-secondary" />
                    Your key starts with <code className="text-vault-secondary bg-vault-secondary/10 px-2 py-0.5 rounded">vault://</code>
                  </p>
                </div>

                {retrieving && (
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-gray-300">Fetching from Arweave...</p>
                      <span className="text-sm text-vault-secondary font-mono font-bold">{retrieveProgress}%</span>
                    </div>
                    <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-vault-secondary rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(167,139,250,0.5)]"
                        style={{ width: `${retrieveProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleRetrieve(inputVaultKey)}
                  disabled={!inputVaultKey.trim() || retrieving}
                  className="w-full bg-vault-secondary hover:bg-vault-primary text-white py-4 px-6 rounded-xl font-bold font-heading transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg hover:-translate-y-1 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                >
                  {retrieving ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Accessing Vault...
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6" />
                      Access Vault
                    </>
                  )}
                </button>
              </div>
            </div>

            {retrievedFiles.length > 0 && (
              <div className="glass-panel rounded-3xl p-8 md:p-10 border-white/10">
                <h3 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3">
                  <Download className="w-6 h-6 text-green-400" />
                  Files in Vault ({retrievedFiles.length})
                </h3>

                <div className="space-y-4">
                  {retrievedFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <FileListItem
                        file={file}
                        onDownload={downloadFile}
                        showDownloadButton={true}
                      />
                      {decryptProgress[file.txId] !== undefined && (
                        <div className="mt-2 mx-4">
                          <div className="h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                            <div
                              className="h-full bg-vault-secondary rounded-full transition-all shadow-[0_0_8px_rgba(167,139,250,0.8)]"
                              style={{ width: `${decryptProgress[file.txId]}%` }}
                            />
                          </div>
                          <p className="text-xs font-mono text-vault-secondary mt-1.5">Decrypting... {decryptProgress[file.txId]}%</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-sm text-gray-400 font-medium">
                    Files are decrypted locally in your browser. Nothing is sent to any server.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security badges */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: Lock, color: "text-vault-secondary", bg: "bg-vault-secondary/10", title: "End-to-End Encrypted", desc: "AES-256-GCM in your browser. No plaintext ever leaves your device." },
            { icon: Globe, color: "text-vault-primary",   bg: "bg-vault-primary/10",   title: "Arweave Permaweb",     desc: "Files stored permanently on blockchain. No subscriptions." },
            { icon: Shield, color: "text-green-400", bg: "bg-green-500/10",  title: "Zero Registration",   desc: "No email, no account. Your Vault Key is your only credential." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={`rounded-2xl p-6 border border-white/5 bg-white/5 backdrop-blur-md`}>
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-white font-heading font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-body">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
