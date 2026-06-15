import React, { useState } from "react";
import { Zap, Lock, Star, Shield, Key, Upload, Download, CreditCard, Wallet, AlertCircle, CheckCircle, ChevronDown, ChevronRight } from "lucide-react";

const Section = ({ title, icon: Icon, iconColor, children }) => (
  <div className="glass-panel p-8 md:p-10 rounded-3xl border-white/10 relative group mb-8 overflow-hidden">
    <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-bl from-${iconColor.split('-')[1]}-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-8 flex items-center gap-4 relative z-10">
      <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      {title}
    </h2>
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

const CodeBlock = ({ children }) => (
  <div className="bg-black/50 border border-white/10 rounded-xl p-5 font-mono text-sm text-vault-secondary shadow-inner overflow-x-auto relative group">
    <div className="absolute top-3 right-4 flex gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
    </div>
    <pre className="mt-2 text-gray-300">
      <code>{children}</code>
    </pre>
  </div>
);

const FAQ = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/5 bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors hover:bg-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="text-white font-heading font-semibold text-base md:text-lg">{q}</span>
        {open ? <ChevronDown className="w-5 h-5 text-vault-secondary flex-shrink-0" /> : <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-6 text-gray-400 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4 font-body animate-in fade-in slide-in-from-top-2 duration-300">
          {a}
        </div>
      )}
    </div>
  );
};

export const DocsPage = () => {
  return (
    <div className="min-h-screen bg-vault-bg relative overflow-hidden pt-32 pb-24">
      {/* ── Background Ambient Lights ── */}
      <div className="fixed top-[20%] left-[-10%] w-[40%] h-[40%] bg-vault-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-vault-cta/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-vault-secondary/10 border border-vault-secondary/20 rounded-full px-4 py-2 mb-6">
            <BookOpenIcon className="w-4 h-4 text-vault-secondary" />
            <span className="text-sm text-vault-secondary font-medium tracking-wide">Documentation Hub</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
            Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-secondary to-vault-primary">Base</span>
          </h1>
          <p className="text-xl text-gray-400 font-body">
            Everything you need to use Vault securely and effectively
          </p>
        </div>

        <div className="space-y-12">

          {/* Quick Start */}
          <Section title="Quick Start" icon={Zap} iconColor="text-vault-cta">
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  icon: Upload,
                  title: "Select & Encrypt Your Files",
                  desc: "Drag and drop files onto the upload zone or click to browse. Files are encrypted locally using AES-256-GCM via the browser's built-in Web Crypto API before any network request is made. Your plaintext never leaves your device.",
                },
                {
                  step: "2",
                  icon: CreditCard,
                  title: "Complete Payment",
                  desc: "Choose between Credit Card (Stripe) or Cryptocurrency (MetaMask). A one-time anonymous payment covers permanent Arweave storage. The backend only receives a payment confirmation — it never sees your file or encryption key.",
                },
                {
                  step: "3",
                  icon: Key,
                  title: "Save Your Vault Key",
                  desc: "After successful upload, a unique Vault Key is generated. Export it as a text file, copy it to clipboard, or save it as a QR code. This key is your only credential — Vault cannot recover a lost key.",
                },
                {
                  step: "4",
                  icon: Download,
                  title: "Retrieve Anytime",
                  desc: "Navigate to 'Access Vault', paste your Vault Key, and click Access. Your encrypted files are fetched from Arweave and decrypted locally — instantly, from anywhere in the world.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-5 group">
                    <div className="w-10 h-10 bg-vault-primary/20 border border-vault-primary/30 rounded-xl flex items-center justify-center text-vault-secondary font-heading font-bold flex-shrink-0 mt-0.5 group-hover:bg-vault-primary/30 transition-colors">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white mb-2 flex items-center gap-3 text-lg">
                        <Icon className="w-5 h-5 text-vault-secondary" />
                        {item.title}
                      </p>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed font-body">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Security Architecture */}
          <Section title="Security Architecture" icon={Lock} iconColor="text-green-400">
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "AES-256-GCM Encryption",
                    desc: "All files are encrypted using AES-GCM with a 256-bit key generated fresh for each vault session. The GCM mode provides both confidentiality and integrity authentication — any tampering is detected on decryption.",
                  },
                  {
                    title: "Zero-Knowledge Backend",
                    desc: "The Node.js server is architecturally designed to never touch plaintext data or encryption keys. It only processes Stripe webhook events and issues Bundlr upload tokens — it is a payment relay, not a data server.",
                  },
                  {
                    title: "Zero-Registration Identity",
                    desc: "No user database exists. Your Vault Key IS your complete identity credential. The system is stateless server-side — your access rights are encoded entirely in the key you hold.",
                  },
                  {
                    title: "Chunked Processing",
                    desc: "Files are split into 2 MB chunks before encryption. Each chunk is encrypted with a unique IV derived from the base IV + chunk index, preventing browser memory exhaustion on large files (up to 500 MB).",
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-vault-secondary/30 transition-colors">
                    <h3 className="text-white font-heading font-bold mb-3 text-base">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-body">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Lock className="w-24 h-24 text-green-500/10" />
                </div>
                <p className="text-green-400 font-heading font-bold mb-4 text-base relative z-10">Encryption Standard</p>
                <CodeBlock>{`Algorithm:  AES-GCM
Key Length: 256 bits
IV Length:  96 bits (12 bytes), unique per chunk
Auth Tag:   128 bits (16 bytes)
API:        window.crypto.subtle (Web Crypto API)
Standard:   NIST SP 800-38D`}</CodeBlock>
              </div>
            </div>
          </Section>

          {/* Vault Key Format */}
          <Section title="Vault Key Format" icon={Key} iconColor="text-vault-secondary">
            <div className="space-y-6">
              <p className="text-base text-gray-300 leading-relaxed font-body">
                A Vault Key is a self-contained credential that encodes both the <strong className="text-white font-medium">storage location</strong> (Arweave transaction ID) and the <strong className="text-white font-medium">decryption key</strong> (AES-256 raw key in hex). It requires no server to resolve.
              </p>

              <CodeBlock>{`vault://[vault-index-txid]#[master-key-hex]

Example:
vault://vi_a3x9kLm2pQr8nFg...#4f2a8c1b9e3d7a0f...

Components:
  vault://   — Protocol identifier
  vi_...     — Vault index transaction ID (stored on Arweave)
  #          — Separator
  4f2a...    — AES-256 master key (64-char hex = 32 bytes)`}</CodeBlock>

              <div className="bg-vault-cta/10 border border-vault-cta/30 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-vault-cta mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-vault-cta font-heading font-bold text-base mb-2">Key Security Warning</p>
                    <p className="text-gray-300 text-sm leading-relaxed font-body">
                      Anyone who possesses your Vault Key can decrypt and download all files in that vault.
                      Never share it over insecure channels. Store it in a password manager or offline backup.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Payment */}
          <Section title="Payment Options" icon={CreditCard} iconColor="text-blue-400">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-2xl p-8 border border-white/5 hover:border-blue-400/30 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                    <CreditCard className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white font-heading font-bold text-lg">Credit Card</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle className="w-4 h-4 text-blue-400" /> Visa, Mastercard, Amex</li>
                  <li className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle className="w-4 h-4 text-blue-400" /> Processed by Stripe</li>
                  <li className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle className="w-4 h-4 text-blue-400" /> Backend verifies webhook only</li>
                  <li className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle className="w-4 h-4 text-blue-400" /> No card data stored server-side</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-2xl p-8 border border-white/5 hover:border-orange-400/30 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center border border-orange-500/30">
                    <Wallet className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-white font-heading font-bold text-lg">Cryptocurrency</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle className="w-4 h-4 text-orange-400" /> Ethereum or compatible chains</li>
                  <li className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle className="w-4 h-4 text-orange-400" /> Smart contract verification</li>
                  <li className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle className="w-4 h-4 text-orange-400" /> Maximum anonymity</li>
                  <li className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle className="w-4 h-4 text-orange-400" /> No wallet address stored</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Best Practices */}
          <Section title="Best Practices" icon={Star} iconColor="text-yellow-400">
            <div className="space-y-4">
              {[
                {
                  type: "warning",
                  title: "Key Management — Critical",
                  desc: "Back up your Vault Key in at least two separate locations: a password manager AND an offline physical backup. Use all three export options — clipboard, text file, and QR code.",
                },
                {
                  type: "info",
                  title: "File Preparation",
                  desc: "Use descriptive filenames before upload — you cannot rename files post-encryption. For many small related files, consider archiving them into a single .zip before uploading.",
                },
                {
                  type: "success",
                  title: "Immediate Verification",
                  desc: "After upload, immediately test your Vault Key in the 'Access Vault' panel to confirm retrieval works. Do this before closing your browser tab.",
                },
                {
                  type: "info",
                  title: "Large File Handling",
                  desc: "Files up to 500 MB are supported. Encryption uses chunk-based processing to prevent browser memory issues. Keep your browser tab active during large uploads.",
                },
              ].map((item, i) => {
                const styles = {
                  warning: "bg-vault-cta/10 border-vault-cta/30 text-vault-cta",
                  info: "bg-vault-secondary/10 border-vault-secondary/30 text-vault-secondary",
                  success: "bg-green-500/10 border-green-500/30 text-green-400",
                };
                const theme = styles[item.type];
                return (
                  <div key={i} className={`${theme.split(' ')[0]} border ${theme.split(' ')[1]} rounded-2xl p-6`}>
                    <h3 className={`font-heading font-bold ${theme.split(' ')[2]} mb-2 text-base`}>{item.title}</h3>
                    <p className={`text-gray-300 text-sm leading-relaxed font-body`}>{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* FAQ */}
          <Section title="Frequently Asked Questions" icon={Shield} iconColor="text-vault-primary">
            <div className="space-y-4">
              {[
                { q: "What happens if I lose my Vault Key?", a: "Your files are permanently inaccessible. The encryption key is contained solely in your Vault Key and is never stored by Vault. This is by design — it ensures true Zero-Knowledge. Always maintain multiple backups." },
                { q: "Can Vault or Arweave read my files?", a: "No. Files are encrypted client-side before any network transmission. The ciphertext stored on Arweave is mathematically indecipherable without your key. Vault's backend never receives encryption keys or plaintext." },
                { q: "Are my files truly permanent?", a: "Arweave uses a one-time payment model with a built-in endowment that funds future storage costs. Files committed to the Arweave permaweb are designed to persist as long as the network exists — with a 200+ year storage guarantee backed by the protocol's economics." },
                { q: "Can I share files with others?", a: "Yes — simply share your Vault Key with the recipient. Anyone with the key can decrypt and download the files. For shared access, treat the Vault Key like a shared password." },
                { q: "What file types and sizes are supported?", a: "Any file type is supported. The system uses chunk-based processing to handle files up to 500 MB without browser instability. Images, videos, archives, documents, source code — all are equally supported." },
                { q: "Is my payment linked to my files?", a: "No. The backend receives only an anonymous payment confirmation from Stripe or MetaMask. No personal financial information is linked to the upload transaction or the resulting Arweave ID." },
              ].map((item, i) => (
                <FAQ key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
};

const BookOpenIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);
