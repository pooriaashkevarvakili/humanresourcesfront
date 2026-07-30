import React, { useState, useMemo } from 'react';
import { Card, Row, Col, Tabs, Tag, Space } from 'antd';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import type { DepartmentStat, TurnoverData,  } from '../Types/types';

interface Props {
  departmentStats: DepartmentStat[];
  turnoverData: TurnoverData[];   // ← اینجا تغییر کرد
}

const TurnoverDepartmentCharts: React.FC<Props> = ({ departmentStats, turnoverData }) => {
  const [turnoverRange, setTurnoverRange] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  const getTurnoverData = (range: 'weekly' | 'monthly' | 'yearly') => {
    if (range === 'weekly') {
      const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
      return days.map((day) => ({
        label: day,
        rate: Math.round(1 + Math.random() * 4),
      }));
    } else if (range === 'monthly') {
      return turnoverData.map((d) => ({ label: d.month, rate: d.rate }));
    } else {
      const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
      return months.map((month) => ({
        label: month,
        rate: Math.round(1 + Math.random() * 5),
      }));
    }
  };

  const turnoverChartData = useMemo(() => getTurnoverData(turnoverRange), [turnoverRange, turnoverData]);

  const averageRate = useMemo(() => {
    const sum = turnoverChartData.reduce((acc, cur) => acc + cur.rate, 0);
    return (sum / turnoverChartData.length).toFixed(1);
  }, [turnoverChartData]);

  const turnoverOptions: ApexOptions = useMemo(
    () => ({
      chart: { type: 'area', height: 320, fontFamily: 'Vazirmatn, IRANSans, sans-serif', toolbar: { show: false } },
      colors: ['#ef4444'],
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 3 },
      xaxis: { categories: turnoverChartData.map((d) => d.label) },
      yaxis: { labels: { formatter: (val: number) => `${val}%` }, min: 0, max: 8 },
      tooltip: { y: { formatter: (val: number) => `${val}%` } },
      grid: { borderColor: '#f0f0f0', strokeDashArray: 4 },
    }),
    [turnoverChartData]
  );

  const turnoverSeries = useMemo(
    () => [{ name: 'نرخ خروج', data: turnoverChartData.map((d) => d.rate) }],
    [turnoverChartData]
  );

  const deptOptions: ApexOptions = useMemo(
    () => ({
      chart: { type: 'donut', height: 320, fontFamily: 'Vazirmatn, IRANSans, sans-serif' },
      labels: departmentStats.map((d) => d.department),
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: { show: true, total: { show: true, label: 'کل کارکنان', formatter: () => '248' } },
          },
        },
      },
      legend: { position: 'bottom' },
    }),
    [departmentStats]
  );

  const deptSeries = useMemo(() => departmentStats.map((d) => d.count), [departmentStats]);

  return (
    <Row gutter={[16, 16]} className="mb-6" align="stretch">
      <Col xs={24} lg={16}>
        <Card
          title={<span className="font-bold text-gray-700">نرخ خروج کارکنان</span>}
          className="shadow-sm border-0 h-full"
          extra={
            <Space>
              <Tabs
                activeKey={turnoverRange}
                onChange={(key) => setTurnoverRange(key as any)}
                items={[
                  { key: 'weekly', label: 'هفتگی' },
                  { key: 'monthly', label: 'ماهانه' },
                  { key: 'yearly', label: 'سالانه' },
                ]}
                className="min-w-[200px]"
              />
              <Tag color="red">میانگین: {averageRate}٪</Tag>
            </Space>
          }
        >
          <Chart options={turnoverOptions} series={turnoverSeries} type="area" height={320} />
        </Card>
      </Col>

      <Col xs={24} lg={8}>
        <Card title={<span className="font-bold text-gray-700">تعداد کارکنان هر دپارتمان</span>} className="shadow-sm border-0 h-full">
          <Chart options={deptOptions} series={deptSeries} type="donut" height={320} />
        </Card>
      </Col>
    </Row>
  );
};

export default TurnoverDepartmentCharts;