import { type Resident } from "@/types";
import { PlusCircle, Search } from "lucide-react";
import { type FC, useState } from "react";
import { useLoaderData } from "react-router";
import { ResidentTable } from "./components/ResidentTable";

export const ResidentFeature: FC = () => {
  const initialData = useLoaderData() as Resident[];
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = initialData.filter((res) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      res.name.toLowerCase().includes(searchLower) ||
      (res.phone?.includes(searchQuery) ?? false)
    );
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 w-full md:w-96">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari nama atau nomor telepon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-700"
            />
          </div>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition-colors shadow-sm">
          <PlusCircle size={20} />
          Tambah Data
        </button>
      </div>

      <ResidentTable residents={filteredData} />
    </div>
  );
};
