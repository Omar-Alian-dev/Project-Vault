import React from "react";
import { Shield, Github, Twitter, ExternalLink } from "lucide-react";

export const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold text-white">Vault3</span>
            </div>
            <p className="text-gray-400">
              Encrypted, permanent, decentralized file storage for the modern
              web.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <div className="space-y-2">
              <button
                onClick={() => setCurrentPage("app")}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Launch App
              </button>
              <button
                onClick={() => setCurrentPage("docs")}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Documentation
              </button>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                API
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <div className="space-y-2">
              <button
                onClick={() => setCurrentPage("about")}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                About
              </button>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Blog
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Discord
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Vault3. Built with ❤️ for privacy and decentralization.
          </p>
        </div>
      </div>
    </footer>
  );
};