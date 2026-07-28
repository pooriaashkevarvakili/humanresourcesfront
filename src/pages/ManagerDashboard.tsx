import React from 'react';
import { Row, Col, Typography, Space, Badge, Button, Avatar } from 'antd';
import {
  DashboardOutlined,
  BellOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import StatsCards from '../pages/components/dashboard/StatsCards';
import RevenueChart from '../pages/components/dashboard/RevenueChart';
import RecentActivities from '../pages/components/dashboard/RecentActivities';
import SubscriptionPlans from '../pages/components/dashboard/SubscriptionPlans';

import { statsMock, quickStatsMock, activitiesMock, plansMock } from '../pages/components/dashboard/mock/data';

const { Title, Text } = Typography;

const ManagerDashboard: React.FC = () => {
  return (
    <div className="manager-dashboard p-4 md:p-6 bg-gray-50 min-h-screen" dir="rtl">
      {/* Header */}
      <div className="mb-6">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} className="m-0">
              <DashboardOutlined className="ml-2 text-blue-600" />
              داشبورد مدیریت
            </Title>
            <Text type="secondary">خلاصه عملکرد، درآمد و وضعیت سیستم</Text>
          </Col>

        </Row>
      </div>

      <StatsCards stats={statsMock} quickStats={quickStatsMock} />

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={16}>
          <RevenueChart />
        </Col>
        <Col xs={24} lg={8}>
          <RecentActivities activities={activitiesMock} />
        </Col>
      </Row>

      {/* Plans */}
      <SubscriptionPlans plans={plansMock} />
    </div>
  );
};

export default ManagerDashboard;