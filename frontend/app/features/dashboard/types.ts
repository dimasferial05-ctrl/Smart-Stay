import type { AccessLog } from "@/types";
import { type LucideIcon } from "lucide-react";

export interface DashboardData {
  total_residents: number;
  total_access_today: number;
  total_valid_access: number;
  total_invalid_access: number;
  access_logs: AccessLog[];
}

export interface SummaryCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  colorClass: string;
  bgColorClass: string;
  borderColorClass: string;
}
