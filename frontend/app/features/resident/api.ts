import { type Resident } from "@/types";

const BASE_API_URL: string = import.meta.env.VITE_API_URL;

export async function getResidents(): Promise<Resident[]> {
  const response = await fetch(`${BASE_API_URL}/residents`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data penghuni dari server");
  }

  return response.json();
}
