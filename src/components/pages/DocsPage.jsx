import React from "react";
import { Zap, Lock, Star } from "lucide-react";

export const DocsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-xl text-gray-300">
            Learn how to use Vault3 effectively and securely
          </p>
        </div>

        <div className="space-y-12">
          <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              Quick Start Guide
            </h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <p>
                  <strong>Upload Files:</strong> Drag and drop your files or
                  click to select them. Files are encrypted in your browser
                  before upload.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <p>
                  <strong>Get Your Key:</strong> After upload, you'll receive a
                  unique vault key. This is the only way to access your files.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <p>
                  <strong>Retrieve Anytime:</strong> Enter your vault key to
                  access and download your encrypted files from anywhere.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 text-green-400" />
              Security Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Client-Side Encryption
                </h3>
                <p>
                  All files are encrypted using AES-256-GCM before leaving your
                  device. We never have access to your unencrypted data.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Zero-Knowledge Architecture
                </h3>
                <p>
                  No accounts, no tracking, no identity verification. Your
                  privacy is built into the system architecture.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Decentralized Storage
                </h3>
                <p>
                  Files are stored on Arweave's permaweb, ensuring no single
                  point of failure or censorship.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Vault Key Security
                </h3>
                <p>
                  Your vault key contains both the location and encryption key.
                  Keep it safe - we cannot recover lost keys.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Star className="w-6 h-6 text-blue-400" />
              Best Practices
            </h2>
            <div className="space-y-4 text-gray-300">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-yellow-200 font-medium mb-2">
                  ⚠️ Key Management
                </h3>
                <p>
                  Always backup your vault key in multiple secure locations.
                  Consider using a password manager or writing it down offline.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-blue-200 font-medium mb-2">
                  💡 File Organization
                </h3>
                <p>
                  Use descriptive filenames before upload. Consider compressing
                  related files into a single archive for easier management.
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-green-200 font-medium mb-2">
                  ✅ Verification
                </h3>
                <p>
                  After upload, test your vault key immediately to ensure you
                  can retrieve your files successfully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};