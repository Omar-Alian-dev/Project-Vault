import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export const Notification = ({ notification }) => {
  if (!notification.message) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 mb-6">
      <div
        className={`p-4 rounded-xl flex items-center gap-3 ${
          notification.type === "success"
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : notification.type === "error"
            ? "bg-red-500/20 text-red-400 border border-red-500/30"
            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
        }`}
      >
        {notification.type === "success" ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
        <span>{notification.message}</span>
      </div>
    </div>
  );
};
