import { ResidentFeature } from "@/features/resident";
import { getResidents } from "@/features/resident/api";
import type { Route } from "./+types/residents";

export async function loader({}: Route.LoaderArgs) {
  return await getResidents();
}

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Data Penghuni | Bumi Rafka Kost" },
    { name: "description", content: "Manajemen data penghuni kost" },
  ];
};

export default function ResidentsRoute() {
  return <ResidentFeature />;
}
