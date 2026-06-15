import React from "react";
import { Shield, Menu, X, Github, ExternalLink } from "lucide-react";

const navLinks = [
  { key: "home", label: "Home" },
  { key: "docs", label: "Docs" },
  { key: "about", label: "About" },
];

export const Navigation = ({
  currentPage,
  setCurrentPage,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <nav className="fixed w-full top-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <img
              src="/Vault logo.png"
              alt="Vault Logo"
              className="w-11 h-11 object-contain"
            />
            <span className="text-2xl font-heading font-bold text-white tracking-wide">
              Vaul<span className="text-vault-secondary">t</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => setCurrentPage(link.key)}
                className={`font-semibold tracking-wide transition-colors text-sm uppercase ${currentPage === link.key
                    ? "text-vault-secondary drop-shadow-[0_0_8px_rgba(167,139,250,0.8)]"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="https://github.com/omar-alian-dev/project-vault"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <button
              onClick={() => setCurrentPage("app")}
              className="bg-vault-cta text-vault-bg px-6 py-2.5 rounded-xl text-sm font-bold font-heading hover:bg-yellow-400 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:-translate-y-0.5"
            >
              Launch App
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/10 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => { setCurrentPage(link.key); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3 rounded-xl font-heading font-semibold transition-colors text-base uppercase ${currentPage === link.key
                    ? "text-vault-secondary bg-vault-primary/10 border border-vault-primary/20"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setCurrentPage("app"); setMobileMenuOpen(false); }}
              className="w-full mt-4 bg-vault-cta text-vault-bg px-6 py-4 rounded-xl text-base font-bold font-heading flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
            >
              Launch App
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
