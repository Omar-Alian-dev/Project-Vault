import React, { useState, useEffect } from "react";
import {
  Shield, Play, BookOpen, ArrowRight, Star, CheckCircle,
  XCircle, AlertCircle, Lock, Globe, Database, Key,
  ChevronDown, Users, Cpu, Server
} from "lucide-react";
import { features } from "../../constants/features";
import { useCases } from "../../constants/useCases";
import { FeatureCard } from "../ui/FeatureCard";
import { UseCaseCard } from "../ui/UseCaseCard";

const HowItWorksStep = ({ number, title, desc, icon: Icon, color }) => (
  <div className="flex flex-col items-center text-center">
    <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-4 shadow-lg`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm mb-3">
      {number}
    </div>
    <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{desc}</p>
  </div>
);

const ComparisonRow = ({ name, vault, google, proton, ipfs }) => {
  const Cell = ({ value }) => {
    if (value === true) return <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />;
    if (value === false) return <XCircle className="w-5 h-5 text-red-400 mx-auto" />;
    if (value === "partial") return <AlertCircle className="w-5 h-5 text-yellow-400 mx-auto" />;
    return <span className="text-gray-300 text-sm">{value}</span>;
  };

  return (
    <tr className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
      <td className="py-4 px-4 text-gray-300 text-sm font-medium">{name}</td>
      <td className="py-4 px-4 text-center"><Cell value={vault} /></td>
      <td className="py-4 px-4 text-center"><Cell value={google} /></td>
      <td className="py-4 px-4 text-center"><Cell value={proton} /></td>
      <td className="py-4 px-4 text-center"><Cell value={ipfs} /></td>
    </tr>
  );
};

const comparisonData = [
  { name: "Client-Side Encryption", vault: true, google: false, proton: true, ipfs: false },
  { name: "Zero Registration", vault: true, google: false, proton: false, ipfs: "partial" },
  { name: "Permanent Storage", vault: true, google: false, proton: false, ipfs: "partial" },
  { name: "Zero-Knowledge Backend", vault: true, google: false, proton: "partial", ipfs: true },
  { name: "No Personal Data Required", vault: true, google: false, proton: false, ipfs: "partial" },
  { name: "One-Time Payment", vault: true, google: false, proton: false, ipfs: false },
  { name: "Easy User Experience", vault: true, google: true, proton: true, ipfs: false },
  { name: "Censorship Resistant", vault: true, google: false, proton: false, ipfs: true },
];

export const HomePage = ({ setCurrentPage }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-900">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
        {/* floating dots */}
        {[
          ["top-1/4 left-1/4", "purple", "0s"],
          ["top-1/3 right-1/3", "blue", "1s"],
          ["bottom-1/3 left-1/3", "green", "2s"],
          ["top-2/3 right-1/4", "purple", "1.5s"],
          ["top-1/2 left-1/2", "blue", "0.5s"],
        ].map(([pos, color, delay], i) => (
          <div
            key={i}
            className={`absolute ${pos} w-1.5 h-1.5 bg-${color}-400 rounded-full animate-pulse`}
            style={{ animationDelay: delay }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="p-4 bg-purple-500/20 rounded-2xl backdrop-blur-sm border border-purple-500/30">
                <Shield className="w-12 h-12 text-purple-400" />
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-white">
                Vault<span className="text-purple-400">3</span>
              </h1>
            </div>

            <div className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-purple-200 font-medium">Decentralized · Zero-Knowledge · Permanent</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-gray-100 mb-6 leading-tight">
              Store your files forever on the blockchain<br className="hidden md:block" />
              with military-grade encryption
            </h2>

            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              No accounts. No tracking. No central server that can be hacked or shut down.
              Your data, your keys, your control — permanently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => setCurrentPage("app")}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-10 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-purple-500/25 hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                Try Vault3 Now — Free
              </button>
              <button
                onClick={() => setCurrentPage("docs")}
                className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 text-white px-10 py-4 rounded-xl font-semibold hover:bg-slate-700/60 transition-all flex items-center justify-center gap-3 text-lg"
              >
                <BookOpen className="w-5 h-5" />
                Documentation
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { value: "∞", label: "Permanent Storage", color: "text-purple-400" },
                { value: "256", label: "Bit AES-GCM", color: "text-blue-400" },
                { value: "0", label: "Data Collected", color: "text-green-400" },
                { value: "100%", label: "Decentralized", color: "text-orange-400" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-8">
          <ChevronDown className="w-6 h-6 text-gray-600 animate-bounce" />
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">How It Works</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three simple steps. Entirely in your browser. Zero server access.
            </p>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-green-500/30" />

            <div className="grid md:grid-cols-3 gap-12">
              <HowItWorksStep
                number="1"
                title="Encrypt Locally"
                desc="Select your files. AES-256-GCM encryption runs entirely in your browser via Web Crypto API. Your plaintext never leaves your device."
                icon={Lock}
                color="bg-gradient-to-br from-purple-500 to-purple-700"
              />
              <HowItWorksStep
                number="2"
                title="Pay & Upload"
                desc="Pay a one-time fee via credit card (Stripe) or crypto (MetaMask). An anonymous upload token is issued. Your identity is never linked to your files."
                icon={Globe}
                color="bg-gradient-to-br from-blue-500 to-blue-700"
              />
              <HowItWorksStep
                number="3"
                title="Store Forever"
                desc="Encrypted chunks are committed to the Arweave permaweb — a blockchain with a one-time payment model guaranteeing permanent, immutable storage."
                icon={Database}
                color="bg-gradient-to-br from-green-500 to-green-700"
              />
            </div>
          </div>

          {/* Vault Key explainer */}
          <div className="mt-16 bg-slate-800/40 rounded-2xl border border-purple-500/20 p-8 text-center max-w-3xl mx-auto">
            <Key className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h4 className="text-2xl font-semibold text-white mb-3">Your Vault Key — Your Only Credential</h4>
            <p className="text-gray-300 leading-relaxed mb-4">
              After upload, you receive a single <strong className="text-purple-300">Vault Key</strong> that contains both the Arweave transaction ID
              and your AES decryption key. Export it as a text file, copy it to your clipboard, or save it as a QR code.
              Anyone with this key can decrypt and download your files — guard it carefully.
            </p>
            <div className="font-mono text-xs text-green-300/70 bg-black/30 px-4 py-2 rounded-lg inline-block">
              vault://vi_a3x9k...#4f2a8c1b...
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Why Choose Vault3?</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built from the ground up with privacy, security, and permanence as non-negotiable core principles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} isActive={index === activeFeature} />
            ))}
          </div>
        </div>
      </section>

      {/* ── System Architecture ── */}
      <section className="py-24 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">System Architecture</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A Client-Heavy, Zero-Knowledge architecture that ensures the backend is cryptographically blind to your data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Cpu,
                color: "purple",
                title: "Frontend — Client-Heavy",
                tech: "React + Tailwind CSS + Web Crypto API",
                points: [
                  "All encryption / decryption happens here",
                  "Vault Key generated and never transmitted",
                  "Chunk-based processing for files up to 500 MB",
                  "Zero plaintext ever leaves the browser",
                ],
              },
              {
                icon: Server,
                color: "blue",
                title: "Backend — Blind Relay",
                tech: "Node.js + MongoDB",
                points: [
                  "Verifies Stripe & MetaMask payment webhooks",
                  "Issues upload tokens to Bundlr network",
                  "Stores only anonymous statistical logs",
                  "No access to encryption keys or files",
                ],
              },
              {
                icon: Database,
                color: "green",
                title: "Storage — Arweave Permaweb",
                tech: "Arweave + Bundlr Protocol",
                points: [
                  "Permanent, immutable blockchain storage",
                  "One-time payment, stored forever",
                  "Globally distributed, censorship-resistant",
                  "No subscription fees, no expiry",
                ],
              },
            ].map((layer, i) => {
              const Icon = layer.icon;
              const bg = layer.color === "purple" ? "bg-purple-500/20" : layer.color === "blue" ? "bg-blue-500/20" : "bg-green-500/20";
              const txt = layer.color === "purple" ? "text-purple-400" : layer.color === "blue" ? "text-blue-400" : "text-green-400";
              const border = layer.color === "purple" ? "border-purple-500/30" : layer.color === "blue" ? "border-blue-500/30" : "border-green-500/30";
              return (
                <div key={i} className={`bg-slate-800/30 rounded-2xl border ${border} p-7`}>
                  <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${txt}`} />
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-1">{layer.title}</h4>
                  <p className={`text-xs font-mono ${txt} mb-4`}>{layer.tech}</p>
                  <ul className="space-y-2">
                    {layer.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                        <CheckCircle className={`w-4 h-4 ${txt} mt-0.5 flex-shrink-0`} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Architecture diagram */}
          <div className="rounded-2xl border border-slate-700/50 overflow-hidden">
            <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-700/50">
              <p className="text-gray-400 text-sm font-medium">Figure 1.0 — Vault3 System Architecture</p>
            </div>
            <div className="bg-slate-900/30 p-6 flex items-center justify-center">
              <img
                src="/architecture.png"
                alt="Vault3 System Architecture Diagram"
                className="max-w-full rounded-xl opacity-90"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <div className="hidden text-gray-500 text-sm py-16">Architecture diagram unavailable</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Who Is Vault3 For?</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Anyone who values privacy, security, and permanent ownership of their digital assets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <UseCaseCard key={index} useCase={useCase} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="py-24 bg-slate-900/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Market Comparison</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how Vault3 compares to existing storage solutions.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-700/50">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800/60 border-b border-slate-700">
                  <th className="py-5 px-4 text-left text-gray-300 font-semibold text-sm">Feature</th>
                  <th className="py-5 px-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-purple-300 font-bold text-base">Vault3</span>
                      <span className="text-xs text-gray-500">Our App</span>
                    </div>
                  </th>
                  <th className="py-5 px-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-gray-300 font-semibold text-sm">Google Drive</span>
                      <span className="text-xs text-gray-500">/ Dropbox</span>
                    </div>
                  </th>
                  <th className="py-5 px-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-gray-300 font-semibold text-sm">Proton Drive</span>
                      <span className="text-xs text-gray-500">/ Tresorit</span>
                    </div>
                  </th>
                  <th className="py-5 px-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-gray-300 font-semibold text-sm">IPFS</span>
                      <span className="text-xs text-gray-500">/ Filecoin</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-slate-900/30">
                {comparisonData.map((row, i) => (
                  <ComparisonRow key={i} {...row} />
                ))}
                <tr className="border-t border-slate-700 bg-slate-800/20">
                  <td className="py-4 px-4 text-gray-300 text-sm font-medium">Rating</td>
                  <td className="py-4 px-4 text-center">
                    <span className="flex items-center justify-center gap-1 text-yellow-400 font-bold">
                      <Star className="w-4 h-4 fill-yellow-400" /> 5.0
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-400 text-sm">4.5</td>
                  <td className="py-4 px-4 text-center text-gray-400 text-sm">4.3</td>
                  <td className="py-4 px-4 text-center text-gray-400 text-sm">3.8</td>
                </tr>
                <tr className="border-t border-slate-700 bg-slate-800/20">
                  <td className="py-4 px-4 text-gray-300 text-sm font-medium">Pricing</td>
                  <td className="py-4 px-4 text-center text-green-300 text-sm font-semibold">Pay-once (Fiat/Crypto)</td>
                  <td className="py-4 px-4 text-center text-gray-400 text-sm">$10–20/mo</td>
                  <td className="py-4 px-4 text-center text-gray-400 text-sm">$4–12/user/mo</td>
                  <td className="py-4 px-4 text-center text-gray-400 text-sm">Variable gas fees</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-6 mt-6 justify-center text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-green-400" /> Fully supported</span>
            <span className="flex items-center gap-1.5"><AlertCircle className="w-3 h-3 text-yellow-400" /> Partial support</span>
            <span className="flex items-center gap-1.5"><XCircle className="w-3 h-3 text-red-400" /> Not supported</span>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-9 h-9 text-purple-400" />
          </div>
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Own Your Digital Sovereignty?
          </h3>
          <p className="text-xl text-gray-200 mb-10 leading-relaxed">
            No sign-up. No identity verification. No monthly fees.<br />
            Just permanent, encrypted, truly private file storage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage("app")}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-12 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage("about")}
              className="bg-slate-800/60 border border-slate-700 text-white px-12 py-4 rounded-xl font-semibold hover:bg-slate-700/60 transition-all flex items-center justify-center gap-3 text-lg"
            >
              <Users className="w-5 h-5" />
              About the Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
