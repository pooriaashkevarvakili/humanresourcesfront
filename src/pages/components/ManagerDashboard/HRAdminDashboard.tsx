import React from 'react';
import DashboardHeader from  './HRAdminDashboard/DashboardHeader';
import StatsCards from './HRAdminDashboard/StatsCards';
import TurnoverDepartmentCharts from './HRAdminDashboard/TurnoverAndDeptCharts';
import DailyAttendanceChart from './HRAdminDashboard/DailyRateChart';
import LeavesAndAlerts from './HRAdminDashboard/LeavesAndAlerts';
// import QuickActions from './components/QuickActions'; // اگر خواستی

import {
  dashboardStats,
  leaveRequests,
  payrollAlerts,
  departmentStats,
  turnoverData,
  notifications,
} from './mock';
import QuickActions from './HRAdminDashboard/QuickActions';

const HRAdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6" dir="rtl">
      <DashboardHeader notifications={notifications} />
      <StatsCards stats={dashboardStats} />
      <TurnoverDepartmentCharts departmentStats={departmentStats} turnoverData={turnoverData} />
      <DailyAttendanceChart />
      <LeavesAndAlerts leaveRequests={leaveRequests} payrollAlerts={payrollAlerts} />
      <QuickActions />
    </div>
  );
};

export default HRAdminDashboard;