import React from "react";
import {
  Globe,
  Database,
  Shield,
  ArrowRight,
  CheckCircle,
  Github,
  Twitter,
  ExternalLink,
} from "lucide-react";

export const AboutPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">About Vault3</h1>
          <p className="text-xl text-gray-300">
            Building the future of private, permanent file storage
          </p>
        </div>

        <div className="space-y-12">
          <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6 text-purple-400" />
              Our Mission
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Vault3 exists to give individuals complete control over their
              digital assets. In an era where data breaches, censorship, and
              platform deplatforming are common, we believe everyone deserves
              access to truly private, permanent storage that can't be
              compromised, censored, or taken away.
            </p>
            <p className="text-gray-300 leading-relaxed">
              By combining cutting-edge encryption with blockchain permanence,
              we're building the infrastructure for a more private and
              decentralized internet where users own their data completely.
            </p>
          </div>

          <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-400" />
              Technology Stack
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">
                  Frontend
                </h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• React with modern hooks</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Web Crypto API for encryption</li>
                  <li>• Progressive Web App support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-3">
                  Storage & Blockchain
                </h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Arweave for permanent storage</li>
                  <li>• Bundlr for efficient uploads</li>
                  <li>• AES-256-GCM encryption</li>
                  <li>• Client-side key generation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-400" />
              Privacy Commitment
            </h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">No User Accounts</p>
                  <p>
                    We never collect personal information, emails, or create
                    user profiles.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">No Data Access</p>
                  <p>
                    Files are encrypted before reaching our servers. We can't
                    see your content.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">
                    No Analytics Tracking
                  </p>
                  <p>
                    We don't use Google Analytics, Facebook Pixel, or any
                    tracking services.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Open Source</p>
                  <p>
                    Our code is transparent and auditable by the security
                    community.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <ArrowRight className="w-6 h-6 text-orange-400" />
              Roadmap
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Phase 1: MVP ✅
                  </h3>
                  <p className="text-gray-300">
                    Core upload, encryption, and retrieval functionality with
                    Arweave integration.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Phase 2: Vault System 🔄
                  </h3>
                  <p className="text-gray-300">
                    Multi-file vaults, payment integration (Stripe + MetaMask),
                    and vault key management.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Phase 3: Advanced Features 📅
                  </h3>
                  <p className="text-gray-300">
                    Shared vaults, file organization, mobile apps, and developer
                    API.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50 text-center">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-300 mb-6">
              Have questions, feedback, or want to contribute? We'd love to hear
              from you.
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Twitter className="w-5 h-5" />
                Twitter
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Blog
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};