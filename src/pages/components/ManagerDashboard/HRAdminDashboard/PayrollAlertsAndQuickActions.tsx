// ==================== COMPONENT 5B: PayrollAlertsAndQuickActions ====================
import React from 'react';
import {
  Card,
  Row,
  Col,
  Tag,
  Alert,
} from 'antd';
import {
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
  UserAddOutlined,
  WarningOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { payrollAlerts } from '../mock';
import type { PayrollAlert } from '../Types/types';

const PayrollAlertsAndQuickActions: React.FC = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'blue';
      default: return 'default';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return 'بحرانی';
      case 'medium': return 'متوسط';
      case 'low': return 'کم';
      default: return severity;
    }
  };

  const quickActions = [
    { icon: <TeamOutlined />, label: 'کارکنان', color: 'blue' },
    { icon: <CalendarOutlined />, label: 'درخواست‌های مرخصی', color: 'green' },
    { icon: <DollarOutlined />, label: 'حقوق و دستمزد', color: 'amber' },
    { icon: <UserAddOutlined />, label: 'استخدام جدید', color: 'purple' },
    { icon: <WarningOutlined />, label: 'گزارش‌ها', color: 'red' },
    { icon: <EyeOutlined />, label: 'مشاهده همه', color: 'cyan' },
  ];

  return (
    <>
      {/* هشدارهای حقوق */}
      <Card
        title={<span className="font-bold text-gray-700">هشدارهای حقوق و دستمزد</span>}
        className="shadow-sm border-0 h-full mb-6"
      >
        <div style={{ maxHeight: 260, overflowY: 'auto' }}>
          {payrollAlerts.length > 0 ? (
            payrollAlerts.map((item: PayrollAlert) => (
              <Alert
                key={item.id}
                title={
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.title}</span>
                    <Tag color={getSeverityColor(item.severity)}>
                      {getSeverityText(item.severity)}
                    </Tag>
                  </div>
                }
                description={
                  <div className="mt-1">
                    <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                }
                type={item.severity === 'high' ? 'error' : item.severity === 'medium' ? 'warning' : 'info'}
                showIcon={false}
                className="w-full border-0 bg-gray-50 mb-2"
              />
            ))
          ) : (
            <div className="text-center text-gray-400 py-4">هشداری وجود ندارد</div>
          )}
        </div>
      </Card>

      {/* میانبرهای سریع */}
      <Card title={<span className="font-bold text-gray-700">میانبرهای سریع</span>} className="shadow-sm border-0">
        <Row gutter={[16, 16]}>
          {quickActions.map((action, index) => {
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
              <Col xs={12} sm={8} md={6} lg={4} key={index}>
                <div
                  className={`
                    flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                    ${colorMap[action.color]} hover:shadow-md
                  `}
                >
                  <div className={`text-3xl mb-2 ${iconColorMap[action.color]}`}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </div>
              </Col>
            );
          })}
        </Row>
      </Card>
    </>
  );
};

export default PayrollAlertsAndQuickActions;