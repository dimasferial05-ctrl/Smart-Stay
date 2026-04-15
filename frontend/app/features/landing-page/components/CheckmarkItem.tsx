import { CheckCircle2 } from "lucide-react";
import { type FC } from "react";

interface CheckmarkItemProps {
  label: string;
  className?: string;
}

export const CheckmarkItem: FC<CheckmarkItemProps> = ({ label, className }) => {
  return (
    <div className={`flex items-center text-slate-600 ${className}`}>
      <CheckCircle2 size={18} className="text-teal-500 mr-3 shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};
