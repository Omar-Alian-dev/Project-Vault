import React from "react";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

const typeStyles = {
  success: { bg: "bg-green-500/20 border-green-500/40", icon: CheckCircle, color: "text-green-400", text: "text-green-100" },
  error:   { bg: "bg-red-500/20 border-red-500/40",     icon: AlertCircle, color: "text-red-400",   text: "text-red-100" },
  info:    { bg: "bg-blue-500/20 border-blue-500/40",   icon: Info,        color: "text-blue-400",  text: "text-blue-100" },
  warning: { bg: "bg-yellow-500/20 border-yellow-500/40", icon: AlertCircle, color: "text-yellow-400", text: "text-yellow-100" },
};

export const Notification = ({ notification }) => {
  if (!notification?.type || !notification?.message) return null;

  const style = typeStyles[notification.type] || typeStyles.info;
  const Icon = style.icon;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-fadeIn">
      <div className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-xl ${style.bg}`}>
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${style.color}`} />
        <p className={`text-sm font-medium ${style.text}`}>{notification.message}</p>
      </div>
    </div>
  );
};
