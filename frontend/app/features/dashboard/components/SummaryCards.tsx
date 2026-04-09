import { CheckCircle2, Clock, UserCheck, XCircle } from "lucide-react";
import { type FC } from "react";
import type { DashboardData, SummaryCardProps } from "../types";

const Card: FC<SummaryCardProps> = ({
  label,
  value,
  icon: Icon,
  colorClass,
  bgColorClass,
  borderColorClass,
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex">
    <div className={cn("w-2", borderColorClass)}></div>
    <div className="p-5 flex-1 flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
      </div>
      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center",
          bgColorClass,
          colorClass,
        )}
      >
        <Icon size={24} />
      </div>
    </div>
  </div>
);

export const SummaryCards: FC<{ data: DashboardData }> = ({ data }) => {
  const cards: SummaryCardProps[] = [
    {
      label: "Jumlah Penghuni",
      value: data.total_residents,
      icon: UserCheck,
      colorClass: "text-blue-500",
      bgColorClass: "bg-blue-50",
      borderColorClass: "bg-blue-500",
    },
    {
      label: "Akses Hari Ini",
      value: data.total_access_today,
      icon: Clock,
      colorClass: "text-amber-500",
      bgColorClass: "bg-amber-50",
      borderColorClass: "bg-amber-500",
    },
    {
      label: "Akses Valid",
      value: data.total_valid_access,
      icon: CheckCircle2,
      colorClass: "text-green-500",
      bgColorClass: "bg-green-50",
      borderColorClass: "bg-green-500",
    },
    {
      label: "Akses Tidak Valid",
      value: data.total_invalid_access,
      icon: XCircle,
      colorClass: "text-red-600",
      bgColorClass: "bg-red-50",
      borderColorClass: "bg-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <Card key={i} {...card} />
      ))}
    </div>
  );
};

import { cn } from "@/lib/utils";
