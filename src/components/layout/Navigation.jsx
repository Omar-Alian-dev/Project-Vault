import React from "react";
import { Shield, Menu, X, Github, Twitter } from "lucide-react";

export const Navigation = ({
  currentPage,
  setCurrentPage,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-xl font-bold text-white">Vault3</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setCurrentPage("home")}
              className={`font-medium transition-colors ${
                currentPage === "home"
                  ? "text-purple-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage("app")}
              className={`font-medium transition-colors ${
                currentPage === "app"
                  ? "text-purple-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Launch App
            </button>
            <button
              onClick={() => setCurrentPage("docs")}
              className={`font-medium transition-colors ${
                currentPage === "docs"
                  ? "text-purple-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Docs
            </button>
            <button
              onClick={() => setCurrentPage("about")}
              className={`font-medium transition-colors ${
                currentPage === "about"
                  ? "text-purple-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              About
            </button>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setCurrentPage("home");
                  setMobileMenuOpen(false);
                }}
                className="text-left font-medium text-gray-300 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage("app");
                  setMobileMenuOpen(false);
                }}
                className="text-left font-medium text-gray-300 hover:text-white transition-colors"
              >
                Launch App
              </button>
              <button
                onClick={() => {
                  setCurrentPage("docs");
                  setMobileMenuOpen(false);
                }}
                className="text-left font-medium text-gray-300 hover:text-white transition-colors"
              >
                Docs
              </button>
              <button
                onClick={() => {
                  setCurrentPage("about");
                  setMobileMenuOpen(false);
                }}
                className="text-left font-medium text-gray-300 hover:text-white transition-colors"
              >
                About
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
