export interface StatItem {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  change: string;
}

export interface QuickStat {
  label: string;
  value: string;
  change: string;
  color: string;
}

export interface ActivityItem {
  icon: React.ReactNode;
  title: string;
  time: string;
}

export interface PlanItem {
  name: string;
  users: number;
  revenue: number;
  growth: string;
  color: string;
  icon: React.ReactNode;
}

export type ChartPeriod = 'weekly' | 'monthly' | 'yearly';