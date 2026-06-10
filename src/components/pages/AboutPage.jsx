import React from "react";
import {
  Globe, Database, Shield, ArrowRight, CheckCircle,
  Code, Cpu, Server, Lock,
  GraduationCap, Award, Users, Zap
} from "lucide-react";

const TeamMember = ({ name, role, id, color }) => (
  <div className={`bg-slate-800/40 rounded-2xl border ${color.border} p-8 text-center`}>
    <div className={`w-20 h-20 ${color.bg} rounded-full flex items-center justify-center mx-auto mb-5`}>
      <span className={`text-2xl font-bold ${color.text}`}>
        {name.split(" ").map((n) => n[0]).join("")}
      </span>
    </div>
    <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
    <p className={`text-sm font-medium ${color.text} mb-2`}>{role}</p>
    <p className="text-gray-500 text-xs font-mono">ID: {id}</p>
  </div>
);

const TechItem = ({ label, desc, icon: Icon, color }) => (
  <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
    <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="text-white font-semibold text-sm">{label}</p>
      <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
    </div>
  </div>
);

export const AboutPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 py-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-1.5 mb-6">
            <GraduationCap className="w-4 h-4 text-purple-300" />
            <span className="text-sm text-purple-200">Final Year Project — Software Engineering</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            About <span className="text-purple-400">Vault3</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A decentralized, encrypted file storage platform — bridging Web2 simplicity with Web3 sovereignty
          </p>
        </div>

        <div className="space-y-10">

          {/* Team */}
          <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-8">
            <h2 className="text-2xl font-semibold text-white mb-2 flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-400" />
              Development Team
            </h2>
            <p className="text-gray-400 mb-8">
              Developed at Azrieli College of Engineering Jerusalem, Software Engineering Department — Academic Year 2025/26
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <TeamMember
                name="Omar Alian"
                role="Full-Stack Developer"
                id="324148436"
                color={{ bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" }}
              />
              <TeamMember
                name="Anas Kadamany"
                role="Full-Stack Developer"
                id="212522056"
                color={{ bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" }}
              />
            </div>

            <div className="flex items-center gap-4 p-5 bg-slate-900/50 rounded-xl border border-slate-700/30">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-white font-semibold">Academic Supervisor</p>
                <p className="text-gray-300">Mr. Ofir Cohen — Azrieli College of Engineering Jerusalem</p>
                <p className="text-gray-500 text-sm">Department of Software Engineering</p>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6 text-purple-400" />
              Our Mission
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                The modern era of cloud storage offers unprecedented convenience — yet behind the scenes, these platforms
                operate on deeply centralized models that require users to surrender personal information, submit to identity
                verification, and relinquish control over their encryption keys to corporate giants.
              </p>
              <p>
                <strong className="text-white">Vault3</strong> was born to address this gap. Our mission is to give individuals and
                organizations complete sovereignty over their digital assets — through a platform that combines the intuitive
                ease of Web2 cloud storage with the cryptographic guarantees and permanence of Web3 blockchain infrastructure.
              </p>
              <p>
                We built Vault3 as a <strong className="text-purple-300">Zero-Registration, Zero-Knowledge</strong> decentralized
                application where the backend is architecturally incapable of accessing your files or keys — not just
                contractually, but mathematically.
              </p>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-400" />
              Technology Stack
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" /> Frontend
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <TechItem icon={Code} label="React 19" desc="Component-based UI with modern hooks" color="bg-purple-600" />
                  <TechItem icon={Zap} label="Tailwind CSS" desc="Utility-first responsive styling" color="bg-cyan-600" />
                  <TechItem icon={Lock} label="Web Crypto API" desc="AES-256-GCM browser-native encryption" color="bg-green-600" />
                  <TechItem icon={Shield} label="Lucide React" desc="Consistent, accessible icon system" color="bg-pink-600" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-400" /> Backend (Anonymous Relay)
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <TechItem icon={Server} label="Node.js" desc="Lightweight payment webhook handler" color="bg-green-700" />
                  <TechItem icon={Database} label="MongoDB" desc="Anonymous statistical logging only" color="bg-green-600" />
                  <TechItem icon={Shield} label="Stripe API" desc="Fiat payment processing (webhooks)" color="bg-indigo-600" />
                  <TechItem icon={Globe} label="MetaMask" desc="Web3 wallet & crypto payments" color="bg-orange-600" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-green-400" /> Decentralized Storage
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <TechItem icon={Globe} label="Arweave" desc="Immutable blockchain permaweb storage" color="bg-teal-600" />
                  <TechItem icon={Zap} label="Bundlr Protocol" desc="Efficient upload acceleration layer" color="bg-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Commitment */}
          <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-400" />
              Privacy Commitments
            </h2>
            <div className="space-y-4 text-gray-300">
              {[
                {
                  title: "No User Accounts or Personal Data",
                  desc: "We never collect emails, phone numbers, or create user profiles. Your identity is entirely irrelevant to the system.",
                },
                {
                  title: "Backend Cannot Access Your Files",
                  desc: "The Node.js server is architecturally blind — it only processes payment webhooks. It has zero technical capability to decrypt your files.",
                },
                {
                  title: "Encryption Keys Never Leave Your Browser",
                  desc: "Your Vault Key is generated client-side and exported only to you. It is never transmitted to the backend under any circumstances.",
                },
                {
                  title: "No Analytics or Tracking",
                  desc: "No Google Analytics, Facebook Pixel, or third-party tracking. Only anonymous aggregate statistics are stored server-side.",
                },
                {
                  title: "Open-Source & Auditable",
                  desc: "The full codebase is available for community review. Our security guarantees are mathematical, not contractual.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="text-gray-400 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <ArrowRight className="w-6 h-6 text-orange-400" />
              Project Roadmap
            </h2>
            <div className="space-y-6">
              {[
                {
                  phase: "Phase 1 — MVP",
                  status: "done",
                  dot: "bg-green-400",
                  badge: "bg-green-500/20 text-green-300 border-green-500/40",
                  label: "Completed",
                  items: "Core upload, client-side AES-256-GCM encryption, Vault Key generation, and Arweave integration.",
                },
                {
                  phase: "Phase 2 — Vault System",
                  status: "active",
                  dot: "bg-yellow-400",
                  badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
                  label: "In Progress",
                  items: "Multi-file vaults, Stripe + MetaMask payment integration, QR code export, chunk-based processing for large files.",
                },
                {
                  phase: "Phase 3 — Advanced Features",
                  status: "planned",
                  dot: "bg-gray-500",
                  badge: "bg-slate-700 text-gray-400 border-slate-600",
                  label: "Planned",
                  items: "Shared vaults with access delegation, file organization system, mobile apps, and a developer REST API.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-3 h-3 ${item.dot} rounded-full mt-2 flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{item.phase}</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${item.badge}`}>
                        {item.label}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{item.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Context */}
          <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-400" />
              Academic Context
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-300">
              <div>
                <h3 className="text-white font-semibold mb-3">Project Details</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><span className="text-gray-500">Institution:</span> <span>Azrieli College of Engineering Jerusalem</span></li>
                  <li className="flex items-center gap-2"><span className="text-gray-500">Department:</span> <span>Software Engineering</span></li>
                  <li className="flex items-center gap-2"><span className="text-gray-500">Year:</span> <span>2025–2026 (תשפ"ו)</span></li>
                  <li className="flex items-center gap-2"><span className="text-gray-500">Type:</span> <span>Final Year Project (Student Initiative)</span></li>
                  <li className="flex items-center gap-2"><span className="text-gray-500">Supervisor:</span> <span>Mr. Ofir Cohen</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Key References</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Web Crypto API — MDN Web Docs</li>
                  <li>• Arweave & Bundlr Documentation</li>
                  <li>• Stripe API Reference</li>
                  <li>• NIST SP 800-38D (AES-GCM Standard)</li>
                  <li>• React & Tailwind CSS Documentation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl border border-purple-500/20 p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Try Vault3 Today</h2>
            <p className="text-gray-300 mb-6">No signup. No identity. Just encrypted, permanent file storage.</p>
            <button
              onClick={() => setCurrentPage("app")}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-10 py-3.5 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all inline-flex items-center gap-3"
            >
              Launch App
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
