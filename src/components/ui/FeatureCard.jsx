import React from "react";

const colorMap = {
  purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/50", glow: "from-purple-500/20 to-purple-900/10" },
  blue:   { bg: "bg-blue-500/20",   text: "text-blue-400",   border: "border-blue-500/50",   glow: "from-blue-500/20 to-blue-900/10" },
  green:  { bg: "bg-green-500/20",  text: "text-green-400",  border: "border-green-500/50",  glow: "from-green-500/20 to-green-900/10" },
  orange: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/50", glow: "from-orange-500/20 to-orange-900/10" },
  yellow: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/50", glow: "from-yellow-500/20 to-yellow-900/10" },
  pink:   { bg: "bg-pink-500/20",   text: "text-pink-400",   border: "border-pink-500/50",   glow: "from-pink-500/20 to-pink-900/10" },
};

export const FeatureCard = ({ feature, isActive }) => {
  const Icon = feature.icon;
  const c = colorMap[feature.color] || colorMap.purple;

  return (
    <div
      className={`p-8 rounded-2xl border transition-all duration-500 ${
        isActive
          ? `bg-gradient-to-br ${c.glow} ${c.border} transform scale-105 shadow-xl`
          : "bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50 hover:scale-102"
      }`}
    >
      <div className={`p-3 rounded-xl mb-6 w-fit ${c.bg}`}>
        <Icon className={`w-8 h-8 ${c.text}`} />
      </div>
      <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
    </div>
  );
};
