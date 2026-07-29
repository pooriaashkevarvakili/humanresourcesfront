import React, { useState } from 'react';
import { Layout, Tabs } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import HRAdminDashboard from './components/ManagerDashboard/HRAdminDashboard';
import ManagerDashboard from './components/ManagerDashboard/ManagerDashboard';
import EmployeeDashboard from './components/ManagerDashboard/EmployeeDashboard';

const { Content } = Layout;

type Role = 'hr-admin' | 'manager' | 'employee';

const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<Role>('hr-admin');

  const tabItems = [
    {
      key: 'hr-admin',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <DashboardOutlined />
          <span>HR Admin</span>
        </span>
      ),
      children: <HRAdminDashboard />,
    },
    {
      key: 'manager',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TeamOutlined />
          <span>مدیر تیم</span>
        </span>
      ),
      children: <ManagerDashboard />,
    },
    {
      key: 'employee',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <UserOutlined />
          <span>کارمند</span>
        </span>
      ),
      children: <EmployeeDashboard />,
    },
  ];

  return (
    <Layout style={{ margin: 0, padding: 0, minHeight: '100vh', background: '#f9fafb' }}>
      <Content style={{ margin: 0, padding: 0, background: '#f9fafb' }}>
        <Tabs
          activeKey={activeRole}
          onChange={(key) => setActiveRole(key as Role)}
          items={tabItems}
          tabPosition="top"
          size="large"
          centered
          animated={{ inkBar: true, tabPane: true }}
          style={{
            backgroundColor: '#ffffff',
            padding: 0,
            borderRadius: 8,
            margin: 0,
          }}
        />
      </Content>
    </Layout>
  );
};

export default App;