import React, { useState } from "react";
import { Zap, Lock, Star, Shield, Key, Upload, Download, CreditCard, Wallet, AlertCircle, CheckCircle, ChevronDown, ChevronRight } from "lucide-react";

const Section = ({ title, icon: Icon, iconColor, children }) => (
  <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
      <Icon className={`w-6 h-6 ${iconColor}`} />
      {title}
    </h2>
    {children}
  </div>
);

const CodeBlock = ({ children }) => (
  <div className="bg-black/40 border border-slate-700/50 rounded-xl p-4 font-mono text-sm text-green-300 overflow-x-auto">
    <pre>{children}</pre>
  </div>
);

const FAQ = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-700/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-700/20 transition-colors"
      >
        <span className="text-white font-medium">{q}</span>
        {open ? <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-300 text-sm leading-relaxed border-t border-slate-700/30 pt-4">
          {a}
        </div>
      )}
    </div>
  );
};

export const DocsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-xl text-gray-300">
            Everything you need to use Vault3 securely and effectively
          </p>
        </div>

        <div className="space-y-8">

          {/* Quick Start */}
          <Section title="Quick Start" icon={Zap} iconColor="text-yellow-400">
            <div className="space-y-5 text-gray-300">
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
                  desc: "After successful upload, a unique Vault Key is generated. Export it as a text file, copy it to clipboard, or save it as a QR code. This key is your only credential — Vault3 cannot recover a lost key.",
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
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1 flex items-center gap-2">
                        <Icon className="w-4 h-4 text-purple-400" />
                        {item.title}
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Security Architecture */}
          <Section title="Security Architecture" icon={Lock} iconColor="text-green-400">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 text-gray-300">
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
                  <div key={i} className="bg-slate-900/40 rounded-xl p-5 border border-slate-700/30">
                    <h3 className="text-white font-semibold mb-2 text-sm">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
                <p className="text-green-200 font-semibold mb-2 text-sm">Encryption Standard</p>
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
          <Section title="Vault Key Format" icon={Key} iconColor="text-purple-400">
            <div className="space-y-5 text-gray-300">
              <p className="text-sm leading-relaxed">
                A Vault Key is a self-contained credential that encodes both the <strong className="text-white">storage location</strong> (Arweave transaction ID) and the <strong className="text-white">decryption key</strong> (AES-256 raw key in hex). It requires no server to resolve.
              </p>

              <CodeBlock>{`vault://[vault-index-txid]#[master-key-hex]

Example:
vault://vi_a3x9kLm2pQr8nFg...#4f2a8c1b9e3d7a0f...

Components:
  vault://   — Protocol identifier
  vi_...     — Vault index transaction ID (stored on Arweave)
  #          — Separator
  4f2a...    — AES-256 master key (64-char hex = 32 bytes)`}</CodeBlock>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-200 font-semibold text-sm mb-1">Key Security Warning</p>
                    <p className="text-yellow-300/80 text-sm">
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
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div className="bg-slate-900/40 rounded-xl p-6 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-white font-semibold">Credit Card (Stripe)</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Visa, Mastercard, Amex</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Processed by Stripe — PCI compliant</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Backend verifies webhook only</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> No card data stored server-side</li>
                </ul>
              </div>
              <div className="bg-slate-900/40 rounded-xl p-6 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-white font-semibold">Cryptocurrency (MetaMask)</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Ethereum or compatible chains</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Smart contract payment verification</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Maximum anonymity</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> No wallet address stored</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Best Practices */}
          <Section title="Best Practices" icon={Star} iconColor="text-blue-400">
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
                  warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-200 text-yellow-300",
                  info:    "bg-blue-500/10 border-blue-500/30 text-blue-200 text-blue-300",
                  success: "bg-green-500/10 border-green-500/30 text-green-200 text-green-300",
                };
                const [bg, border, heading, body] = styles[item.type].split(" ");
                return (
                  <div key={i} className={`${bg} border ${border} rounded-xl p-5`}>
                    <h3 className={`font-semibold ${heading} mb-1.5 text-sm`}>{item.title}</h3>
                    <p className={`${body} text-sm leading-relaxed`}>{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* FAQ */}
          <Section title="Frequently Asked Questions" icon={Shield} iconColor="text-orange-400">
            <div className="space-y-3">
              {[
                { q: "What happens if I lose my Vault Key?", a: "Your files are permanently inaccessible. The encryption key is contained solely in your Vault Key and is never stored by Vault3. This is by design — it ensures true Zero-Knowledge. Always maintain multiple backups." },
                { q: "Can Vault3 or Arweave read my files?", a: "No. Files are encrypted client-side before any network transmission. The ciphertext stored on Arweave is mathematically indecipherable without your key. Vault3's backend never receives encryption keys or plaintext." },
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
