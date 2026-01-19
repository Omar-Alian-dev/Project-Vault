import React from "react";

export const FeatureCard = ({ feature, isActive }) => {
  const Icon = feature.icon;

  return (
    <div
      className={`p-8 rounded-2xl border transition-all duration-500 ${
        isActive
          ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/50 transform scale-105"
          : "bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50"
      }`}
    >
      <div
        className={`p-3 rounded-xl mb-6 w-fit ${
          feature.color === "purple"
            ? "bg-purple-500/20"
            : feature.color === "blue"
            ? "bg-blue-500/20"
            : feature.color === "green"
            ? "bg-green-500/20"
            : "bg-orange-500/20"
        }`}
      >
        <Icon
          className={`w-8 h-8 ${
            feature.color === "purple"
              ? "text-purple-400"
              : feature.color === "blue"
              ? "text-blue-400"
              : feature.color === "green"
              ? "text-green-400"
              : "text-orange-400"
          }`}
        />
      </div>
      <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
    </div>
  );
};
