import React from "react";

const colorMap = {
  purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
  blue:   { bg: "bg-blue-500/20",   text: "text-blue-400",   border: "border-blue-500/30" },
  green:  { bg: "bg-green-500/20",  text: "text-green-400",  border: "border-green-500/30" },
  orange: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
  cyan:   { bg: "bg-cyan-500/20",   text: "text-cyan-400",   border: "border-cyan-500/30" },
  pink:   { bg: "bg-pink-500/20",   text: "text-pink-400",   border: "border-pink-500/30" },
};

export const UseCaseCard = ({ useCase }) => {
  const Icon = useCase.icon;
  const c = colorMap[useCase.color] || colorMap.purple;

  return (
    <div className={`flex items-start gap-6 p-8 bg-slate-800/30 rounded-2xl border ${c.border} hover:border-opacity-70 transition-all hover:bg-slate-800/50`}>
      <div className={`p-3 ${c.bg} rounded-xl flex-shrink-0`}>
        <Icon className={`w-8 h-8 ${c.text}`} />
      </div>
      <div>
        <h4 className="text-xl font-semibold text-white mb-3">{useCase.title}</h4>
        <p className="text-gray-300 leading-relaxed">{useCase.description}</p>
      </div>
    </div>
  );
};
