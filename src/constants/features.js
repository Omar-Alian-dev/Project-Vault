import { Lock, Database, Shield, Globe } from "lucide-react";

export const features = [
  {
    title: "Client-Side Encryption",
    description:
      "Your files are encrypted in your browser before they leave your device. We never see your data.",
    icon: Lock,
    color: "purple",
  },
  {
    title: "Permanent Storage",
    description:
      "Files are stored on Arweave's permaweb, ensuring they remain accessible for centuries.",
    icon: Database,
    color: "blue",
  },
  {
    title: "Zero Knowledge",
    description:
      "No accounts, no tracking, no identity verification. Complete privacy by design.",
    icon: Shield,
    color: "green",
  },
  {
    title: "Web3 Native",
    description:
      "Built on blockchain technology with crypto and traditional payment options.",
    icon: Globe,
    color: "orange",
  },
];
