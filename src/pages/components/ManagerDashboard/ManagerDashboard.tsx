import React from 'react';
import { Row, Col, Typography, Space, Badge, Button, Avatar } from 'antd';
import {
  DashboardOutlined,
  BellOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import StatsCards from './Manager/StatsCards';
import RevenueChart from './Manager/RevenueChart';
import RecentActivities from './Manager/RecentActivities';
import SubscriptionPlans from './Manager/SubscriptionPlans';
import { statsMock, quickStatsMock, activitiesMock, plansMock } from './mock';
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
          <Col>
            <Space>
              <Badge count={5}>
                <Button type="text" icon={<BellOutlined />} />
              </Badge>
              <Button type="text" icon={<SettingOutlined />} />
              <Avatar style={{ backgroundColor: '#1890ff' }}>مدیر</Avatar>
            </Space>
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
      <SubscriptionPlans plans={plansMock} />
    </div>
  );
};

export default ManagerDashboard;