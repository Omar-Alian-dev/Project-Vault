import React, { useState } from "react";
import { Key, Copy, Eye, EyeOff, AlertCircle } from "lucide-react";

export const VaultKeyDisplay = ({ vaultKey, onCopy }) => {
  const [showVaultKey, setShowVaultKey] = useState(false);

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
        <Key className="w-6 h-6 text-green-400" />
        Your Vault Key
      </h3>

      <div className="bg-slate-900/50 rounded-xl p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-300 font-medium">
            Save this key to access your files:
          </p>
          <button
            onClick={() => setShowVaultKey(!showVaultKey)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {showVaultKey ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="font-mono text-sm bg-black/30 p-4 rounded-lg mb-4">
          {showVaultKey ? vaultKey : "•".repeat(80)}
        </div>

        <button
          onClick={onCopy}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copy to Clipboard
        </button>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="text-yellow-200 text-sm">
            <p className="font-medium mb-1">Important:</p>
            <p>
              This key is the only way to access your files. Store it safely -
              we cannot recover it if lost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};