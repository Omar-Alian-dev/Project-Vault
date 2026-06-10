import React from "react";
import { Shield, Github, Lock, Globe, Key } from "lucide-react";

export const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/20">
                <Shield className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-xl font-bold text-white">Vault<span className="text-purple-400">3</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Decentralized, encrypted, permanent file storage. No accounts. No servers. Your keys, your data.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/omar-alian-dev/project-vault"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
            <div className="space-y-2.5">
              <button onClick={() => setCurrentPage("app")} className="block text-gray-400 hover:text-white transition-colors text-sm">Launch App</button>
              <button onClick={() => setCurrentPage("docs")} className="block text-gray-400 hover:text-white transition-colors text-sm">Documentation</button>
              <button onClick={() => setCurrentPage("about")} className="block text-gray-400 hover:text-white transition-colors text-sm">Roadmap</button>
            </div>
          </div>

          {/* Technology */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Technology</h4>
            <div className="space-y-2.5">
              {[
                { label: "Arweave Permaweb", icon: Globe },
                { label: "AES-256-GCM Encryption", icon: Lock },
                { label: "Zero-Knowledge Design", icon: Shield },
                { label: "Vault Key System", icon: Key },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                    <Icon className="w-3 h-3 text-gray-600" />
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Project */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Project</h4>
            <div className="space-y-2.5 text-sm text-gray-400">
              <p>Omar Alian</p>
              <p>Anas Kadamany</p>
              <p className="text-gray-500">Supervisor: Mr. Ofir Cohen</p>
              <p className="text-gray-500 text-xs mt-2">Azrieli College of Engineering<br />Software Engineering Dept.</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025–2026 Vault3 — Omar Alian & Anas Kadamany. Final Year Project, Azrieli College of Engineering Jerusalem.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Lock className="w-3 h-3" />
            <span>Zero-Knowledge · Zero-Registration · Permanent Storage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
