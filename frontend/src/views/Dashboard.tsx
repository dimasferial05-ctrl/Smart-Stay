import {
  CheckCircle2,
  Clock,
  Loader2,
  Unlock,
  UserCheck,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

// --- Tipe Data Sesuai Backend ---
interface DashboardData {
  total_residents: number;
  total_access_today: number;
  total_valid_access: number;
  total_invalid_access: number;
  recent_activities: any[];
  last_access: string | null;
}

const Dashboard = () => {
  // State untuk menyimpan data dari API
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch API Dashboard
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/dashboard");
        if (!response.ok) throw new Error("Gagal memuat data dashboard");
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Fungsi Format Tampilan
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Belum ada data";
    const date = new Date(dateString);
    return `${date.toLocaleDateString("id-ID")} ${date.toLocaleTimeString("id-ID")}`;
  };

  // Jika sedang loading, tampilkan spinner
  if (isLoading) {
    return (
      <div className="p-6 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center text-blue-500 gap-3">
          <Loader2 className="animate-spin" size={40} />
          <span className="font-semibold text-gray-600">
            Memuat Dashboard...
          </span>
        </div>
      </div>
    );
  }

  // Jika ada error jaringan/server
  if (error) {
    return (
      <div className="p-6 bg-slate-50 min-h-screen">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg border border-red-100 font-medium text-center">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      {/* --- 1. Top Section: Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex">
          <div className="w-2 bg-blue-500"></div>
          <div className="p-5 flex-1 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Jumlah Penghuni
              </p>
              <h3 className="text-3xl font-bold text-gray-800">
                {data?.total_residents || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
              <UserCheck size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex">
          <div className="w-2 bg-amber-500"></div>
          <div className="p-5 flex-1 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Akses hari ini
              </p>
              <h3 className="text-3xl font-bold text-gray-800">
                {data?.total_access_today || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
              <Clock size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex">
          <div className="w-2 bg-green-500"></div>
          <div className="p-5 flex-1 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Akses Valid
              </p>
              <h3 className="text-3xl font-bold text-gray-800">
                {data?.total_valid_access || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex">
          <div className="w-2 bg-red-600"></div>
          <div className="p-5 flex-1 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Akses tidak valid
              </p>
              <h3 className="text-3xl font-bold text-gray-800">
                {data?.total_invalid_access || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <XCircle size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. Middle Section: Aktivitas Terkini --- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">
          Aktivitas Terkini
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 font-medium">
                <th className="pb-4 font-semibold">Waktu</th>
                <th className="pb-4 font-semibold">Nama Penghuni</th>
                <th className="pb-4 font-semibold">Metode Akses</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 font-semibold">Akurasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data?.recent_activities && data.recent_activities.length > 0 ? (
                data.recent_activities.map((activity) => {
                  const uiStatus = formatStatus(activity.status);
                  const dateObj = new Date(activity.created_at);

                  return (
                    <tr
                      key={activity.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 text-gray-500">
                        {dateObj.toLocaleTimeString("id-ID")}
                      </td>
                      <td className="py-4 font-medium text-gray-800">
                        {activity.resident ? (
                          activity.resident.name
                        ) : (
                          <span className="text-red-500 font-semibold">
                            Unknown Person
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-gray-600">
                        {formatMethod(activity.method)}
                      </td>
                      <td className="py-4">
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide
                          ${uiStatus === "VALID" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                        >
                          {uiStatus}
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">
                        {activity.similarity ? `${activity.similarity}%` : "-"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    Belum ada aktivitas hari ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 3. Bottom Section: Akses Cepat --- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Akses Cepat</h2>

        <button className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-3.5 rounded-lg font-semibold flex justify-center items-center gap-2 transition-colors shadow-sm mb-6">
          <Unlock size={20} />
          Quick Unlock Gate
        </button>

        <div className="space-y-3">
          <div className="bg-slate-50 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between border border-slate-100">
            <span className="text-sm text-gray-500 mb-1 sm:mb-0">
              Gate Status
            </span>
            <span className="font-semibold text-gray-800">
              Locked & Secured
            </span>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between border border-slate-100">
            <span className="text-sm text-gray-500 mb-1 sm:mb-0">
              AI System
            </span>
            <span className="font-semibold text-[#10b981]">
              Online & Active
            </span>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between border border-slate-100">
            <span className="text-sm text-gray-500 mb-1 sm:mb-0">
              Last Access
            </span>
            <span className="font-semibold text-gray-800">
              {formatDate(data?.last_access || null)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
