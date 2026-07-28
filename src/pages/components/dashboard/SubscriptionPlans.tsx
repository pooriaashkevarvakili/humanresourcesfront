import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Space,
  Tag,
  Progress,
  Modal,
  Typography,
  message,
} from 'antd';
import {
  RocketOutlined,
  SearchOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import type { PlanItem } from '../../types/dashboard';

const { Text } = Typography;

interface SubscriptionPlansProps {
  plans: PlanItem[];
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ plans }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const filteredPlans = plans.filter((plan) =>
    plan.name.includes(searchTerm.trim())
  );

  const handleSearchClick = () => {
    if (searchTerm.trim() === '') {
      message.warning('لطفاً عبارت جستجو را وارد کنید.');
      return;
    }
    message.success(`جستجو برای "${searchTerm}" انجام شد.`);
  };

  const handleFilterOk = () => {
    message.success('فیلتر اعمال شد');
    setIsFilterModalOpen(false);
  };

  return (
    <>
      <Card
        title={
          <Space>
            <RocketOutlined />
            <span>پلن‌های اشتراکی</span>
          </Space>
        }
        className="shadow-sm border-0"
        extra={
          <Space direction="horizontal" size="small">
            <Input
              placeholder="جستجوی نام پلن..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 150 }}
              onPressEnter={handleSearchClick}
            />
            <Button
              type="primary"
              size="small"
              icon={<SearchOutlined />}
              onClick={handleSearchClick}
            >
              جستجو
            </Button>
            <Button
              type="text"
              size="small"
              icon={<FilterOutlined />}
              onClick={() => setIsFilterModalOpen(true)}
            >
              فیلتر
            </Button>
          </Space>
        }
      >
        <Row gutter={[16, 16]}>
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan, idx) => (
              <Col xs={24} md={8} key={idx}>
                <Card
                  className="shadow-sm border-0 hover:shadow-md transition-shadow"
                  style={{ borderRight: `4px solid ${plan.color}` }}
                >
                  <div className="flex items-center justify-between">
                    <Space>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${plan.color}15`,
                          color: plan.color,
                        }}
                      >
                        {plan.icon}
                      </div>
                      <div>
                        <Text strong>{plan.name}</Text>
                        <div className="text-xs text-gray-400">
                          {plan.users.toLocaleString()} کاربر
                        </div>
                      </div>
                    </Space>
                    <Tag color={plan.growth.startsWith('+') ? 'green' : 'red'}>
                      {plan.growth}
                    </Tag>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm">
                      <Text type="secondary">درآمد ماهانه</Text>
                      <Text strong>${plan.revenue.toLocaleString()}</Text>
                    </div>
                    <Progress
                      percent={Math.round((plan.revenue / 5600) * 100)}
                      strokeColor={plan.color}
                      size="small"
                      showInfo={false}
                      className="mt-1"
                    />
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <div className="text-center py-8">
                <Text type="secondary">
                  هیچ پلنی با عبارت "{searchTerm}" یافت نشد.
                </Text>
              </div>
            </Col>
          )}
        </Row>
      </Card>

      <Modal
        title="فیلتر پلن‌های اشتراکی"
        open={isFilterModalOpen}
        onOk={handleFilterOk}
        onCancel={() => setIsFilterModalOpen(false)}
        okText="اعمال فیلتر"
        cancelText="انصراف"
      >
        <p>گزینه‌های فیلتر در اینجا قرار می‌گیرند.</p>
        <p>مثلاً انتخاب بازه درآمد، تعداد کاربران، و ...</p>
      </Modal>
    </>
  );
};

export default SubscriptionPlans;