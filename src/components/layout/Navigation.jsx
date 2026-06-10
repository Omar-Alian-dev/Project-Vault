import React from "react";
import { Shield, Menu, X, Github, ExternalLink } from "lucide-react";

const navLinks = [
  { key: "home",  label: "Home" },
  { key: "docs",  label: "Docs" },
  { key: "about", label: "About" },
];

export const Navigation = ({
  currentPage,
  setCurrentPage,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/20">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xl font-bold text-white">
              Vault<span className="text-purple-400">3</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => setCurrentPage(link.key)}
                className={`font-medium transition-colors text-sm ${
                  currentPage === link.key
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/omar-alian-dev/project-vault"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <button
              onClick={() => setCurrentPage("app")}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center gap-2"
            >
              Launch App
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => { setCurrentPage(link.key); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2.5 rounded-lg font-medium transition-colors text-sm ${
                  currentPage === link.key
                    ? "text-purple-400 bg-purple-500/10"
                    : "text-gray-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setCurrentPage("app"); setMobileMenuOpen(false); }}
              className="w-full mt-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-3 rounded-xl text-sm font-semibold"
            >
              Launch App
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
