import React from "react";
import {
  Shield, Play, BookOpen, ArrowRight, Star, CheckCircle, Lock, Globe, Database, Fingerprint, Zap
} from "lucide-react";
import { features } from "../../constants/features";

const HowItWorksStep = ({ number, title, desc, icon: Icon, colorClass }) => (
  <div className="glass-panel p-8 rounded-3xl relative group hover:-translate-y-2 transition-transform duration-300">
    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl`} />
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-6 shadow-lg shadow-vault-primary/20`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <div className="absolute top-8 right-8 text-6xl font-heading font-bold text-white/5 group-hover:text-white/10 transition-colors">
      {number}
    </div>
    <h4 className="text-xl font-heading font-bold text-white mb-3">{title}</h4>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-vault-bg overflow-hidden relative">

      {/* ── Background Ambient Lights ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-vault-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-vault-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 max-w-7xl mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left Text Column */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-vault-primary/10 border border-vault-primary/20 rounded-full px-4 py-2 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 bg-vault-cta rounded-full animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <span className="text-sm text-vault-secondary font-medium tracking-wide">V Mainnet is Live</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-[1.1]">
              Sovereign <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-secondary to-vault-primary">
                Cloud Storage
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Military-grade AES-256 encryption meets the immutable Arweave permaweb.
              Zero accounts. Zero tracking. Your files, permanently secured on the blockchain.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center">
              <button
                onClick={() => setCurrentPage("app")}
                className="w-full sm:w-auto bg-vault-cta hover:bg-yellow-400 text-vault-bg px-8 py-4 rounded-xl font-bold font-heading transition-all flex items-center justify-center gap-3 text-lg shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:-translate-y-1"
              >
                <Play className="w-5 h-5 fill-vault-bg" />
                Launch App
              </button>
              <button
                onClick={() => setCurrentPage("docs")}
                className="w-full sm:w-auto glass-panel hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 text-lg group"
              >
                <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                Read the Docs
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6 items-center opacity-70">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-vault-cta fill-vault-cta" />
                <span className="text-sm font-semibold text-white">4.9/5 Rating</span>
              </div>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-vault-secondary" />
                <span className="text-sm font-medium text-gray-300">AES-256-GCM</span>
              </div>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-gray-300">Audited by TechSec</span>
              </div>
            </div>
          </div>

          {/* Right Visual / App Showcase */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto perspective-1000">
            {/* Decorative Behind elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-vault-primary/20 via-transparent to-vault-cta/10 rounded-full blur-3xl -z-10" />

            <div className="glass-panel-light p-3 rounded-[2rem] border-white/20 transform rotate-y-[-5deg] rotate-x-[5deg] shadow-2xl hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700">
              <div className="bg-[#0b0b1a] rounded-3xl overflow-hidden border border-white/5 relative">
                {/* Mockup Header */}
                <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="mx-auto bg-black/40 rounded-md px-3 py-1 border border-white/5 flex items-center gap-2 text-xs text-gray-400 font-mono">
                    <Lock className="w-3 h-3" /> vault.network
                  </div>
                </div>

                {/* Mockup Body */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-heading text-white">Your Vault</h3>
                      <p className="text-xs text-gray-500 font-mono mt-1">vi_a3x9k...4f2a8c1b</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-vault-primary to-vault-secondary p-0.5">
                      <div className="w-full h-full bg-[#0b0b1a] rounded-full flex items-center justify-center">
                        <Fingerprint className="w-5 h-5 text-vault-secondary" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-vault-primary/20 flex items-center justify-center text-vault-secondary">
                          <FileIcon i={i} />
                        </div>
                        <div className="flex-1">
                          <div className="h-4 w-24 bg-white/20 rounded mb-2" />
                          <div className="h-2 w-16 bg-white/10 rounded" />
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-400/80" />
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-white/10 hover:bg-white/15 border border-white/10 text-white py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4 text-vault-cta" /> Encrypt & Upload
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Element 1 */}
            <div className="absolute -left-8 top-12 glass-panel p-4 rounded-2xl animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Database className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Status</p>
                  <p className="text-sm text-white font-bold">Encrypted</p>
                </div>
              </div>
            </div>

            {/* Floating Element 2 */}
            <div className="absolute -right-6 bottom-20 glass-panel p-4 rounded-2xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-vault-primary/20 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-vault-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Network</p>
                  <p className="text-sm text-white font-bold">Arweave</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Zero Knowledge. <span className="text-vault-secondary">Total Control.</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three simple steps to permanent digital sovereignty. Entirely in your browser.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-vault-primary/20 via-vault-secondary/50 to-vault-cta/20 -z-10" />

            <HowItWorksStep
              number="1"
              title="Encrypt Locally"
              desc="Files are encrypted in your browser using Web Crypto API. We never see your plaintext."
              icon={Lock}
              colorClass="from-vault-primary to-purple-800"
            />
            <HowItWorksStep
              number="2"
              title="Pay & Upload"
              desc="Anonymous upload token is issued. No identity linkage. Pay with fiat or crypto."
              icon={Globe}
              colorClass="from-blue-500 to-indigo-800"
            />
            <HowItWorksStep
              number="3"
              title="Store Forever"
              desc="Committed to the Arweave permaweb. Immutable, censorship-resistant storage."
              icon={Database}
              colorClass="from-vault-cta to-orange-600"
            />
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-24 relative z-10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Military-Grade Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built for those who refuse to compromise on security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="glass-panel p-6 rounded-2xl hover:border-vault-primary/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-vault-primary/10 flex items-center justify-center mb-6 group-hover:bg-vault-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-vault-secondary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-panel p-12 rounded-[3rem] text-center relative overflow-hidden border-vault-secondary/30">
            <div className="absolute inset-0 bg-gradient-to-b from-vault-primary/10 to-transparent pointer-events-none" />

            <Shield className="w-16 h-16 text-vault-cta mx-auto mb-6 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Take Back Your Privacy
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto">
              Join the future of decentralized storage. No subscriptions. No surveillance.
            </p>

            <button
              onClick={() => setCurrentPage("app")}
              className="bg-vault-cta hover:bg-yellow-400 text-vault-bg px-10 py-4 rounded-xl font-bold font-heading transition-all inline-flex items-center justify-center gap-3 text-lg shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:-translate-y-1"
            >
              Launch App Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

// Helper for the mockup file icons
const FileIcon = ({ i }) => {
  if (i === 1) return <div className="font-bold text-xs">PDF</div>;
  if (i === 2) return <div className="font-bold text-xs">IMG</div>;
  return <div className="font-bold text-xs">DOC</div>;
};
