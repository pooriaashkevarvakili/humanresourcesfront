import React from 'react';
import { Badge, Button, Avatar, Space } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import type { Notification } from '../Types/types';   // ← تغییر اینجا

interface Props {
  notifications: Notification[];                     // ← تغییر اینجا
}

const DashboardHeader: React.FC<Props> = ({ notifications }) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">داشبورد مدیر منابع انسانی</h1>
        <p className="text-gray-500 mt-1">نمای کلی سیستم HR</p>
      </div>
      <Space>
        <Badge count={unreadCount}>
          <Button shape="circle" icon={<BellOutlined />} size="large" />
        </Badge>
        <Avatar size="large" icon={<UserOutlined />} className="bg-blue-600" />
      </Space>
    </div>
  );
};

export default DashboardHeader;