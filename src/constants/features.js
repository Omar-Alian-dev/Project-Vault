import { Lock, Database, Shield, Globe, Zap, Key } from "lucide-react";

export const features = [
  {
    title: "AES-256-GCM Encryption",
    description:
      "Military-grade encryption runs entirely in your browser via Web Crypto API. Your plaintext never leaves your device.",
    icon: Lock,
    color: "purple",
  },
  {
    title: "Permanent Permaweb Storage",
    description:
      "Files are committed to Arweave's immutable blockchain. No subscriptions, no expiry — stored for centuries.",
    icon: Database,
    color: "blue",
  },
  {
    title: "Zero-Knowledge Architecture",
    description:
      "Our backend is cryptographically blind. It only processes payment webhooks — never your files or keys.",
    icon: Shield,
    color: "green",
  },
  {
    title: "Zero-Registration",
    description:
      "No email, no account, no identity verification. Your Vault Key is your entire credential.",
    icon: Globe,
    color: "orange",
  },
  {
    title: "Instant Retrieval",
    description:
      "Access your files from anywhere using only your Vault Key. Decryption happens locally in milliseconds.",
    icon: Zap,
    color: "yellow",
  },
  {
    title: "Sovereign Key Control",
    description:
      "Export your Vault Key as a text file, clipboard copy, or QR code. You are the sole custodian.",
    icon: Key,
    color: "pink",
  },
];
