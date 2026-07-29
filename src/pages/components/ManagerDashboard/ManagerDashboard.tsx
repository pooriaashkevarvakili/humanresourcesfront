import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Avatar,
  Badge,
  Button,
  Table,
  Tag,
  Progress,
  List,
  Space,
  Tooltip,
  Statistic,
  Modal,
  Descriptions,
  Spin,
  ConfigProvider,
  message,
  Input,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  UserOutlined,
  MessageOutlined,
  EyeOutlined,
  StarOutlined,
  CalendarOutlined,
  AimOutlined,
  RiseOutlined,
  CommentOutlined,
  HomeOutlined,
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import {
  teamMembers,
  leaveRequests,
  teamGoals,
  performanceReviews,
  notifications,
} from './mock';
import type { TeamMember, TeamGoal, PerformanceReview } from './Types/types';
import faIR from 'antd/lib/locale/fa_IR';

const ManagerDashboard: React.FC = () => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [memberDetailVisible, setMemberDetailVisible] = useState(false);
  const [pendingLeaveList, setPendingLeaveList] = useState(
    leaveRequests.filter(l => l.status === 'pending')
  );
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLeaveAction = useCallback(
    (id: string, action: 'approve' | 'reject') => {
      setPendingLeaveList(prev => prev.filter(item => item.id !== id));
      message.success(action === 'approve' ? '✅ درخواست تأیید شد' : '❌ درخواست رد شد');
    },
    []
  );

  const showMemberDetail = (memberId: string) => {
    setSelectedMemberId(memberId);
    setMemberDetailVisible(true);
  };

  const closeMemberDetail = () => {
    setMemberDetailVisible(false);
    setSelectedMemberId(null);
  };

  const selectedMember = teamMembers.find(m => m.id === selectedMemberId);

  const filteredMembers = useMemo(() => {
    let result = teamMembers;
    if (searchText) {
      result = result.filter(m => m.name.includes(searchText));
    }
    if (filterStatus) {
      result = result.filter(m => m.status === filterStatus);
    }
    return result;
  }, [searchText, filterStatus]);

  const handleStatusFilter = (status: string) => {
    setFilterStatus(prev => (prev === status ? null : status));
    setTimeout(() => {
      document.getElementById('team-table')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const statusConfig: Record<
    string,
    { color: string; icon: React.ReactNode; text: string; bg: string }
  > = {
    present: { color: '#10b981', icon: <CheckCircleOutlined />, text: 'حاضر', bg: 'bg-emerald-50' },
    absent: { color: '#ef4444', icon: <CloseCircleOutlined />, text: 'غایب', bg: 'bg-red-50' },
    on_leave: { color: '#f59e0b', icon: <CalendarOutlined />, text: 'مرخصی', bg: 'bg-amber-50' },
    wfh: { color: '#3b82f6', icon: <HomeOutlined />, text: 'دورکاری', bg: 'bg-blue-50' },
  };

  const perfOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'bar',
        height: 280,
        fontFamily: 'Vazirmatn, IRANSans, sans-serif',
        toolbar: { show: false },
        animations: { enabled: true, speed: 800 },
        rtl: true,
      },
      colors: ['#3b82f6'],
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '55%',
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: teamMembers.map(m => m.name),
        labels: {
          style: { fontFamily: 'Vazirmatn, IRANSans' },
        },
      },
      yaxis: {
        max: 100,
        labels: {
          formatter: (val: number) => `${val}`,
          style: { fontFamily: 'Vazirmatn, IRANSans' },
        },
      },
      tooltip: {
        style: { fontFamily: 'Vazirmatn, IRANSans' },
        y: { formatter: (val: number) => `${val} امتیاز` },
        rtl: true,
      },
      grid: { borderColor: '#f0f0f0', strokeDashArray: 4 },
    }),
    []
  );

  const perfSeries = useMemo(
    () => [
      {
        name: 'امتیاز عملکرد',
        data: teamMembers.map(m => m.performanceScore),
      },
    ],
    []
  );

  const memberColumns = [
    {
      title: 'نام',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: TeamMember) => (
        <Space>
          <Avatar
            size="small"
            icon={<UserOutlined />}
            className={record.status === 'absent' ? 'bg-gray-400' : 'bg-blue-500'}
          />
          <span className="font-medium">{text}</span>
        </Space>
      ),
    },
    {
      title: 'وضعیت امروز',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const cfg = statusConfig[status] || statusConfig.present;
        return (
          <Tag
            icon={cfg.icon}
            color={cfg.color}
            className="font-medium"
            style={{ borderRadius: 12 }}
          >
            {cfg.text}
          </Tag>
        );
      },
    },
    {
      title: 'ساعت ورود',
      dataIndex: 'todayCheckIn',
      key: 'todayCheckIn',
      render: (time?: string) => (
        <span className="text-gray-600">{time || '—'}</span>
      ),
    },
    {
      title: 'امتیاز عملکرد',
      dataIndex: 'performanceScore',
      key: 'performanceScore',
      render: (score: number) => (
        <div className="flex items-center gap-2">
          <Progress
            percent={score}
            size="small"
            strokeColor={score >= 90 ? '#10b981' : score >= 75 ? '#3b82f6' : '#f59e0b'}
            showInfo={false}
            className="w-20"
          />
          <span className="text-sm font-medium">{score}</span>
        </div>
      ),
    },
    {
      title: 'عملیات',
      key: 'action',
      render: (_: any, record: TeamMember) => (
        <Space size="small">
          <Tooltip title="مشاهده جزئیات">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => showMemberDetail(record.id)}
              aria-label={`مشاهده جزئیات ${record.name}`}
            />
          </Tooltip>
          <Tooltip title="ارسال پیام">
            <Button
              type="text"
              size="small"
              icon={<MessageOutlined />}
              aria-label={`ارسال پیام به ${record.name}`}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const getGoalStatus = (status: string) => {
    switch (status) {
      case 'on_track':
        return { color: 'success', text: 'در مسیر' };
      case 'at_risk':
        return { color: 'warning', text: 'در خطر' };
      case 'overdue':
        return { color: 'error', text: 'تأخیر' };
      default:
        return { color: 'default', text: status };
    }
  };

  const presentCount = teamMembers.filter(m => m.status === 'present').length;
  const wfhCount = teamMembers.filter(m => m.status === 'wfh').length;
  const onLeaveCount = teamMembers.filter(m => m.status === 'on_leave').length;
  const absentCount = teamMembers.filter(m => m.status === 'absent').length;

  const renderStatCard = (
    status: string,
    count: number,
    icon: React.ReactNode,
    label: string,
    color: string,
    bgColor: string
  ) => {
    const isActive = filterStatus === status;
    const change = Math.floor(Math.random() * 10) - 3;
    const isPositive = change >= 0;
    return (
      <Col xs={12} sm={6}>
        <Card
          className={`shadow-sm border-0 transition-all duration-200 cursor-pointer hover:shadow-md ${
            isActive ? 'ring-2 ring-offset-2 ring-' + color : ''
          }`}
          onClick={() => handleStatusFilter(status)}
          style={{ borderRight: `4px solid ${color}` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">{label}</span>
              <Statistic value={count} valueStyle={{ fontSize: 24, fontWeight: 700, color }} />
              <div className="flex items-center gap-1 mt-1">
                {isPositive ? (
                  <ArrowUpOutlined className="text-emerald-500 text-xs" />
                ) : (
                  <ArrowDownOutlined className="text-red-500 text-xs" />
                )}
                <span className={`text-xs ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {Math.abs(change)}% نسبت به دیروز
                </span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center`}>
              {icon}
            </div>
          </div>
        </Card>
      </Col>
    );
  };

  const actionCards = [
    {
      key: 'approve',
      title: 'تأیید درخواست‌ها',
      icon: <CheckCircleOutlined />,
      color: '#10b981',
      count: pendingLeaveList.length,
      description: `${pendingLeaveList.length} درخواست در انتظار`,
      onClick: () => {
        document.getElementById('pending-requests')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      key: 'review',
      title: 'بررسی عملکرد',
      icon: <EyeOutlined />,
      color: '#3b82f6',
      count: 3,
      description: '۳ بررسی جدید',
      onClick: () => message.info('در حال باز کردن صفحه بررسی عملکرد...'),
    },
    {
      key: 'message',
      title: 'ارتباط با تیم',
      icon: <CommentOutlined />,
      color: '#8b5cf6',
      count: 5,
      description: '۵ پیام خوانده‌نشده',
      onClick: () => message.info('در حال باز کردن پیام‌ها...'),
    },
    {
      key: 'goals',
      title: 'تعیین اهداف',
      icon: <RiseOutlined />,
      color: '#f59e0b',
      count: 2,
      description: '۲ هدف در دست اقدام',
      onClick: () => message.info('در حال باز کردن صفحه اهداف...'),
    },
  ];

  return (
    <ConfigProvider locale={faIR} direction="rtl">
      <div className="min-h-screen bg-gray-50 p-4 md:p-6" dir="rtl">
        {/* هدر */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">داشبورد مدیر تیم</h1>
            <p className="text-gray-500 mt-1">مدیریت تیم فنی — {teamMembers.length} عضو</p>
          </div>
          <Space size="middle">
            <Badge count={pendingLeaveList.length} offset={[-5, 5]}>
              <Button
                shape="circle"
                icon={<ClockCircleOutlined />}
                size="large"
                aria-label="درخواست‌های در انتظار"
                onClick={() =>
                  document.getElementById('pending-requests')?.scrollIntoView({ behavior: 'smooth' })
                }
              />
            </Badge>
            <Avatar size="large" icon={<UserOutlined />} className="bg-indigo-600" />
          </Space>
        </div>

        {/* کارت‌های آمار */}
        <Row gutter={[16, 16]} className="mb-6">
          {renderStatCard(
            'present',
            presentCount,
            <CheckCircleOutlined className="text-emerald-600 text-xl" />,
            'حاضر',
            '#10b981',
            'bg-emerald-100'
          )}
          {renderStatCard(
            'wfh',
            wfhCount,
            <HomeOutlined className="text-blue-600 text-xl" />,
            'دورکاری',
            '#3b82f6',
            'bg-blue-100'
          )}
          {renderStatCard(
            'on_leave',
            onLeaveCount,
            <CalendarOutlined className="text-amber-600 text-xl" />,
            'مرخصی',
            '#f59e0b',
            'bg-amber-100'
          )}
          {renderStatCard(
            'absent',
            absentCount,
            <CloseCircleOutlined className="text-red-600 text-xl" />,
            'غایب',
            '#ef4444',
            'bg-red-100'
          )}
        </Row>

        <Spin spinning={loading} tip="در حال بارگذاری...">
          {/* جدول اعضا و درخواست‌ها - با ارتفاع خودکار و هم‌تراز */}
          <Row gutter={[16, 16]} className="mb-6" align="stretch">
            <Col xs={24} lg={12}>
              <div id="team-table" style={{ height: '100%' }}>
                <Card
                  title={
                    <div className="flex items-center gap-2">
                      <TeamOutlined className="text-indigo-500" />
                      <span className="font-bold text-gray-700">وضعیت حضور اعضای تیم</span>
                      {filterStatus && (
                        <Tag
                          closable
                          onClose={() => setFilterStatus(null)}
                          color="blue"
                          className="mr-2"
                        >
                          فیلتر: {statusConfig[filterStatus]?.text}
                        </Tag>
                      )}
                    </div>
                  }
                  extra={
                    <Input
                      placeholder="جستجوی عضو..."
                      prefix={<SearchOutlined className="text-gray-400" />}
                      value={searchText}
                      onChange={e => setSearchText(e.target.value)}
                      style={{ width: 200 }}
                      allowClear
                    />
                  }
                  className="shadow-sm border-0"
                  style={{ height: '100%', minHeight: '350px', display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <Table
                      dataSource={filteredMembers}
                      columns={memberColumns}
                      rowKey="id"
                      pagination={false}
                      size="middle"
                      scroll={{ y: 'calc(100% - 50px)' }}
                      locale={{ emptyText: 'هیچ عضوی یافت نشد' }}
                      rowClassName={() => 'hover:bg-gray-50 transition-colors cursor-pointer'}
                      onRow={record => ({
                        onClick: () => showMemberDetail(record.id),
                      })}
                    />
                  </div>
                </Card>
              </div>
            </Col>

            <Col xs={24} lg={12} id="pending-requests" style={{ height: '100%' }}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <ClockCircleOutlined className="text-amber-500" />
                    <span className="font-bold text-gray-700">درخواست‌های در انتظار تأیید</span>
                    <Badge count={pendingLeaveList.length} className="mr-2" />
                  </div>
                }
                extra={
                  pendingLeaveList.length > 0 && (
                    <Button type="link" size="small">
                      مشاهده همه
                    </Button>
                  )
                }
                className="shadow-sm border-0"
                style={{ height: '100%', minHeight: '350px', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ flex: 1, overflow: 'auto' }}>
                  {pendingLeaveList.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <CheckCircleOutlined className="text-4xl mb-2" />
                      <p>همه درخواست‌ها بررسی شدند!</p>
                    </div>
                  ) : (
                    <List
                      dataSource={pendingLeaveList}
                      renderItem={item => (
                        <List.Item className="border-b border-gray-100 last:border-0 py-3">
                          <div className="w-full">
                            <div className="flex items-center justify-between mb-2">
                              <Space>
                                <Avatar size="small" icon={<UserOutlined />} className="bg-indigo-500" />
                                <span className="font-medium">{item.employeeName}</span>
                              </Space>
                              <Tag color="warning">در انتظار</Tag>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              <CalendarOutlined className="ml-1" />
                              {item.startDate} تا {item.endDate} ({item.days} روز)
                            </div>
                            <div className="text-xs text-gray-500 mb-3">{item.reason}</div>
                            <Space className="w-full">
                              <Button
                                type="primary"
                                size="small"
                                icon={<CheckCircleOutlined />}
                                className="flex-1 bg-emerald-500 hover:bg-emerald-600 border-0"
                                onClick={() => handleLeaveAction(item.id, 'approve')}
                                aria-label="تأیید درخواست"
                              >
                                تأیید
                              </Button>
                              <Button
                                danger
                                size="small"
                                icon={<CloseCircleOutlined />}
                                className="flex-1"
                                onClick={() => handleLeaveAction(item.id, 'reject')}
                                aria-label="رد درخواست"
                              >
                                رد
                              </Button>
                              <Button size="small" icon={<CommentOutlined />} aria-label="نظر دادن">
                                نظر
                              </Button>
                            </Space>
                          </div>
                        </List.Item>
                      )}
                    />
                  )}
                </div>
              </Card>
            </Col>
          </Row>

          {/* نمودار و اهداف */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} lg={12}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <StarOutlined className="text-yellow-500" />
                    <span className="font-bold text-gray-700">عملکرد دوره‌ای اعضا</span>
                  </div>
                }
                className="shadow-sm border-0"
              >
                <Chart options={perfOptions} series={perfSeries} type="bar" height={280} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <AimOutlined className="text-purple-500" />
                    <span className="font-bold text-gray-700">اهداف تیم</span>
                  </div>
                }
                className="shadow-sm border-0"
              >
                <List
                  dataSource={teamGoals}
                  renderItem={(goal: TeamGoal) => {
                    const st = getGoalStatus(goal.status);
                    return (
                      <List.Item className="border-b border-gray-100 last:border-0 py-4">
                        <div className="w-full">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">{goal.title}</span>
                            <Tag color={st.color}>{st.text}</Tag>
                          </div>
                          <Progress
                            percent={goal.progress}
                            status={goal.status === 'overdue' ? 'exception' : 'active'}
                            strokeColor={
                              goal.status === 'on_track'
                                ? '#10b981'
                                : goal.status === 'at_risk'
                                ? '#f59e0b'
                                : '#ef4444'
                            }
                            className="mb-1"
                          />
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>مهلت: {goal.deadline}</span>
                            <span>{goal.progress}% تکمیل شده</span>
                          </div>
                        </div>
                      </List.Item>
                    );
                  }}
                />
              </Card>
            </Col>
          </Row>

          {/* کارهای روزانه */}
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Card
                title={<span className="font-bold text-gray-700">کارهای روزانه</span>}
                className="shadow-sm border-0"
              >
                <Row gutter={[16, 16]}>
                  {actionCards.map(card => (
                    <Col xs={12} sm={8} md={6} key={card.key}>
                      <Card
                        hoverable
                        className="border-0 shadow-sm hover:shadow-lg transition-all duration-200 text-center"
                        onClick={card.onClick}
                        style={{ borderTop: `4px solid ${card.color}` }}
                      >
                        <div className="flex flex-col items-center">
                          <Badge count={card.count} offset={[10, -10]} overflowCount={99}>
                            <div
                              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl"
                              style={{ color: card.color }}
                            >
                              {card.icon}
                            </div>
                          </Badge>
                          <span className="font-medium mt-2 text-gray-800">{card.title}</span>
                          <span className="text-xs text-gray-500">{card.description}</span>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
        </Spin>

        {/* مودال جزئیات عضو */}
        <Modal
          title="اطلاعات کامل عضو"
          visible={memberDetailVisible}
          onCancel={closeMemberDetail}
          footer={[
            <Button key="close" onClick={closeMemberDetail}>
              بستن
            </Button>,
            <Button key="message" type="primary" icon={<MessageOutlined />}>
              ارسال پیام
            </Button>,
          ]}
          width={600}
        >
          {selectedMember && (
            <Descriptions column={1} bordered>
              <Descriptions.Item label="نام">{selectedMember.name}</Descriptions.Item>
              <Descriptions.Item label="نقش">{(selectedMember as any).role || '—'}</Descriptions.Item>
              <Descriptions.Item label="وضعیت امروز">
                <Tag
                  icon={statusConfig[selectedMember.status]?.icon}
                  color={statusConfig[selectedMember.status]?.color}
                >
                  {statusConfig[selectedMember.status]?.text}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="ساعت ورود">
                {selectedMember.todayCheckIn || 'ثبت نشده'}
              </Descriptions.Item>
              <Descriptions.Item label="امتیاز عملکرد">
                <Progress
                  percent={selectedMember.performanceScore}
                  strokeColor={
                    selectedMember.performanceScore >= 90 ? '#10b981' : '#3b82f6'
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item label="ایمیل">{(selectedMember as any).email || '—'}</Descriptions.Item>
              <Descriptions.Item label="تلفن">{(selectedMember as any).phone || '—'}</Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default ManagerDashboard;