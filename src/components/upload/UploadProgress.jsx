import React from "react";
import { Lock, CreditCard, Globe, CheckCircle, Loader } from "lucide-react";

const STEPS = [
  { key: "encrypt", label: "Encrypting", desc: "AES-256-GCM in your browser", icon: Lock, color: "purple" },
  { key: "pay",     label: "Verifying Payment", desc: "Anonymous token issued", icon: CreditCard, color: "blue" },
  { key: "upload",  label: "Uploading to Arweave", desc: "Committing to permaweb", icon: Globe, color: "green" },
  { key: "finalize",label: "Finalizing Vault", desc: "Generating your Vault Key", icon: CheckCircle, color: "orange" },
];

const colorMap = {
  purple: "text-purple-400 bg-purple-500/20",
  blue:   "text-blue-400 bg-blue-500/20",
  green:  "text-green-400 bg-green-500/20",
  orange: "text-orange-400 bg-orange-500/20",
};

export const UploadProgress = ({ uploadStep, stepProgress, currentFileIndex, totalFiles }) => {
  const currentStepIndex = STEPS.findIndex((s) => s.key === uploadStep);

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-white mb-2">
          {uploadStep === "done" ? "Upload Complete!" : "Securing Your Files..."}
        </h3>
        {totalFiles > 1 && (
          <p className="text-gray-400 text-sm">
            File {currentFileIndex} of {totalFiles}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isDone = currentStepIndex > index || uploadStep === "done";
          const isActive = currentStepIndex === index && uploadStep !== "done";
          const cc = colorMap[step.color];

          return (
            <div key={step.key} className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
              isActive ? "bg-slate-700/40 border border-slate-600/50" : ""
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDone ? "bg-green-500/20" : isActive ? cc : "bg-slate-700/40"
              }`}>
                {isDone ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : isActive ? (
                  <Loader className={`w-5 h-5 animate-spin ${cc.split(" ")[0]}`} />
                ) : (
                  <Icon className="w-5 h-5 text-gray-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className={`font-medium ${isDone ? "text-green-300" : isActive ? "text-white" : "text-gray-500"}`}>
                    {step.label}
                  </p>
                  {isActive && (
                    <span className={`text-sm font-mono ${cc.split(" ")[0]}`}>{stepProgress}%</span>
                  )}
                  {isDone && (
                    <span className="text-sm text-green-400">Done</span>
                  )}
                </div>
                <p className={`text-sm ${isDone ? "text-gray-400" : isActive ? "text-gray-300" : "text-gray-600"}`}>
                  {step.desc}
                </p>

                {isActive && (
                  <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        step.color === "purple" ? "bg-purple-500" :
                        step.color === "blue" ? "bg-blue-500" :
                        step.color === "green" ? "bg-green-500" : "bg-orange-500"
                      }`}
                      style={{ width: `${stepProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {uploadStep === "done" && (
        <div className="mt-6 flex items-center justify-center gap-2 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">All files encrypted and stored on Arweave</span>
        </div>
      )}
    </div>
  );
};
