import React from "react";
import { Lock, Download } from "lucide-react";
import { formatFileSize } from "../../utils/formatters";

export const FileListItem = ({ file, onDownload, showDownloadButton }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
      <div className="flex items-center gap-3">
        <div
          className={`w-2 h-2 ${
            showDownloadButton ? "bg-green-400" : "bg-purple-400"
          } rounded-full`}
        />
        <div>
          <p className="text-white font-medium">{file.name}</p>
          <p className="text-gray-400 text-sm">{formatFileSize(file.size)}</p>
        </div>
      </div>
      {showDownloadButton ? (
        <button
          onClick={() => onDownload(file)}
          className="flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      ) : (
        <Lock className="w-4 h-4 text-purple-400" />
      )}
    </div>
  );
};