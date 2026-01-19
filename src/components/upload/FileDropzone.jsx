import React from "react";
import { Upload } from "lucide-react";

export const FileDropzone = ({ onDrop, onDragOver, onClick }) => {
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-purple-400 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p className="text-xl text-gray-300 mb-2">
        Drop files here or click to select
      </p>
      <p className="text-gray-500">
        Files will be encrypted in your browser before upload
      </p>
    </div>
  );
};