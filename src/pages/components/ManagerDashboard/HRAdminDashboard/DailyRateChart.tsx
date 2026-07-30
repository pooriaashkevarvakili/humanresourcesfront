// ==================== COMPONENT 4: DailyRateChart ====================
import React, { useState, useMemo } from 'react';
import { Card, Tabs } from 'antd';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

const DailyRateChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

  const getDailyRateData = (range: 'weekly' | 'monthly' | 'yearly') => {
    if (range === 'weekly') {
      const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
      return days.map((day) => ({
        label: day,
        rate: Math.round(70 + Math.random() * 25),
      }));
    } else if (range === 'monthly') {
      const weeks = ['هفته ۱', 'هفته ۲', 'هفته ۳', 'هفته ۴'];
      return weeks.map((week) => ({
        label: week,
        rate: Math.round(65 + Math.random() * 30),
      }));
    } else {
      const months = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
      ];
      return months.map((month) => ({
        label: month,
        rate: Math.round(60 + Math.random() * 35),
      }));
    }
  };

  const dailyRateData = useMemo(() => getDailyRateData(timeRange), [timeRange]);

  const dailyRateOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'area',
        height: 300,
        fontFamily: 'Vazirmatn, IRANSans, sans-serif',
        toolbar: { show: false },
        animations: { enabled: true, speed: 800 },
      },
      colors: ['#3b82f6'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.05,
          stops: [0, 100],
        },
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 3 },
      xaxis: {
        categories: dailyRateData.map((d) => d.label),
        labels: { style: { fontFamily: 'Vazirmatn, IRANSans, sans-serif' } },
      },
      yaxis: {
        labels: {
          formatter: (val: number) => `${val}%`,
          style: { fontFamily: 'Vazirmatn, IRANSans, sans-serif' },
        },
        min: 0,
        max: 100,
      },
      tooltip: {
        style: { fontFamily: 'Vazirmatn, IRANSans, sans-serif' },
        y: { formatter: (val: number) => `${val}%` },
      },
      grid: { borderColor: '#f0f0f0', strokeDashArray: 4 },
    }),
    [dailyRateData]
  );

  const dailyRateSeries = useMemo(
    () => [
      {
        name: 'نرخ حضور روزانه',
        data: dailyRateData.map((d) => d.rate),
      },
    ],
    [dailyRateData]
  );

  return (
    <Card
      title={<span className="font-bold text-gray-700">نرخ حضور روزانه کارکنان</span>}
      className="shadow-sm border-0 mb-6"
      extra={
        <Tabs
          activeKey={timeRange}
          onChange={(key) => setTimeRange(key as 'weekly' | 'monthly' | 'yearly')}
          items={[
            { key: 'weekly', label: 'هفتگی' },
            { key: 'monthly', label: 'ماهانه' },
            { key: 'yearly', label: 'سالانه' },
          ]}
          className="min-w-[200px]"
        />
      }
    >
      <Chart options={dailyRateOptions} series={dailyRateSeries} type="area" height={300} />
    </Card>
  );
};

export default DailyRateChart;