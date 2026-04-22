import type { DashboardData } from "./types";

const BASE_API_URL = import.meta.env.VITE_API_URL;

export async function getDashboardData(): Promise<DashboardData> {
  const response = await fetch(`${BASE_API_URL}/dashboard/stats`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data dari server");
  }
  return response.json();
}
