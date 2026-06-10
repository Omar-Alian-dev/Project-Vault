import React, { useState } from "react";
import { Upload, FolderOpen } from "lucide-react";

export const FileDropzone = ({ onDrop, onDragOver, onClick }) => {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    setDragging(false);
    onDrop(e);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); onDragOver(e); }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onClick={onClick}
      className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all cursor-pointer group ${
        dragging
          ? "border-purple-400 bg-purple-500/10 scale-[1.01]"
          : "border-slate-600 hover:border-purple-400/60 hover:bg-slate-700/20"
      }`}
    >
      <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all ${
        dragging ? "bg-purple-500/30" : "bg-slate-700/50 group-hover:bg-purple-500/20"
      }`}>
        <Upload className={`w-10 h-10 transition-colors ${
          dragging ? "text-purple-300" : "text-gray-400 group-hover:text-purple-400"
        }`} />
      </div>

      <p className="text-xl font-semibold text-gray-200 mb-2">
        {dragging ? "Drop your files here" : "Drag & drop files here"}
      </p>
      <p className="text-gray-400 mb-6">or click anywhere to browse your device</p>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <FolderOpen className="w-4 h-4" />
        <span>Supports any file type — up to 500 MB per file</span>
      </div>

      <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-600">
        <span className="flex items-center gap-1">🔒 Encrypted locally</span>
        <span className="flex items-center gap-1">🌐 Stored on Arweave</span>
        <span className="flex items-center gap-1">👤 Zero identity required</span>
      </div>
    </div>
  );
};
