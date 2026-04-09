import { Unlock } from "lucide-react";
import { type FC } from "react";

interface QuickAccessProps {
  lastAccess: string | null;
}

export const QuickAccess: FC<QuickAccessProps> = ({ lastAccess }) => {
  const formatFullDate = (dateString: string | null): string => {
    if (!dateString) return "Belum ada data";
    return new Date(dateString).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Akses Cepat</h2>

      <button
        type="button"
        className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-3.5 rounded-lg font-semibold flex justify-center items-center gap-2 transition-colors shadow-sm mb-6"
      >
        <Unlock size={20} />
        Buka Pintu Cepat
      </button>

      <div className="space-y-3">
        <StatusRow
          label="Status Gerbang"
          value="Terkunci & Aman"
          valueClassName="text-gray-800"
        />
        <StatusRow
          label="Sistem AI"
          value="Online & Aktif"
          valueClassName="text-[#10b981]"
        />
        <StatusRow
          label="Akses Terakhir"
          value={formatFullDate(lastAccess)}
          valueClassName="text-gray-800"
        />
      </div>
    </div>
  );
};

const StatusRow: FC<{
  label: string;
  value: string;
  valueClassName?: string;
}> = ({ label, value, valueClassName }) => (
  <div className="bg-slate-50 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between border border-slate-100">
    <span className="text-sm text-gray-500 mb-1 sm:mb-0">{label}</span>
    <span className={cn("font-semibold", valueClassName)}>{value}</span>
  </div>
);

import { cn } from "@/lib/utils";
