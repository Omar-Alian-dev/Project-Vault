import { Shield, Users, Globe, Database, Briefcase, Code } from "lucide-react";

export const useCases = [
  {
    title: "Privacy-Conscious Individuals",
    description:
      "Store medical records, personal documents, and sensitive files without surrendering your identity to a corporation. Own your data completely.",
    icon: Shield,
    color: "purple",
  },
  {
    title: "Secure Document Sharing",
    description:
      "Share encrypted files peer-to-peer by passing a single Vault Key. No middleman, no platform censorship, no data retention.",
    icon: Users,
    color: "blue",
  },
  {
    title: "Censorship-Resistant Publishing",
    description:
      "Publish content that cannot be taken down, altered, or censored by any authority — permanent and immutable on the Arweave permaweb.",
    icon: Globe,
    color: "green",
  },
  {
    title: "Digital Asset Archiving",
    description:
      "Preserve family photos, research data, or cultural artifacts for future generations with a one-time permanent storage payment.",
    icon: Database,
    color: "orange",
  },
  {
    title: "Organizations & Enterprises",
    description:
      "Eliminate reliance on third-party cloud vendors. Protect sensitive contracts, source code, and financial documents with Zero-Knowledge guarantees.",
    icon: Briefcase,
    color: "cyan",
  },
  {
    title: "Developers & Web3 Builders",
    description:
      "Use Vault as infrastructure for decentralized apps requiring Serverless Identity and permanent, tamper-proof data storage.",
    icon: Code,
    color: "pink",
  },
];
