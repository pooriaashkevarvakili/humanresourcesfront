import React, { useState, useMemo } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Badge,
  Button,
  Avatar,
  List,
  Alert,
  Space,
  Tooltip,
  Tabs,
} from 'antd';
import {
  TeamOutlined,
  UserAddOutlined,
  FileTextOutlined,
  WarningOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  BellOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import {
  dashboardStats,
  leaveRequests,
  payrollAlerts,
  departmentStats,
  turnoverData, // داده‌های ثابت ۶ ماهه
  notifications,
} from './mock';
import type { LeaveRequest, PayrollAlert } from './Types/types';

const HRAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending'>('all');
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [turnoverRange, setTurnoverRange] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  // ---------- تابع تولید داده برای نرخ خروج بر اساس بازه ----------
  const getTurnoverData = (range: 'weekly' | 'monthly' | 'yearly') => {
    if (range === 'weekly') {
      const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
      return days.map((day) => ({
        label: day,
        rate: Math.round(1 + Math.random() * 4),
      }));
    } else if (range === 'monthly') {
      // استفاده از داده‌های ثابت mock برای ماهانه (۶ ماه)
      return turnoverData.map((d) => ({
        label: d.month,
        rate: d.rate,
      }));
    } else {
      // سالانه – ۱۲ ماه
      const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
      return months.map((month) => ({
        label: month,
        rate: Math.round(1 + Math.random() * 5),
      }));
    }
  };

  const turnoverChartData = useMemo(() => getTurnoverData(turnoverRange), [turnoverRange]);

  // محاسبه میانگین برای برچسب
  const averageRate = useMemo(() => {
    const sum = turnoverChartData.reduce((acc, cur) => acc + cur.rate, 0);
    return (sum / turnoverChartData.length).toFixed(1);
  }, [turnoverChartData]);

  // ---------- گزینه‌های نمودار نرخ خروج ----------
  const turnoverOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'area',
        height: 320,
        fontFamily: 'Vazirmatn, IRANSans, sans-serif',
        toolbar: { show: false },
        animations: { enabled: true, speed: 800 },
      },
      colors: ['#ef4444'],
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
        categories: turnoverChartData.map((d) => d.label),
        labels: { style: { fontFamily: 'Vazirmatn, IRANSans, sans-serif' } },
      },
      yaxis: {
        labels: {
          formatter: (val: number) => `${val}%`,
          style: { fontFamily: 'Vazirmatn, IRANSans, sans-serif' },
        },
        min: 0,
        max: 8,
      },
      tooltip: {
        style: { fontFamily: 'Vazirmatn, IRANSans, sans-serif' },
        y: { formatter: (val: number) => `${val}%` },
      },
      grid: { borderColor: '#f0f0f0', strokeDashArray: 4 },
    }),
    [turnoverChartData]
  );

  const turnoverSeries = useMemo(
    () => [
      {
        name: 'نرخ خروج',
        data: turnoverChartData.map((d) => d.rate),
      },
    ],
    [turnoverChartData]
  );

  // ---------- نمودار دپارتمان (دونات) ----------
  const deptOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'donut',
        height: 320,
        fontFamily: 'Vazirmatn, IRANSans, sans-serif',
      },
      labels: departmentStats.map((d) => d.department),
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'کل کارکنان',
                formatter: () => '248',
              },
            },
          },
        },
      },
      dataLabels: { enabled: true, style: { fontFamily: 'Vazirmatn, IRANSans, sans-serif' } },
      legend: {
        position: 'bottom',
        fontFamily: 'Vazirmatn, IRANSans, sans-serif',
      },
      tooltip: {
        style: { fontFamily: 'Vazirmatn, IRANSans, sans-serif' },
      },
    }),
    []
  );

  const deptSeries = useMemo(
    () => departmentStats.map((d) => d.count),
    []
  );

  // ---------- نرخ حضور روزانه (با تب) ----------
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
      const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
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

  // ---------- ستون‌های جدول مرخصی ----------
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
              <Button type="primary" size="small" icon={<CheckCircleOutlined />} className="bg-green-500 border-green-500 hover:bg-green-600">
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6" dir="rtl">
      {/* هدر */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">داشبورد مدیر منابع انسانی</h1>
          <p className="text-gray-500 mt-1">نمای کلی سیستم HR</p>
        </div>
        <Space>
          <Badge count={notifications.filter((n) => !n.read).length}>
            <Button shape="circle" icon={<BellOutlined />} size="large" />
          </Badge>
          <Avatar size="large" icon={<UserOutlined />} className="bg-blue-600" />
        </Space>
      </div>

      {/* کارت‌های آمار */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
            <Statistic
              title={<span className="text-gray-500">کل کارکنان</span>}
              value={dashboardStats.totalEmployees}
              prefix={<TeamOutlined className="text-blue-500 mr-2" />}
              valueStyle={{ color: '#1f2937', fontWeight: 700, fontSize: 28 }}
            />
            <div className="mt-2 text-sm text-green-600 flex items-center">
              <ArrowUpOutlined className="mr-1" />
              <span>+۵.۲٪ نسبت به ماه قبل</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
            <Statistic
              title={<span className="text-gray-500">استخدام‌های جدید (ماه جاری)</span>}
              value={dashboardStats.newHires}
              prefix={<UserAddOutlined className="text-green-500 mr-2" />}
              valueStyle={{ color: '#1f2937', fontWeight: 700, fontSize: 28 }}
            />
            <div className="mt-2 text-sm text-green-600 flex items-center">
              <ArrowUpOutlined className="mr-1" />
              <span>+۳ نفر نسبت به ماه قبل</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
            <Statistic
              title={<span className="text-gray-500">درخواست‌های مرخصی در انتظار</span>}
              value={dashboardStats.pendingLeaves}
              prefix={<FileTextOutlined className="text-amber-500 mr-2" />}
              valueStyle={{ color: '#1f2937', fontWeight: 700, fontSize: 28 }}
            />
            <div className="mt-2 text-sm text-amber-600 flex items-center">
              <ClockCircleOutlined className="mr-1" />
              <span>نیاز به بررسی فوری</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
            <Statistic
              title={<span className="text-gray-500">هشدارهای حقوق</span>}
              value={dashboardStats.payrollAlerts}
              prefix={<WarningOutlined className="text-red-500 mr-2" />}
              valueStyle={{ color: '#1f2937', fontWeight: 700, fontSize: 28 }}
            />
            <div className="mt-2 text-sm text-red-600 flex items-center">
              <ArrowDownOutlined className="mr-1" />
              <span>۱ هشدار بحرانی</span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* ردیف نمودارها – نرخ خروج (با تب) + دپارتمان (ارتفاع یکسان) */}
      <Row gutter={[16, 16]} className="mb-6" align="stretch">
        <Col xs={24} lg={16}>
          <Card
            title={<span className="font-bold text-gray-700">نرخ خروج کارکنان (۶ ماه اخیر)</span>}
            className="shadow-sm border-0 h-full"
            extra={
              <Space>
                <Tabs
                  activeKey={turnoverRange}
                  onChange={(key) => setTurnoverRange(key as 'weekly' | 'monthly' | 'yearly')}
                  items={[
                    { key: 'weekly', label: 'هفتگی' },
                    { key: 'monthly', label: 'ماهانه' },
                    { key: 'yearly', label: 'سالانه' },
                  ]}
                  className="min-w-[200px]"
                />
                <Tag color="red" className="font-medium">
                  میانگین: {averageRate}٪
                </Tag>
              </Space>
            }
          >
            <Chart options={turnoverOptions} series={turnoverSeries} type="area" height={320} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title={<span className="font-bold text-gray-700">تعداد کارکنان هر دپارتمان</span>}
            className="shadow-sm border-0 h-full"
          >
            <Chart options={deptOptions} series={deptSeries} type="donut" height={320} />
          </Card>
        </Col>
      </Row>

      {/* کارت نرخ حضور روزانه (با تب) – این کارت اضافه شده و چیزی حذف نشده */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24}>
          <Card
            title={<span className="font-bold text-gray-700">نرخ حضور روزانه کارکنان</span>}
            className="shadow-sm border-0"
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
        </Col>
      </Row>

      {/* درخواست‌های مرخصی و هشدارها */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={16}>
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
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title={<span className="font-bold text-gray-700">هشدارهای حقوق و دستمزد</span>}
            className="shadow-sm border-0 h-full"
          >
            <List
              dataSource={payrollAlerts}
              renderItem={(item: PayrollAlert) => (
                <Alert
                  key={item.id}
                  message={
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
              )}
              locale={{ emptyText: 'هشداری وجود ندارد' }}
              style={{ maxHeight: 260, overflowY: 'auto' }}
            />
          </Card>
        </Col>
      </Row>

      {/* میانبرهای سریع */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
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
        </Col>
      </Row>
    </div>
  );
};

export default HRAdminDashboard;