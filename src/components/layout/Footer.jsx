import React from "react";
import { Shield, Github, Lock, Globe, Key } from "lucide-react";

export const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a16] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-vault-primary to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/Vault logo.png"
                alt="Vault Logo"
                className="w-11 h-11 object-contain"
              />
              <span className="text-2xl font-heading font-bold text-white tracking-wide">
                Vaul<span className="text-vault-secondary">t</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-body">
              Sovereign cloud storage on the Arweave permaweb. No accounts. No subscriptions. Your keys, your data.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/omar-alian-dev/project-vault"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-heading font-bold mb-6 text-sm uppercase tracking-wider text-vault-secondary/80">Product</h4>
            <div className="space-y-3">
              <button onClick={() => setCurrentPage("app")} className="block text-gray-400 hover:text-white transition-colors text-sm font-medium">Launch App</button>
              <button onClick={() => setCurrentPage("docs")} className="block text-gray-400 hover:text-white transition-colors text-sm font-medium">Documentation</button>
              <button onClick={() => setCurrentPage("about")} className="block text-gray-400 hover:text-white transition-colors text-sm font-medium">Roadmap & Team</button>
            </div>
          </div>

          {/* Technology */}
          <div>
            <h4 className="text-white font-heading font-bold mb-6 text-sm uppercase tracking-wider text-vault-secondary/80">Technology</h4>
            <div className="space-y-3">
              {[
                { label: "Arweave Permaweb", icon: Globe },
                { label: "AES-256-GCM Encryption", icon: Lock },
                { label: "Zero-Knowledge Architecture", icon: Shield },
                { label: "Vault Key Authentication", icon: Key },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                    <Icon className="w-4 h-4 text-vault-secondary/50" />
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Project */}
          <div>
            <h4 className="text-white font-heading font-bold mb-6 text-sm uppercase tracking-wider text-vault-secondary/80">Academic Context</h4>
            <div className="space-y-3 text-sm text-gray-400 font-medium">
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-vault-primary" />Omar Alian</p>
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-vault-primary" />Anas Kadamany</p>
              <p className="text-gray-500 mt-4">Supervisor: Mr. Ofir Cohen</p>
              <p className="text-gray-500 text-xs mt-1">Azrieli College of Engineering Jerusalem<br />Software Engineering Dept.</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm font-medium">
            © 2025–2026 Vault. Open Source Final Year Project.
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500 font-mono bg-white/5 px-4 py-2 rounded-lg border border-white/5">
            <Lock className="w-3 h-3 text-vault-secondary" />
            <span>ZERO-KNOWLEDGE SYSTEM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
