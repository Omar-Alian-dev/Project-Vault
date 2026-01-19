import React from "react";

export const UseCaseCard = ({ useCase }) => {
  const Icon = useCase.icon;

  return (
    <div className="flex items-start gap-6 p-8 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all">
      <div className="p-3 bg-purple-500/20 rounded-xl flex-shrink-0">
        <Icon className="w-8 h-8 text-purple-400" />
      </div>
      <div>
        <h4 className="text-xl font-semibold text-white mb-3">
          {useCase.title}
        </h4>
        <p className="text-gray-300 leading-relaxed">{useCase.description}</p>
      </div>
    </div>
  );
};