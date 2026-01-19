import React, { useState, useEffect } from "react";
import { Shield, Play, BookOpen, ArrowRight } from "lucide-react";
import { features } from "../../constants/features";
import { useCases } from "../../constants/useCases";
import { FeatureCard } from "../ui/FeatureCard";
import { UseCaseCard } from "../ui/UseCaseCard";

export const HomePage = ({ setCurrentPage }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-2000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="p-4 bg-purple-500/20 rounded-2xl backdrop-blur-sm border border-purple-500/30">
                <Shield className="w-12 h-12 text-purple-400" />
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-white">
                Vault<span className="text-purple-400">3</span>
              </h1>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-6">
              Encrypted, Permanent, Decentralized File Storage
            </h2>

            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Store your files forever on the blockchain with military-grade
              encryption. No accounts, no tracking, complete privacy. Your data,
              your control.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => setCurrentPage("app")}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                Try Vault3 Now
              </button>
              <button
                onClick={() => setCurrentPage("docs")}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-700/50 transition-all flex items-center justify-center gap-3 text-lg"
              >
                <BookOpen className="w-5 h-5" />
                View Documentation
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
                <div className="text-gray-400">Permanent Storage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">256</div>
                <div className="text-gray-400">Bit Encryption</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">0</div>
                <div className="text-gray-400">Data Collection</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  100%
                </div>
                <div className="text-gray-400">Decentralized</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Why Choose Vault3?
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built from the ground up with privacy, security, and permanence as
              core principles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
                isActive={index === activeFeature}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Perfect For</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Vault3 serves anyone who values privacy, security, and permanent
              access to their digital assets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <UseCaseCard key={index} useCase={useCase} />
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Secure Your Files Forever?
          </h3>
          <p className="text-xl text-gray-200 mb-8">
            Join the future of decentralized storage. No signup required.
          </p>
          <button
            onClick={() => setCurrentPage("app")}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-12 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl mx-auto"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};