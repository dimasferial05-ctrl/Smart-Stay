import AccessLogFeature from "@/features/access-log";
import type { Route } from "./+types/access-logs";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Resident" },
    { name: "description", content: "Resident management" },
  ];
};

const AccessLogs = () => {
  return <AccessLogFeature />;
};

export default AccessLogs;
