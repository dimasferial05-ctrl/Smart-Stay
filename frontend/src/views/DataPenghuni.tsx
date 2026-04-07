import { Loader2, PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";

// --- 1. Sesuaikan Tipe Data dengan Schema Backend ---
interface Resident {
  id: number;
  name: string;
  phone: string | null;
  rfid_code: string | null;
  pin: string | null;
  created_at: string;
}

const DataPenghuni = () => {
  // --- 2. State Management ---
  const [searchQuery, setSearchQuery] = useState("");
  const [residents, setResidents] = useState<Resident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- 3. Fetch Data dari FastAPI ---
  useEffect(() => {
    const fetchResidents = async () => {
      try {
        setIsLoading(true);
        // Memanggil API backend yang berjalan di port 8000
        const response = await fetch("http://localhost:8000/api/residents");

        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }

        const data = await response.json();
        setResidents(data); // Menyimpan data dari database ke state React
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResidents();
  }, []); // Array kosong artinya fungsi ini hanya berjalan 1x saat komponen dirender

  // --- 4. Logika Pencarian ---
  const filteredData = residents.filter((penghuni) => {
    const nameMatch = penghuni.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const phoneMatch = penghuni.phone
      ? penghuni.phone.includes(searchQuery)
      : false;
    return nameMatch || phoneMatch;
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Top Section: Search & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 w-full md:w-96">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search .."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition-colors shadow-sm">
          <PlusCircle size={20} />
          Tambah data
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2 border-gray-100 text-gray-700">
                <th className="pb-4 font-bold w-16 text-center">NO</th>
                <th className="pb-4 font-bold">Nama Penghuni</th>
                <th className="pb-4 font-bold">Nomer Telp</th>
                <th className="pb-4 font-bold">Foto</th>
                <th className="pb-4 font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Tampilan saat Loading */}
              {isLoading && (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-blue-500 gap-2">
                      <Loader2 className="animate-spin" size={32} />
                      <span className="text-gray-500 font-medium">
                        Memuat data...
                      </span>
                    </div>
                  </td>
                </tr>
              )}

              {/* Tampilan jika Error */}
              {!isLoading && error && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-red-500 font-medium bg-red-50"
                  >
                    Error: {error}
                  </td>
                </tr>
              )}

              {/* Tampilan Data */}
              {!isLoading && !error && filteredData.length > 0
                ? filteredData.map((penghuni, index) => (
                    <tr
                      key={penghuni.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-3 text-center text-gray-600 font-medium">
                        {index + 1}
                      </td>
                      <td className="py-3 font-medium text-gray-800">
                        {penghuni.name}
                      </td>
                      <td className="py-3 text-gray-600">
                        {penghuni.phone || "-"}
                      </td>
                      <td className="py-3">
                        {/* Karena di database kita belum menyimpan foto, kita gunakan avatar generator otomatis berdasarkan nama */}
                        <img
                          src={`https://ui-avatars.com/api/?name=${penghuni.name}&background=random&color=fff`}
                          alt={`Foto ${penghuni.name}`}
                          className="w-16 h-10 object-cover rounded shadow-sm border border-gray-200"
                        />
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-1.5 rounded-md font-medium text-sm transition-colors shadow-sm">
                            Edit
                          </button>
                          <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-1.5 rounded-md font-medium text-sm transition-colors shadow-sm">
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : !isLoading &&
                  !error && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-gray-500"
                      >
                        Tidak ada data penghuni ditemukan.
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataPenghuni;
