// components/QuickActions.tsx
import React from 'react';
import { Card, Row, Col } from 'antd';
import {
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
  UserAddOutlined,
  WarningOutlined,
  EyeOutlined,
} from '@ant-design/icons';

const QuickActions: React.FC = () => {
  const quickActions = [
    { icon: <TeamOutlined />, label: 'کارکنان', color: 'blue' },
    { icon: <CalendarOutlined />, label: 'درخواست‌های مرخصی', color: 'green' },
    { icon: <DollarOutlined />, label: 'حقوق و دستمزد', color: 'amber' },
    { icon: <UserAddOutlined />, label: 'استخدام جدید', color: 'purple' },
    { icon: <WarningOutlined />, label: 'گزارش‌ها', color: 'red' },
    { icon: <EyeOutlined />, label: 'مشاهده همه', color: 'cyan' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'border-blue-200 hover:border-blue-500 hover:bg-blue-50',
    green: 'border-green-200 hover:border-green-500 hover:bg-green-50',
    amber: 'border-amber-200 hover:border-amber-500 hover:bg-amber-50',
    purple: 'border-purple-200 hover:border-purple-500 hover:bg-purple-50',
    red: 'border-red-200 hover:border-red-500 hover:bg-red-50',
    cyan: 'border-cyan-200 hover:border-cyan-500 hover:bg-cyan-50',
  };

  const iconColorMap: Record<string, string> = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    amber: 'text-amber-500',
    purple: 'text-purple-500',
    red: 'text-red-500',
    cyan: 'text-cyan-500',
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Card
          title={<span className="font-bold text-gray-700">میانبرهای سریع</span>}
          className="shadow-sm border-0"
        >
          <Row gutter={[16, 16]}>
            {quickActions.map((action, index) => (
              <Col xs={12} sm={8} md={6} lg={4} key={index}>
                <div
                  className={`
                    flex flex-col items-center justify-center p-4 rounded-lg border-2 
                    transition-all duration-200 cursor-pointer
                    ${colorMap[action.color]} hover:shadow-md
                  `}
                >
                  <div className={`text-3xl mb-2 ${iconColorMap[action.color]}`}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default QuickActions;