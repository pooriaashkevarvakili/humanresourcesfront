// Types/types.ts

import type { ReactNode } from 'react';

/* ========================
   Core Domain Models
======================== */

export interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  email: string;
  avatar?: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on_leave';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'annual' | 'sick' | 'unpaid' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  requestedAt: string;
}

export interface LeaveRequestPending {
  id: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
}

export interface PayrollAlert {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  date: string;
}

export interface DepartmentStat {
  department: string;
  count: number;
}

export interface TurnoverData {
  month: string;
  rate: number;
}

export interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half_day';
}

export interface Payslip {
  id: string;
  month: string;
  year: number;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  paidAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  status: 'present' | 'absent' | 'on_leave' | 'wfh';
  todayCheckIn?: string;
  performanceScore: number;
}

export interface TeamGoal {
  id: string;
  title: string;
  progress: number;
  deadline: string;
  status: 'on_track' | 'at_risk' | 'overdue';
}

export interface PerformanceReview {
  id: string;
  employeeName: string;
  period: string;
  score: number;
  status: 'pending' | 'completed';
  dueDate: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

export interface DashboardStats {
  totalEmployees: number;
  newHires: number;
  pendingLeaves: number;
  payrollAlerts: number;
}

/* ========================
   Component Props
======================== */

export interface AttendanceStatsProps {
  presentCount: number;
  wfhCount: number;
  onLeaveCount: number;
  absentCount: number;
  filterStatus: string | null;
  onStatusFilter: (status: string) => void;
}

export interface TeamMembersTableProps {
  filteredMembers: TeamMember[];
  searchText: string;
  setSearchText: (text: string) => void;
  filterStatus: string | null;
  setFilterStatus: (status: string | null) => void;
  showMemberDetail: (memberId: string) => void;
  statusConfig: Record<
    string,
    {
      color: string;
      icon: ReactNode;
      text: string;
      bg: string;
    }
  >;
}
/* ========================
   Stats Cards (Manager Dashboard)
======================== */
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

export interface StatItem {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: string;
  change?: string | number;
}

export type ChartPeriod = 'weekly' | 'monthly' | 'yearly';

export interface QuickStat {
  label: string;
  value: string;
  change: string;
  color: string;
}