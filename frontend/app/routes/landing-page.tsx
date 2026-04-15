import LandingPage from "@/features/landing-page";
import type { Route } from "./+types/access-logs";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Log Aktivitas | Bumi Rafka Kost" },
    { name: "description", content: "Lihat log aktivitas akses penghuni kost" },
  ];
};

export default function LandingPageRoute() {
  return <LandingPage />;
}
