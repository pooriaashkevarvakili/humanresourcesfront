import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  TeamOutlined,
  UserAddOutlined,
  FileTextOutlined,
  WarningOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { DashboardStats } from '../Types/types';

interface Props {
  stats: DashboardStats;
}

const StatsCards: React.FC<Props> = ({ stats }) => {
  return (
    <Row gutter={[16, 16]} className="mb-6">
      <Col xs={24} sm={12} lg={6}>
        <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
          <Statistic
            title={<span className="text-gray-500">کل کارکنان</span>}
            value={stats.totalEmployees}
            prefix={<TeamOutlined className="text-blue-500 mr-2" />}
            valueStyle={{ color: '#1f2937', fontWeight: 700, fontSize: 28 }}
          />
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <ArrowUpOutlined className="mr-1" />
            <span>+۵.۲٪ نسبت به ماه قبل</span>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
          <Statistic
            title={<span className="text-gray-500">استخدام‌های جدید (ماه جاری)</span>}
            value={stats.newHires}
            prefix={<UserAddOutlined className="text-green-500 mr-2" />}
            valueStyle={{ color: '#1f2937', fontWeight: 700, fontSize: 28 }}
          />
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <ArrowUpOutlined className="mr-1" />
            <span>+۳ نفر نسبت به ماه قبل</span>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
          <Statistic
            title={<span className="text-gray-500">درخواست‌های مرخصی در انتظار</span>}
            value={stats.pendingLeaves}
            prefix={<FileTextOutlined className="text-amber-500 mr-2" />}
            valueStyle={{ color: '#1f2937', fontWeight: 700, fontSize: 28 }}
          />
          <div className="mt-2 text-sm text-amber-600 flex items-center">
            <ClockCircleOutlined className="mr-1" />
            <span>نیاز به بررسی فوری</span>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
          <Statistic
            title={<span className="text-gray-500">هشدارهای حقوق</span>}
            value={stats.payrollAlerts}
            prefix={<WarningOutlined className="text-red-500 mr-2" />}
            valueStyle={{ color: '#1f2937', fontWeight: 700, fontSize: 28 }}
          />
          <div className="mt-2 text-sm text-red-600 flex items-center">
            <ArrowDownOutlined className="mr-1" />
            <span>۱ هشدار بحرانی</span>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default StatsCards;