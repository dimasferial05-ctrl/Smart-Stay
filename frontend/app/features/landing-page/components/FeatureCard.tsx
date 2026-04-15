import { cn } from "@/lib/utils";
import { type FC, type ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  accentColor: "dark" | "teal" | "indigo";
}

export const FeatureCard: FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  accentColor,
}) => {
  const accentClasses = {
    dark: "border-l-[#1e293b]",
    teal: "border-l-teal-500",
    indigo: "border-l-indigo-500",
  };

  return (
    <div
      className={cn(
        "bg-white p-8 rounded-2xl shadow-sm border border-slate-100 border-l-4 hover:shadow-md transition-shadow",
        accentClasses[accentColor],
      )}
    >
      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-[#1e293b]">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-[#1e293b]">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
};
