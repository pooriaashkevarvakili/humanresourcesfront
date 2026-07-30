import React, { useState } from 'react';
import { Card, Button, Space, Typography } from 'antd';
import { LineChartOutlined, DownloadOutlined } from '@ant-design/icons';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import type { ChartPeriod } from '../Types/types';
import { message } from 'antd';

const { Text } = Typography;

const RevenueChart: React.FC = () => {
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('monthly');

  const getChartData = () => {
    switch (chartPeriod) {
      case 'weekly':
        return {
          series: [
            { name: 'پلن پایه', data: [1200, 1350, 1480, 1600, 1750, 1900] },
            { name: 'پلن حرفه‌ای', data: [800, 950, 1100, 1250, 1400, 1550] },
            { name: 'پلن سازمانی', data: [400, 500, 620, 750, 880, 1020] },
          ],
          categories: ['هفته ۱', 'هفته ۲', 'هفته ۳', 'هفته ۴', 'هفته ۵', 'هفته ۶'],
        };
      case 'monthly':
        return {
          series: [
            { name: 'پلن پایه', data: [3200, 3800, 4200, 4800, 5100, 5600] },
            { name: 'پلن حرفه‌ای', data: [1800, 2200, 2800, 3200, 3900, 4500] },
            { name: 'پلن سازمانی', data: [1200, 1600, 2100, 2700, 3400, 4200] },
          ],
          categories: ['مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        };
      case 'yearly':
        return {
          series: [
            { name: 'پلن پایه', data: [12000, 15000, 18000, 21000, 25000, 30000] },
            { name: 'پلن حرفه‌ای', data: [8000, 10000, 13000, 16000, 20000, 24000] },
            { name: 'پلن سازمانی', data: [5000, 7000, 9500, 12000, 15500, 19000] },
          ],
          categories: ['۱۴۰۰', '۱۴۰۱', '۱۴۰۲', '۱۴۰۳', '۱۴۰۴', '۱۴۰۵'],
        };
      default:
        return { series: [], categories: [] };
    }
  };

  const currentData = getChartData();

  const revenueOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: 320,
      toolbar: { show: false },
      zoom: { enabled: false },
      stacked: false,
    },
    colors: ['#1890ff', '#52c41a', '#faad14'],
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
      },
    },
    xaxis: {
      categories: currentData.categories,
      labels: { style: { fontSize: '11px' } },
    },
    yaxis: {
      title: {
        text: `درآمد (${chartPeriod === 'yearly' ? 'هزار $' : '$'})`,
        style: { fontSize: '12px' },
      },
      labels: {
        formatter: (val: number) =>
          chartPeriod === 'yearly' ? `${val / 1000}k` : `$${val}`,
      },
    },
    legend: {
      position: 'bottom',
      fontSize: '12px',
      fontFamily: 'IRANSans, sans-serif',
    },
    grid: { borderColor: '#f0f0f0' },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) =>
          chartPeriod === 'yearly' ? `$${val.toLocaleString()}` : `$${val}`,
      },
    },
  };

  const handleDownload = () => {
    message.info('دانلود گزارش در حال انجام...');
  };

  return (
    <Card
      title={
        <Space>
          <LineChartOutlined />
          <span>روند رشد درآمد</span>
        </Space>
      }
      className="shadow-sm border-0"
      extra={
        <Space>
          <Button.Group size="small">
            <Button
              type={chartPeriod === 'weekly' ? 'primary' : 'default'}
              onClick={() => setChartPeriod('weekly')}
            >
              هفتگی
            </Button>
            <Button
              type={chartPeriod === 'monthly' ? 'primary' : 'default'}
              onClick={() => setChartPeriod('monthly')}
            >
              ماهانه
            </Button>
            <Button
              type={chartPeriod === 'yearly' ? 'primary' : 'default'}
              onClick={() => setChartPeriod('yearly')}
            >
              سالانه
            </Button>
          </Button.Group>
          <Button
            type="text"
            icon={<DownloadOutlined />}
            size="small"
            onClick={handleDownload}
          />
        </Space>
      }
    >
      <div className="mb-2">
        <Text type="secondary" className="text-xs">
          مقایسه درآمد ۶{' '}
          {chartPeriod === 'weekly'
            ? 'هفته'
            : chartPeriod === 'monthly'
            ? 'ماه'
            : 'سال'}{' '}
          اخیر بر اساس پلن‌های اشتراکی
        </Text>
      </div>
      <Chart
        options={revenueOptions}
        series={currentData.series}
        type="area"
        height={320}
      />
    </Card>
  );
};

export default RevenueChart;