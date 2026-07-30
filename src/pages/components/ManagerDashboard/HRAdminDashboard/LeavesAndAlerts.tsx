import React, { useState, useMemo } from 'react';
import {
  Card, Row, Col, Table, Tag, Button, Space, Tooltip, List, Alert, Avatar,
} from 'antd';
import {
  UserOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined,
} from '@ant-design/icons';
import type { LeaveRequest, PayrollAlert } from '../Types/types';

interface Props {
  leaveRequests: LeaveRequest[];
  payrollAlerts: PayrollAlert[];
}

const LeavesAndAlerts: React.FC<Props> = ({ leaveRequests, payrollAlerts }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending'>('all');

  const leaveColumns = [
    {
      title: 'نام کارمند',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (text: string) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} className="bg-blue-500" />
          <span className="font-medium">{text}</span>
        </Space>
      ),
    },
    {
      title: 'نوع مرخصی',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const map: Record<string, { label: string; color: string }> = {
          annual: { label: 'سالانه', color: 'blue' },
          sick: { label: 'استعلاجی', color: 'orange' },
          unpaid: { label: 'بدون حقوق', color: 'default' },
          emergency: { label: 'اضطراری', color: 'red' },
        };
        const t = map[type] || map.annual;
        return <Tag color={t.color}>{t.label}</Tag>;
      },
    },
    {
      title: 'تاریخ',
      key: 'dates',
      render: (_: any, record: LeaveRequest) => (
        <span className="text-sm text-gray-600">{record.startDate} تا {record.endDate}</span>
      ),
    },
    {
      title: 'تعداد روز',
      dataIndex: 'days',
      key: 'days',
      render: (days: number) => <span>{days} روز</span>,
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config: any = {
          pending: { icon: <ClockCircleOutlined />, color: 'warning', text: 'در انتظار' },
          approved: { icon: <CheckCircleOutlined />, color: 'success', text: 'تأیید شده' },
          rejected: { icon: <CloseCircleOutlined />, color: 'error', text: 'رد شده' },
        };
        const c = config[status] || config.pending;
        return <Tag icon={c.icon} color={c.color}>{c.text}</Tag>;
      },
    },
    {
      title: 'عملیات',
      key: 'action',
      render: (_: any, record: LeaveRequest) => {
        if (record.status !== 'pending') return null;
        return (
          <Space size="middle">
            <Tooltip title="تأیید درخواست">
              <Button type="primary" size="small" icon={<CheckCircleOutlined />} className="bg-green-500 border-green-500">
                تأیید
              </Button>
            </Tooltip>
            <Tooltip title="رد درخواست">
              <Button danger size="small" icon={<CloseCircleOutlined />}>رد</Button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const filteredLeaves = useMemo(() => {
    if (activeTab === 'pending') return leaveRequests.filter((l) => l.status === 'pending');
    return leaveRequests;
  }, [activeTab, leaveRequests]);

  const getSeverityColor = (severity: string) => {
    if (severity === 'high') return 'red';
    if (severity === 'medium') return 'orange';
    return 'blue';
  };

  const getSeverityText = (severity: string) => {
    if (severity === 'high') return 'بحرانی';
    if (severity === 'medium') return 'متوسط';
    return 'کم';
  };

  return (
    <Row gutter={[16, 16]} className="mb-6">
      <Col xs={24} lg={16}>
        <Card
          title={<span className="font-bold text-gray-700">درخواست‌های مرخصی</span>}
          className="shadow-sm border-0 h-full"
          extra={
            <Space>
              <Button type={activeTab === 'all' ? 'primary' : 'default'} size="small" onClick={() => setActiveTab('all')}>
                همه
              </Button>
              <Button type={activeTab === 'pending' ? 'primary' : 'default'} size="small" onClick={() => setActiveTab('pending')}>
                در انتظار
              </Button>
            </Space>
          }
        >
          <Table
            dataSource={filteredLeaves}
            columns={leaveColumns}
            rowKey="id"
            pagination={{ pageSize: 5, hideOnSinglePage: true }}
            size="small"
            locale={{ emptyText: 'درخواستی یافت نشد' }}
            scroll={{ y: 260 }}
          />
        </Card>
      </Col>

      <Col xs={24} lg={8}>
        <Card title={<span className="font-bold text-gray-700">هشدارهای حقوق و دستمزد</span>} className="shadow-sm border-0 h-full">
          <List
            dataSource={payrollAlerts}
            renderItem={(item: PayrollAlert) => (
              <Alert
                key={item.id}
                message={
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.title}</span>
                    <Tag color={getSeverityColor(item.severity)}>{getSeverityText(item.severity)}</Tag>
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
            )}
            locale={{ emptyText: 'هشداری وجود ندارد' }}
            style={{ maxHeight: 260, overflowY: 'auto' }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default LeavesAndAlerts;