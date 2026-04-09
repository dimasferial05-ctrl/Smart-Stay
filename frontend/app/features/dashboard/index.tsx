import { type FC } from "react";
import { useLoaderData } from "react-router";
import { ActivityTable } from "./components/ActivityTable";
import { SummaryCards } from "./components/SummaryCards";
import type { DashboardData } from "./types";

export const DashboardFeature: FC = () => {
  const data = useLoaderData() as DashboardData;

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      <SummaryCards data={data} />
      <ActivityTable accessLogs={data.access_logs} />
    </div>
  );
};
