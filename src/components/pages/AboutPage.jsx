import React from "react";
import {
  Globe, Database, Shield, ArrowRight, CheckCircle,
  Code, Cpu, Server, Lock,
  GraduationCap, Award, Users, Zap
} from "lucide-react";

const TeamMember = ({ name, role, id, color }) => (
  <div className={`glass-panel p-8 rounded-3xl relative group overflow-hidden`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${color.bg} opacity-10 group-hover:opacity-20 transition-opacity`} />
    <div className={`w-24 h-24 rounded-full bg-white/5 border ${color.border} flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] relative z-10`}>
      <span className={`text-3xl font-heading font-bold ${color.text}`}>
        {name.split(" ").map((n) => n[0]).join("")}
      </span>
    </div>
    <div className="relative z-10 text-center">
      <h3 className="text-2xl font-heading font-bold text-white mb-2">{name}</h3>
      <p className={`text-sm font-semibold tracking-wide uppercase ${color.text} mb-3`}>{role}</p>
      <div className="inline-block bg-black/40 px-3 py-1 rounded-full border border-white/5">
        <p className="text-gray-400 text-xs font-mono">TEAM MEMBER {id}</p>
      </div>
    </div>
  </div>
);

const TechItem = ({ label, desc, icon: Icon, color }) => (
  <div className="bg-white/5 hover:bg-white/10 transition-colors p-5 rounded-2xl border border-white/5 flex items-start gap-4 group">
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-white font-heading font-bold text-base mb-1">{label}</p>
      <p className="text-gray-400 text-sm font-body leading-relaxed">{desc}</p>
    </div>
  </div>
);

export const AboutPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-vault-bg relative overflow-hidden pt-32 pb-24">
      {/* ── Background Ambient Lights ── */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-vault-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-vault-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-vault-secondary/10 border border-vault-secondary/20 rounded-full px-5 py-2 mb-8">
            <GraduationCap className="w-4 h-4 text-vault-secondary" />
            <span className="text-sm text-vault-secondary font-medium tracking-wide">Final Year Project — Software Engineering</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-secondary to-vault-primary">Vault</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-body">
            A decentralized, encrypted file storage platform — bridging Web2 simplicity with Web3 sovereignty
          </p>
        </div>

        <div className="space-y-12">

          {/* Team */}
          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/10">
            <h2 className="text-3xl font-heading font-bold text-white mb-4 flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Users className="w-6 h-6 text-vault-primary" />
              </div>
              Development Team
            </h2>
            <p className="text-gray-400 mb-10 text-lg font-body">
              Developed at Azrieli College of Engineering Jerusalem, Software Engineering Department — Academic Year 2025/26
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <TeamMember
                name="Omar Alian"
                role="Full-Stack Developer"
                id="#01"
                color={{ bg: "from-vault-primary to-purple-900", text: "text-vault-secondary", border: "border-vault-primary/30" }}
              />
              <TeamMember
                name="Anas Kadamany"
                role="Full-Stack Developer"
                id="#02"
                color={{ bg: "from-blue-500 to-indigo-900", text: "text-blue-400", border: "border-blue-500/30" }}
              />
            </div>

            <div className="flex items-center gap-5 p-6 bg-black/40 rounded-2xl border border-white/5">
              <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-green-500/30">
                <GraduationCap className="w-7 h-7 text-green-400" />
              </div>
              <div>
                <p className="text-white font-heading font-bold text-lg">Academic Supervisor</p>
                <p className="text-gray-300 font-body mt-1">Mr. Ofir Cohen — Azrieli College of Engineering Jerusalem</p>
                <p className="text-gray-500 text-sm mt-1 font-mono">Department of Software Engineering</p>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-vault-secondary/10 rounded-full blur-3xl" />
            <h2 className="text-3xl font-heading font-bold text-white mb-8 flex items-center gap-4 relative z-10">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Globe className="w-6 h-6 text-vault-secondary" />
              </div>
              Our Mission
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed font-body text-lg relative z-10">
              <p>
                The modern era of cloud storage offers unprecedented convenience — yet behind the scenes, these platforms
                operate on deeply centralized models that require users to surrender personal information, submit to identity
                verification, and relinquish control over their encryption keys to corporate giants.
              </p>
              <p>
                <strong className="text-white font-semibold">Vault</strong> was born to address this gap. Our mission is to give individuals and
                organizations complete sovereignty over their digital assets — through a platform that combines the intuitive
                ease of Web2 cloud storage with the cryptographic guarantees and permanence of Web3 blockchain infrastructure.
              </p>
              <p className="bg-white/5 p-6 rounded-2xl border border-white/5">
                We built Vault as a <strong className="text-vault-secondary font-semibold">Zero-Registration, Zero-Knowledge</strong> decentralized
                application where the backend is architecturally incapable of accessing your files or keys — not just
                contractually, but mathematically.
              </p>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/10">
            <h2 className="text-3xl font-heading font-bold text-white mb-10 flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Database className="w-6 h-6 text-blue-400" />
              </div>
              Technology Stack
            </h2>

            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-vault-primary" /> Frontend
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <TechItem icon={Code} label="React 19" desc="Component-based UI with modern hooks" color="bg-vault-primary" />
                  <TechItem icon={Zap} label="Tailwind CSS" desc="Utility-first responsive styling" color="bg-cyan-600" />
                  <TechItem icon={Lock} label="Web Crypto API" desc="AES-256-GCM browser-native encryption" color="bg-green-600" />
                  <TechItem icon={Shield} label="Lucide React" desc="Consistent, accessible icon system" color="bg-pink-600" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                  <Server className="w-5 h-5 text-blue-400" /> Backend (Anonymous Relay)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <TechItem icon={Server} label="Node.js" desc="Lightweight payment webhook handler" color="bg-green-700" />
                  <TechItem icon={Database} label="MongoDB" desc="Anonymous statistical logging only" color="bg-emerald-600" />
                  <TechItem icon={Shield} label="Stripe API" desc="Fiat payment processing (webhooks)" color="bg-indigo-600" />
                  <TechItem icon={Globe} label="MetaMask" desc="Web3 wallet & crypto payments" color="bg-orange-600" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                  <Database className="w-5 h-5 text-green-400" /> Decentralized Storage
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <TechItem icon={Globe} label="Arweave" desc="Immutable blockchain permaweb storage" color="bg-teal-600" />
                  <TechItem icon={Zap} label="Bundlr Protocol" desc="Efficient upload acceleration layer" color="bg-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Commitment */}
          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/10">
            <h2 className="text-3xl font-heading font-bold text-white mb-8 flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              Privacy Commitments
            </h2>
            <div className="space-y-6 text-gray-300">
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
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-heading font-bold text-white text-lg mb-1">{item.title}</p>
                    <p className="text-gray-400 font-body leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/10">
            <h2 className="text-3xl font-heading font-bold text-white mb-10 flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <ArrowRight className="w-6 h-6 text-vault-cta" />
              </div>
              Project Roadmap
            </h2>
            <div className="space-y-8 relative">
              <div className="absolute left-3.5 top-2 bottom-2 w-px bg-white/10" />
              {[
                {
                  phase: "Phase 1 — MVP",
                  dot: "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]",
                  badge: "bg-green-500/20 text-green-400 border-green-500/40",
                  label: "Completed",
                  items: "Core upload, client-side AES-256-GCM encryption, Vault Key generation, and Arweave integration.",
                },
                {
                  phase: "Phase 2 — Vault System",
                  dot: "bg-vault-cta shadow-[0_0_10px_rgba(251,191,36,0.5)]",
                  badge: "bg-vault-cta/20 text-vault-cta border-vault-cta/40",
                  label: "In Progress",
                  items: "Multi-file vaults, Stripe + MetaMask payment integration, QR code export, chunk-based processing for large files.",
                },
                {
                  phase: "Phase 3 — Advanced Features",
                  dot: "bg-gray-500",
                  badge: "bg-white/5 text-gray-400 border-white/10",
                  label: "Planned",
                  items: "Shared vaults with access delegation, file organization system, mobile apps, and a developer REST API.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 relative z-10">
                  <div className={`w-3 h-3 ${item.dot} rounded-full mt-2.5 flex-shrink-0 ring-4 ring-vault-bg`} />
                  <div className="flex-1 bg-white/5 p-6 rounded-2xl border border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <h3 className="text-xl font-heading font-bold text-white">{item.phase}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full border font-bold uppercase tracking-wider w-fit ${item.badge}`}>
                        {item.label}
                      </span>
                    </div>
                    <p className="text-gray-400 font-body leading-relaxed">{item.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Context */}
          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/10">
            <h2 className="text-3xl font-heading font-bold text-white mb-8 flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Award className="w-6 h-6 text-vault-cta" />
              </div>
              Academic Context
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-300">
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                <h3 className="text-white font-heading font-bold text-lg mb-4">Project Details</h3>
                <ul className="space-y-3 font-body">
                  <li className="flex items-center gap-3"><span className="text-gray-500 w-24">Institution:</span> <span className="text-white">Azrieli College of Engineering Jerusalem</span></li>
                  <li className="flex items-center gap-3"><span className="text-gray-500 w-24">Department:</span> <span className="text-white">Software Engineering</span></li>
                  <li className="flex items-center gap-3"><span className="text-gray-500 w-24">Year:</span> <span className="text-white">2025–2026 (תשפ"ו)</span></li>
                  <li className="flex items-center gap-3"><span className="text-gray-500 w-24">Type:</span> <span className="text-white">Final Year Project</span></li>
                  <li className="flex items-center gap-3"><span className="text-gray-500 w-24">Supervisor:</span> <span className="text-white">Mr. Ofir Cohen</span></li>
                </ul>
              </div>
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                <h3 className="text-white font-heading font-bold text-lg mb-4">Key References</h3>
                <ul className="space-y-3 font-body text-gray-400">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-vault-secondary rounded-full" /> Web Crypto API — MDN Web Docs</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-vault-secondary rounded-full" /> Arweave & Bundlr Documentation</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-vault-secondary rounded-full" /> Stripe API Reference</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-vault-secondary rounded-full" /> NIST SP 800-38D (AES-GCM Standard)</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-vault-secondary rounded-full" /> React & Tailwind CSS Documentation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="glass-panel p-12 rounded-[3rem] border-vault-secondary/30 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-vault-primary/20 to-transparent pointer-events-none" />
            <h2 className="text-4xl font-heading font-bold text-white mb-4 relative z-10">Try Vault Today</h2>
            <p className="text-xl text-gray-300 mb-8 font-body relative z-10">No signup. No identity. Just encrypted, permanent file storage.</p>
            <button
              onClick={() => setCurrentPage("app")}
              className="relative z-10 bg-vault-cta hover:bg-yellow-400 text-vault-bg px-10 py-4 rounded-xl font-bold font-heading transition-all inline-flex items-center gap-3 text-lg shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:-translate-y-1"
            >
              Launch App
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
