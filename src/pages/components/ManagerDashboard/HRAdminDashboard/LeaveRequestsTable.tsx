// ==================== COMPONENT 5A: LeaveRequestsTable ====================
import React, { useState, useMemo } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Avatar,
  Space,
  Tooltip,
} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { leaveRequests } from '../mock';
import type { LeaveRequest } from '../Types/types';

const LeaveRequestsTable: React.FC = () => {
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
      render: (_: unknown, record: LeaveRequest) => (
        <span className="text-sm text-gray-600">
          {record.startDate} تا {record.endDate}
        </span>
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
        const config: Record<string, { icon: React.ReactNode; color: string; text: string }> = {
          pending: { icon: <ClockCircleOutlined />, color: 'warning', text: 'در انتظار' },
          approved: { icon: <CheckCircleOutlined />, color: 'success', text: 'تأیید شده' },
          rejected: { icon: <CloseCircleOutlined />, color: 'error', text: 'رد شده' },
        };
        const c = config[status] || config.pending;
        return (
          <Tag icon={c.icon} color={c.color}>
            {c.text}
          </Tag>
        );
      },
    },
    {
      title: 'عملیات',
      key: 'action',
      render: (_: unknown, record: LeaveRequest) => {
        if (record.status !== 'pending') return null;
        return (
          <Space size="middle">
            <Tooltip title="تأیید درخواست">
              <Button
                type="primary"
                size="small"
                icon={<CheckCircleOutlined />}
                className="bg-green-500 border-green-500 hover:bg-green-600"
              >
                تأیید
              </Button>
            </Tooltip>
            <Tooltip title="رد درخواست">
              <Button danger size="small" icon={<CloseCircleOutlined />}>
                رد
              </Button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const filteredLeaves = useMemo(() => {
    if (activeTab === 'pending') return leaveRequests.filter((l) => l.status === 'pending');
    return leaveRequests;
  }, [activeTab]);

  return (
    <Card
      title={<span className="font-bold text-gray-700">درخواست‌های مرخصی</span>}
      className="shadow-sm border-0 h-full"
      extra={
        <Space>
          <Button
            type={activeTab === 'all' ? 'primary' : 'default'}
            size="small"
            onClick={() => setActiveTab('all')}
          >
            همه
          </Button>
          <Button
            type={activeTab === 'pending' ? 'primary' : 'default'}
            size="small"
            onClick={() => setActiveTab('pending')}
          >
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
  );
};

export default LeaveRequestsTable;