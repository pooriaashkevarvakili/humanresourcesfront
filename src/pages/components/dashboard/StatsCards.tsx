import React from 'react';
import { Card, Row, Col, Typography, Tag } from 'antd';
import type { StatItem, QuickStat } from '../../types/dashboard';

const { Text } = Typography;

interface StatsCardsProps {
  stats: StatItem[];
  quickStats: QuickStat[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats, quickStats }) => {
  return (
    <>
      <Row gutter={[16, 16]} className="mb-6">
        {stats.map((stat, idx) => (
          <Col xs={24} sm={12} lg={8} xl={4} key={idx}>
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Text type="secondary" className="text-sm block">
                    {stat.title}
                  </Text>
                  <div className="text-xl font-bold mt-1" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-xs mt-1">
                    <span
                      style={{
                        color: stat.change.startsWith('+')
                          ? '#52c41a'
                          : stat.change.startsWith('-')
                          ? '#ff4d4f'
                          : '#52c41a',
                      }}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-base flex-shrink-0"
                  style={{ backgroundColor: stat.bgColor, color: stat.color }}
                >
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} className="mb-6">
        {quickStats.map((stat, idx) => (
          <Col xs={12} sm={6} lg={3} key={idx}>
            <Card className="shadow-sm border-0 text-center">
              <Text type="secondary" className="text-xs">
                {stat.label}
              </Text>
              <div className="text-lg font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <Tag color={stat.change.startsWith('+') ? 'green' : 'red'} className="text-xs">
                {stat.change}
              </Tag>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default StatsCards;