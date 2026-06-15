import React from "react";
import { FileListItem } from "../ui/FileListItem";
import { X } from "lucide-react";

export const FileList = ({ files, onClear }) => {
  const totalSize = files.reduce((acc, f) => acc + f.size, 0);
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">
            {files.length} file{files.length !== 1 ? "s" : ""} selected
          </h3>
          <p className="text-sm text-gray-400">Total: {formatSize(totalSize)}</p>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm"
        >
          <X className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {files.map((file, index) => (
          <FileListItem key={index} file={file} showDownloadButton={false} />
        ))}
      </div>
    </div>
  );
};
