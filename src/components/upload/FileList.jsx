import React from "react";
import { FileListItem } from "../ui/FileListItem";

export const FileList = ({ files, onClear }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Selected Files</h3>
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-white transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-2">
        {files.map((file, index) => (
          <FileListItem key={index} file={file} showDownloadButton={false} />
        ))}
      </div>
    </div>
  );
};