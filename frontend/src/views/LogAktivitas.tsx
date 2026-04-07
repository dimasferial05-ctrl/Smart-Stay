import { Calendar, Download, Filter, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";

// --- 1. Sesuaikan Tipe Data dengan Backend ---
interface Resident {
  id: number;
  name: string;
}

interface ActivityLog {
  id: number;
  resident_id: number | null;
  method: string;
  status: string;
  similarity: number | null;
  created_at: string;
  resident: Resident | null;
}

const LogAktivitas = () => {
  // --- 2. State Management ---
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // --- 3. Fetch Data dari API ---
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8000/api/logs");
        if (!response.ok)
          throw new Error("Gagal mengambil data log dari server");
        const data = await response.json();
        setLogs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // --- 4. Fungsi Format Data (Database -> UI) ---
  const formatMethod = (method: string) => {
    if (method === "face_recognition") return "Face Recognition";
    if (method === "rfid") return "RFID";
    if (method === "pin") return "PIN";
    return method;
  };

  const formatStatus = (status: string) => {
    if (status === "berhasil") return "VALID";
    if (status === "gagal") return "GAGAL";
    return status;
  };

  // --- 5. Logika Filter ---
  const filteredData = logs.filter((log) => {
    const name = log.resident ? log.resident.name : "Unknown Person";
    const uiStatus = formatStatus(log.status);
    const logDate = new Date(log.created_at).toISOString().split("T")[0];

    const matchesSearch = name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || uiStatus === statusFilter;
    const matchesDate = dateFilter === "" || logDate === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // --- 6. Logika Export CSV ---
  const handleExportCSV = () => {
    const headers = [
      "Waktu",
      "Nama Penghuni",
      "Metode Akses",
      "Status",
      "Akurasi",
      "Lokasi",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredData.map((log) => {
        const dateObj = new Date(log.created_at);
        const dateStr = dateObj.toLocaleDateString("id-ID");
        const timeStr = dateObj.toLocaleTimeString("id-ID");
        const name = log.resident ? log.resident.name : "Unknown Person";
        const method = formatMethod(log.method);
        const status = formatStatus(log.status);
        const accuracy = log.similarity ? `${log.similarity}%` : "-";

        return `"${dateStr} ${timeStr}","${name}","${method}","${status}","${accuracy}","Main Gate"`;
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Log_Aktivitas_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Komponen Styling Badge
  const getMethodBadgeClass = (method: string) => {
    const formatted = formatMethod(method);
    switch (formatted) {
      case "Face Recognition":
        return "bg-purple-100 text-purple-600";
      case "RFID":
        return "bg-blue-100 text-blue-600";
      case "PIN":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Tombol Export */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm"
        >
          <Download size={18} />
          Export to CSV
        </button>
      </div>

      {/* Box Utama */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all"
            />
          </div>

          <div className="relative flex-1 md:max-w-xs">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all bg-white"
            >
              <option value="All">All status</option>
              <option value="VALID">Valid</option>
              <option value="GAGAL">Gagal</option>
            </select>
          </div>

          <div className="relative flex-1 md:max-w-xs">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all text-gray-600"
            />
          </div>
        </div>

        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 font-medium">
                <th className="pb-4 font-semibold">Waktu</th>
                <th className="pb-4 font-semibold">Nama Penghuni</th>
                <th className="pb-4 font-semibold">Metode Akses</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 font-semibold">Akurasi</th>
                <th className="pb-4 font-semibold">Lokasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading && (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-[#10b981] gap-2">
                      <Loader2 className="animate-spin" size={32} />
                      <span className="text-gray-500 font-medium">
                        Memuat log aktivitas...
                      </span>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && error && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-red-500 font-medium bg-red-50"
                  >
                    Error: {error}
                  </td>
                </tr>
              )}

              {!isLoading && !error && filteredData.length > 0
                ? filteredData.map((log) => {
                    const dateObj = new Date(log.created_at);
                    const uiStatus = formatStatus(log.status);

                    return (
                      <tr
                        key={log.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="py-4">
                          <div className="font-medium text-gray-800">
                            {dateObj.toLocaleDateString("id-ID")}
                          </div>
                          <div className="text-gray-500 text-xs mt-0.5">
                            {dateObj.toLocaleTimeString("id-ID")}
                          </div>
                        </td>
                        <td className="py-4 font-medium text-gray-700">
                          {log.resident ? (
                            log.resident.name
                          ) : (
                            <span className="text-red-500 font-semibold">
                              Unknown Person
                            </span>
                          )}
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-3 py-1 text-[11px] font-semibold rounded-full ${getMethodBadgeClass(log.method)}`}
                          >
                            {formatMethod(log.method)}
                          </span>
                        </td>
                        <td className="py-4">
                          <div
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide
                          ${uiStatus === "VALID" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${uiStatus === "VALID" ? "bg-green-500" : "bg-red-500"}`}
                            ></div>
                            {uiStatus}
                          </div>
                        </td>
                        <td className="py-4">
                          {log.similarity !== null ? (
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${log.similarity > 80 ? "bg-[#10b981]" : "bg-red-500"}`}
                                  style={{ width: `${log.similarity}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600 font-medium">
                                {log.similarity}%
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400 pl-4">-</span>
                          )}
                        </td>
                        <td className="py-4 text-gray-600">Main Gate</td>
                      </tr>
                    );
                  })
                : !isLoading &&
                  !error && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-gray-500"
                      >
                        Tidak ada aktivitas yang ditemukan.
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

export default LogAktivitas;
