import React from 'react';
import {
  UserOutlined,
  UserAddOutlined,
  ClockCircleOutlined,
  AlertOutlined,
  DollarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  RiseOutlined,
  FallOutlined,
  FileTextOutlined,
  CheckOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import type {
  Employee,
  LeaveRequest,
  PayrollAlert,
  DepartmentStat,
  TurnoverData,
  AttendanceRecord,
  Payslip,
  TeamMember,
  TeamGoal,
  PerformanceReview,
  Notification,
  DashboardStats,
  StatItem,
  QuickStat,
  ActivityItem,
  PlanItem,
} from './Types/types';

// ---------- Original data (kept unchanged) ----------
export const dashboardStats: DashboardStats = {
  totalEmployees: 248,
  newHires: 12,
  pendingLeaves: 8,
  payrollAlerts: 3,
};

export const employees: Employee[] = [
  { id: '1', name: 'علی احمدی', department: 'فنی', position: 'توسعه‌دهنده ارشد', email: 'ali@company.ir', joinDate: '2023-01-15', status: 'active' },
  { id: '2', name: 'مریم رضایی', department: 'منابع انسانی', position: 'کارشناس HR', email: 'maryam@company.ir', joinDate: '2022-06-20', status: 'active' },
  { id: '3', name: 'حسن محمدی', department: 'فروش', position: 'مدیر فروش', email: 'hasan@company.ir', joinDate: '2021-03-10', status: 'on_leave' },
  { id: '4', name: 'سارا کریمی', department: 'مالی', position: 'حسابدار', email: 'sara@company.ir', joinDate: '2023-09-01', status: 'active' },
  { id: '5', name: 'رضا نوری', department: 'فنی', position: 'توسعه‌دهنده', email: 'reza@company.ir', joinDate: '2024-01-10', status: 'active' },
  { id: '6', name: 'نرگس صادقی', department: 'بازاریابی', position: 'کارشناس محتوا', email: 'narges@company.ir', joinDate: '2023-05-15', status: 'active' },
  { id: '7', name: 'محمد کاظمی', department: 'فنی', position: 'طراح UI/UX', email: 'mohammad@company.ir', joinDate: '2022-11-01', status: 'active' },
  { id: '8', name: 'فاطمه موسوی', department: 'منابع انسانی', position: 'کارشناس آموزش', email: 'fateme@company.ir', joinDate: '2024-02-01', status: 'active' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: '1', employeeId: '3', employeeName: 'حسن محمدی', type: 'annual', startDate: '2026-08-01', endDate: '2026-08-10', days: 10, status: 'pending', reason: 'سفر خانوادگی', requestedAt: '2026-07-25' },
  { id: '2', employeeId: '5', employeeName: 'رضا نوری', type: 'sick', startDate: '2026-07-28', endDate: '2026-07-30', days: 3, status: 'pending', reason: 'بیماری', requestedAt: '2026-07-27' },
  { id: '3', employeeId: '7', employeeName: 'محمد کاظمی', type: 'annual', startDate: '2026-08-15', endDate: '2026-08-20', days: 6, status: 'pending', reason: 'استراحت', requestedAt: '2026-07-26' },
  { id: '4', employeeId: '2', employeeName: 'مریم رضایی', type: 'emergency', startDate: '2026-07-29', endDate: '2026-07-29', days: 1, status: 'pending', reason: 'امور شخصی', requestedAt: '2026-07-28' },
  { id: '5', employeeId: '8', employeeName: 'فاطمه موسوی', type: 'annual', startDate: '2026-08-05', endDate: '2026-08-08', days: 4, status: 'approved', reason: 'سفر', requestedAt: '2026-07-20' },
  { id: '6', employeeId: '1', employeeName: 'علی احمدی', type: 'sick', startDate: '2026-07-15', endDate: '2026-07-17', days: 3, status: 'approved', reason: 'سرماخوردگی', requestedAt: '2026-07-14' },
];

export const payrollAlerts: PayrollAlert[] = [
  { id: '1', title: 'اختلال در محاسبه اضافه‌کاری', description: 'محاسبه اضافه‌کاری بخش فنی نیاز به بررسی دارد', severity: 'high', date: '2026-07-28' },
  { id: '2', title: 'تأخیر در پرداخت حقوق', description: 'حقوق بخش فروش با ۲ روز تأخیر واریز شده است', severity: 'medium', date: '2026-07-27' },
  { id: '3', title: 'بروزرسانی جدول مالیات', description: 'جدول مالیات سال ۱۴۰۵ باید بروزرسانی شود', severity: 'low', date: '2026-07-25' },
];

export const departmentStats: DepartmentStat[] = [
  { department: 'فنی', count: 85 },
  { department: 'فروش', count: 52 },
  { department: 'منابع انسانی', count: 18 },
  { department: 'مالی', count: 24 },
  { department: 'بازاریابی', count: 31 },
  { department: 'پشتیبانی', count: 38 },
];

export const turnoverData: TurnoverData[] = [
  { month: 'فروردین', rate: 2.1 },
  { month: 'اردیبهشت', rate: 1.8 },
  { month: 'خرداد', rate: 3.2 },
  { month: 'تیر', rate: 2.5 },
  { month: 'مرداد', rate: 1.9 },
  { month: 'شهریور', rate: 2.8 },
];

export const attendanceRecords: AttendanceRecord[] = [
  { date: '2026-07-20', checkIn: '08:15', checkOut: '17:30', status: 'present' },
  { date: '2026-07-21', checkIn: '08:45', checkOut: '17:15', status: 'present' },
  { date: '2026-07-22', checkIn: '09:30', checkOut: '17:00', status: 'late' },
  { date: '2026-07-23', checkIn: '08:00', checkOut: '17:45', status: 'present' },
  { date: '2026-07-24', checkIn: '08:20', checkOut: '17:30', status: 'present' },
  { date: '2026-07-27', checkIn: '08:10', checkOut: '17:20', status: 'present' },
  { date: '2026-07-28', checkIn: '08:30', checkOut: '17:15', status: 'present' },
];

export const payslips: Payslip[] = [
  { id: '1', month: 'تیر', year: 1405, grossSalary: 85000000, deductions: 12500000, netSalary: 72500000, paidAt: '2026-07-05' },
  { id: '2', month: 'خرداد', year: 1405, grossSalary: 85000000, deductions: 12500000, netSalary: 72500000, paidAt: '2026-06-05' },
  { id: '3', month: 'اردیبهشت', year: 1405, grossSalary: 82000000, deductions: 11800000, netSalary: 70200000, paidAt: '2026-05-05' },
];

export const teamMembers: TeamMember[] = [
  { id: '1', name: 'علی احمدی', status: 'present', todayCheckIn: '08:15', performanceScore: 92 },
  { id: '5', name: 'رضا نوری', status: 'on_leave', performanceScore: 85 },
  { id: '7', name: 'محمد کاظمی', status: 'present', todayCheckIn: '08:45', performanceScore: 88 },
  { id: '10', name: 'سمانه رحیمی', status: 'wfh', todayCheckIn: '09:00', performanceScore: 90 },
  { id: '11', name: 'پویا حسینی', status: 'absent', performanceScore: 78 },
];

export const teamGoals: TeamGoal[] = [
  { id: '1', title: 'تکمیل ماژول گزارش‌گیری', progress: 75, deadline: '2026-08-15', status: 'on_track' },
  { id: '2', title: 'بازطراحی صفحه اصلی', progress: 45, deadline: '2026-08-30', status: 'at_risk' },
  { id: '3', title: 'بهینه‌سازی پایگاه داده', progress: 90, deadline: '2026-07-30', status: 'on_track' },
];

export const performanceReviews: PerformanceReview[] = [
  { id: '1', employeeName: 'علی احمدی', period: 'تابستان ۱۴۰۵', score: 92, status: 'completed', dueDate: '2026-07-20' },
  { id: '2', employeeName: 'رضا نوری', period: 'تابستان ۱۴۰۵', score: 0, status: 'pending', dueDate: '2026-08-05' },
  { id: '3', employeeName: 'محمد کاظمی', period: 'تابستان ۱۴۰۵', score: 0, status: 'pending', dueDate: '2026-08-05' },
];

export const notifications: Notification[] = [
  { id: '1', title: 'درخواست مرخصی جدید', message: 'حسن محمدی درخواست مرخصی ۱۰ روزه داده است', type: 'info', time: '۱۰ دقیقه پیش', read: false },
  { id: '2', title: 'گزارش عملکرد تکمیل شد', message: 'گزارش عملکرد علی احمدی تکمیل و آماده بررسی است', type: 'success', time: '۱ ساعت پیش', read: false },
  { id: '3', title: 'هشدار حقوق', message: 'اختلال در محاسبه اضافه‌کاری بخش فنی', type: 'warning', time: '۳ ساعت پیش', read: true },
  { id: '4', title: 'استخدام جدید', message: 'فاطمه موسوی به تیم HR اضافه شد', type: 'success', time: 'دیروز', read: true },
];

export const leaveBalance = {
  annual: { total: 26, used: 12, remaining: 14 },
  sick: { total: 10, used: 3, remaining: 7 },
  unpaid: { total: 30, used: 0, remaining: 30 },
};

// ---------- NEW: Mock data for ManagerDashboard (arrays) ----------

// StatItem[]
export const statsMock: StatItem[] = [
  {
    title: 'کل کارمندان',
    value: dashboardStats.totalEmployees,
    icon: <UserOutlined />,
    color: '#1890ff',
    change: '+5%',
  },
  {
    title: 'استخدام‌های جدید',
    value: dashboardStats.newHires,
    icon: <UserAddOutlined />,
    color: '#52c41a',
    change: '+2',
  },
  {
    title: 'درخواست‌های مرخصی',
    value: dashboardStats.pendingLeaves,
    icon: <ClockCircleOutlined />,
    color: '#faad14',
    change: '-1',
  },
  {
    title: 'هشدارهای حقوق',
    value: dashboardStats.payrollAlerts,
    icon: <AlertOutlined />,
    color: '#ff4d4f',
    change: 'نیاز به بررسی',
  },
  {
    title: 'درآمد کل',
    value: '۱,۲۵۰,۰۰۰,۰۰۰',
    icon: <DollarOutlined />,
    color: '#722ed1',
    change: '+۱۲٪',
  },
  {
    title: 'اشتراک‌های فعال',
    value: 124,
    icon: <TeamOutlined />,
    color: '#13c2c2',
    change: '+۸',
  },
];

// QuickStat[]
export const quickStatsMock: QuickStat[] = [
  {
    label: 'حضور امروز',
    value: '۱۸۶',
    change: '+۱۲',
    color: '#52c41a',
  },
  {
    label: 'مرخصی امروز',
    value: '۱۲',
    change: '-۲',
    color: '#faad14',
  },
  {
    label: 'غیبت',
    value: '۸',
    change: '۰',
    color: '#ff4d4f',
  },
  {
    label: 'دورکاری',
    value: '۴۲',
    change: '+۵',
    color: '#1890ff',
  },
  {
    label: 'در انتظار تأیید',
    value: '۵',
    change: '+۱',
    color: '#722ed1',
  },
];

// ActivityItem[]
export const activitiesMock: ActivityItem[] = [
  {
    icon: <UserAddOutlined style={{ color: '#1890ff' }} />,
    title: 'علی احمدی درخواست مرخصی ثبت کرد',
    time: '۲۰ دقیقه پیش',
  },
  {
    icon: <CheckOutlined style={{ color: '#52c41a' }} />,
    title: 'مریم رضایی درخواست استخدام را تأیید کرد',
    time: '۱ ساعت پیش',
  },
  {
    icon: <FileTextOutlined style={{ color: '#722ed1' }} />,
    title: 'حسن محمدی گزارش عملکرد ارسال کرد',
    time: '۳ ساعت پیش',
  },
  {
    icon: <DollarOutlined style={{ color: '#13c2c2' }} />,
    title: 'واریز حقوق تیر انجام شد',
    time: '۵ ساعت پیش',
  },
  {
    icon: <WarningOutlined style={{ color: '#faad14' }} />,
    title: 'رضا نوری وضعیت خود را به مرخصی تغییر داد',
    time: 'دیروز',
  },
];

// PlanItem[]
export const plansMock: PlanItem[] = [
  {
    name: 'رایگان',
    users: 10,
    revenue: 0,
    growth: '۰٪',
    color: '#d9d9d9',
    icon: <TeamOutlined />,
  },
  {
    name: 'حرفه‌ای',
    users: 50,
    revenue: 350000,
    growth: '+۱۵٪',
    color: '#1890ff',
    icon: <RiseOutlined />,
  },
  {
    name: 'سازمانی',
    users: 200,
    revenue: 850000,
    growth: '+۲۵٪',
    color: '#722ed1',
    icon: <TeamOutlined />,
  },
];