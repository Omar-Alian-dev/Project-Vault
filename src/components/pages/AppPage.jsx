import React, { useState, useRef } from "react";
import { Shield, Upload, Key, Lock, Globe, Download } from "lucide-react";
import { Notification } from "../ui/Notification";
import { FileDropzone } from "../upload/FileDropzone";
import { FileList } from "../upload/FileList";
import { VaultKeyDisplay } from "../upload/VaultKeyDisplay";
import { FileListItem } from "../ui/FileListItem";
import { useFileUpload } from "../../hooks/useFileUpload";
import { useFileRetrieval } from "../../hooks/useFileRetrieval";
import { decryptFile } from "../../utils/crypto";

export const AppPage = ({ notification, showNotification }) => {
  const [mode, setMode] = useState("upload");
  const [files, setFiles] = useState([]);
  const [inputVaultKey, setInputVaultKey] = useState("");
  const fileInputRef = useRef();

  const { uploading, vaultKey, setVaultKey, handleUpload } =
    useFileUpload(showNotification);

  const { retrieving, retrievedFiles, setRetrievedFiles, handleRetrieve } =
    useFileRetrieval(showNotification);

  const handleFileSelect = (selectedFiles) => {
    const fileList = Array.from(selectedFiles);
    setFiles(fileList);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const copyVaultKey = () => {
    navigator.clipboard.writeText(vaultKey);
    showNotification("success", "Vault key copied to clipboard!");
  };

  const downloadFile = async (fileInfo) => {
    try {
      const decryptedData = await decryptFile(
        fileInfo.encryptedData,
        fileInfo.masterKey,
        fileInfo.iv
      );

      const blob = new Blob([decryptedData], { type: fileInfo.type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileInfo.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showNotification("success", `Downloaded ${fileInfo.name}`);
    } catch (error) {
      console.error("Download failed:", error);
      showNotification("error", "Failed to download file");
    }
  };

  const resetMode = () => {
    setFiles([]);
    setVaultKey("");
    setInputVaultKey("");
    setRetrievedFiles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
        <div className="relative max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h1 className="text-4xl font-bold text-white">Vault3</h1>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Encrypted, Permanent, Decentralized File Storage
            </p>

            <div className="flex justify-center mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-1 flex">
                <button
                  onClick={() => {
                    setMode("upload");
                    resetMode();
                  }}
                  className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    mode === "upload"
                      ? "bg-purple-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload Files
                </button>
                <button
                  onClick={() => {
                    setMode("retrieve");
                    resetMode();
                  }}
                  className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
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

      <div className="max-w-4xl mx-auto px-6 pb-12">
        {mode === "upload" ? (
          <div className="space-y-8">
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
                <div className="space-y-4">
                  <FileList files={files} onClear={() => setFiles([])} />

                  <button
                    onClick={() => handleUpload(files)}
                    disabled={uploading}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {uploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Encrypting & Uploading...
                      </>
                    ) : (
                      <>
                        <Globe className="w-5 h-5" />
                        Upload to Arweave
                      </>
                    )}
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

            {vaultKey && <VaultKeyDisplay vaultKey={vaultKey} onCopy={copyVaultKey} />}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <Key className="w-6 h-6 text-blue-400" />
                Access Your Vault
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Enter Your Vault Key:
                  </label>
                  <input
                    type="text"
                    placeholder="vault://..."
                    value={inputVaultKey}
                    onChange={(e) => setInputVaultKey(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={() => handleRetrieve(inputVaultKey)}
                  disabled={!inputVaultKey || retrieving}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
                  Your Files ({retrievedFiles.length})
                </h3>

                <div className="space-y-3">
                  {retrievedFiles.map((file, index) => (
                    <FileListItem
                      key={index}
                      file={file}
                      onDownload={downloadFile}
                      showDownloadButton={true}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-slate-800/20 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
            <Lock className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              End-to-End Encrypted
            </h3>
            <p className="text-gray-400">
              Files are encrypted in your browser before upload. Only you have
              the key.
            </p>
          </div>

          <div className="bg-slate-800/20 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
            <Globe className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Permanently Stored
            </h3>
            <p className="text-gray-400">
              Files are stored on Arweave blockchain for permanent,
              censorship-resistant access.
            </p>
          </div>

          <div className="bg-slate-800/20 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
            <Shield className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No Accounts Needed
            </h3>
            <p className="text-gray-400">
              Fully anonymous. No registration, no identity verification, no
              tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};