import React from "react";
import { Lock, Download, File, FileText, Image, Film, Music, Archive } from "lucide-react";
import { formatFileSize } from "../../utils/formatters";

const getFileIcon = (type, name) => {
  if (!type && !name) return File;
  const t = (type || "").toLowerCase();
  const ext = (name || "").split(".").pop().toLowerCase();
  if (t.startsWith("image/") || ["jpg","jpeg","png","gif","webp","svg"].includes(ext)) return Image;
  if (t.startsWith("video/") || ["mp4","mov","avi","mkv"].includes(ext)) return Film;
  if (t.startsWith("audio/") || ["mp3","wav","flac","aac"].includes(ext)) return Music;
  if (t.includes("pdf") || t.includes("text") || ["pdf","txt","md","doc","docx"].includes(ext)) return FileText;
  if (["zip","tar","gz","rar","7z"].includes(ext)) return Archive;
  return File;
};

export const FileListItem = ({ file, onDownload, showDownloadButton }) => {
  const Icon = getFileIcon(file.type, file.name);

  return (
    <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors border border-slate-600/20">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
          showDownloadButton ? "bg-green-500/20" : "bg-purple-500/20"
        }`}>
          <Icon className={`w-5 h-5 ${showDownloadButton ? "text-green-400" : "text-purple-400"}`} />
        </div>
        <div className="min-w-0">
          <p className="text-white font-medium truncate max-w-xs">{file.name}</p>
          <p className="text-gray-400 text-sm">{formatFileSize(file.size)}</p>
        </div>
      </div>

      {showDownloadButton ? (
        <button
          onClick={() => onDownload(file)}
          className="flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 px-4 py-2 rounded-lg transition-colors text-sm font-medium flex-shrink-0 ml-3"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      ) : (
        <Lock className="w-4 h-4 text-purple-400 flex-shrink-0 ml-3" />
      )}
    </div>
  );
};
