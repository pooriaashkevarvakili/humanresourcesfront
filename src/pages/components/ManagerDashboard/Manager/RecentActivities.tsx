import React from 'react';
import { Card, List, Button, Divider, Space, message } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import type { ActivityItem } from '../Types/types';

interface RecentActivitiesProps {
  activities: ActivityItem[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  const handleViewAll = () => {
    message.info('نمایش همه فعالیت‌ها');
  };

  return (
    <Card
      title={
        <Space>
          <ClockCircleOutlined />
          <span>آخرین فعالیت‌ها</span>
        </Space>
      }
      className="shadow-sm border-0 h-full"
      extra={
        <Button type="link" size="small" onClick={handleViewAll}>
          مشاهده همه
        </Button>
      }
    >
      <List
        dataSource={activities}
        renderItem={(item) => (
          <List.Item className="hover:bg-gray-50 rounded-lg px-2 transition-colors">
            <List.Item.Meta
              avatar={
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                  {item.icon}
                </div>
              }
              title={<span className="text-sm">{item.title}</span>}
              description={
                <span className="text-xs text-gray-400">{item.time}</span>
              }
            />
          </List.Item>
        )}
      />
      <Divider className="my-2" />
      <div className="text-center">
        <Button type="link" size="small" onClick={handleViewAll}>
          مشاهده همه فعالیت‌ها
        </Button>
      </div>
    </Card>
  );
};

export default RecentActivities;