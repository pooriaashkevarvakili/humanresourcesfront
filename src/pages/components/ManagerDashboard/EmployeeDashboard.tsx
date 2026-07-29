import React, { useMemo, useState, useRef } from 'react';
import {
  Card,
  Row,
  Col,
  Avatar,
  Button,
  Badge,
  List,
  Tag,
  Progress,
  Space,
  Empty,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Divider,
  Typography,
} from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BellOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  ProfileOutlined,
  DownloadOutlined,
  RightOutlined,
  WalletOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SaveOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import {
  attendanceRecords,
  payslips,
  notifications,
  leaveBalance,
} from './mock';
import type { AttendanceRecord, Payslip, Notification } from './Types/types';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const EmployeeDashboard: React.FC = () => {
  // ========== State برای مودال‌ها ==========
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] = useState(false);
  const [isLeaveRequestModalOpen, setIsLeaveRequestModalOpen] = useState(false);
  const [isViewPayslipModalOpen, setIsViewPayslipModalOpen] = useState(false);
  const [selectedPayslipMonth, setSelectedPayslipMonth] = useState<string>(payslips[0]?.month || '');

  // ========== فرم‌ها ==========
  const [editProfileForm] = Form.useForm();
  const [updateProfileForm] = Form.useForm();
  const [leaveRequestForm] = Form.useForm();

  // ========== Refs برای دانلود PDF ==========
  // نوع RefObject<HTMLDivElement | null> به‌درستی تعریف شده است
  const payslipRef = useRef<HTMLDivElement>(null);
  const modalPayslipRef = useRef<HTMLDivElement>(null);

  // ========== تابع دانلود PDF ==========
  // پذیرش RefObject با قابلیت null
  const downloadPDF = (elementRef: React.RefObject<HTMLDivElement | null>, filename: string = 'payslip.pdf') => {
    if (!elementRef.current) {
      message.error('محتوایی برای دانلود وجود ندارد');
      return;
    }
    const element = elementRef.current;
    
    // استفاده از html2pdf که از CDN بارگذاری شده است
    // @ts-ignore
    window.html2pdf()
      .set({
        margin: 10,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save()
      .then(() => {
        message.success('دانلود با موفقیت انجام شد');
      })
      .catch((error: any) => {
        console.error('Error generating PDF:', error);
        message.error('خطا در دانلود PDF');
      });
  };

  // ========== Chart ==========
  const attendanceOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'bar',
        height: 220,
        fontFamily: 'Vazirmatn, IRANSans, sans-serif',
        toolbar: { show: false },
        animations: { enabled: true, speed: 600 },
      },
      colors: ['#3b82f6'],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '60%',
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: attendanceRecords.map((r) => r.date.slice(5)),
        labels: { style: { fontFamily: 'Vazirmatn, IRANSans', fontSize: '11px' } },
      },
      yaxis: {
        max: 12,
        labels: {
          formatter: (val: number) => `${val}h`,
          style: { fontFamily: 'Vazirmatn, IRANSans' },
        },
      },
      tooltip: {
        style: { fontFamily: 'Vazirmatn, IRANSans' },
        y: { formatter: (val: number) => `${val} ساعت` },
      },
      grid: { borderColor: '#f0f0f0', strokeDashArray: 4 },
    }),
    []
  );

  const attendanceSeries = useMemo(
    () => [
      {
        name: 'ساعت کاری',
        data: attendanceRecords.map((r) => {
          const [inH, inM] = r.checkIn.split(':').map(Number);
          const [outH, outM] = r.checkOut.split(':').map(Number);
          return Number(((outH - inH) + (outM - inM) / 60).toFixed(1));
        }),
      },
    ],
    []
  );

  // ========== Helpers ==========
  const getAttendanceStatus = (status: string) => {
    const config: Record<string, { color: string; text: string; icon: React.ReactNode }> = {
      present: { color: 'success', text: 'حاضر', icon: <CheckCircleOutlined /> },
      absent: { color: 'error', text: 'غایب', icon: <CloseCircleOutlined /> },
      late: { color: 'warning', text: 'با تأخیر', icon: <ClockCircleOutlined /> },
      half_day: { color: 'default', text: 'نیم‌روز', icon: <ClockCircleOutlined /> },
    };
    return config[status] || config.present;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircleOutlined className="text-emerald-500" />;
      case 'warning': return <ClockCircleOutlined className="text-amber-500" />;
      case 'error': return <CloseCircleOutlined className="text-red-500" />;
      default: return <BellOutlined className="text-blue-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
  };

  const latestPayslip = payslips[0];

  // ========== هندلرهای مودال ==========
  const handleEditProfileOk = () => {
    editProfileForm
      .validateFields()
      .then((values) => {
        console.log('Edit Profile Values:', values);
        message.success('پروفایل با موفقیت ویرایش شد');
        setIsEditProfileModalOpen(false);
        editProfileForm.resetFields();
      })
      .catch((info) => console.log('Validate Failed:', info));
  };

  const handleUpdateProfileOk = () => {
    updateProfileForm
      .validateFields()
      .then((values) => {
        console.log('Update Profile Values:', values);
        message.success('اطلاعات با موفقیت بروزرسانی شد');
        setIsUpdateProfileModalOpen(false);
        updateProfileForm.resetFields();
      })
      .catch((info) => console.log('Validate Failed:', info));
  };

  const handleLeaveRequestOk = () => {
    leaveRequestForm
      .validateFields()
      .then((values) => {
        console.log('Leave Request Values:', values);
        message.success('درخواست مرخصی با موفقیت ثبت شد');
        setIsLeaveRequestModalOpen(false);
        leaveRequestForm.resetFields();
      })
      .catch((info) => console.log('Validate Failed:', info));
  };

  const handlePayslipSelect = (value: string) => {
    setSelectedPayslipMonth(value);
  };

  const selectedPayslip = payslips.find((p) => p.month === selectedPayslipMonth) || payslips[0];

  // ========== Render ==========
  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar size={64} icon={<UserOutlined />} className="bg-blue-600 text-2xl" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">علی احمدی</h1>
            <p className="text-gray-500">توسعه‌دهنده ارشد — دپارتمان فنی</p>
          </div>
        </div>
        <Space>
          <Badge count={notifications.filter((n) => !n.read).length}>
            <Button shape="circle" icon={<BellOutlined />} size="large" />
          </Badge>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setIsEditProfileModalOpen(true)}
          >
            ویرایش پروفایل
          </Button>
        </Space>
      </div>

      {/* Quick Action Buttons */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Button
            type="primary"
            size="large"
            className="w-full h-16 flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 border-0 text-base"
            icon={<CalendarOutlined style={{ fontSize: 22 }} />}
            onClick={() => setIsLeaveRequestModalOpen(true)}
          >
            درخواست مرخصی
          </Button>
        </Col>
        <Col xs={24} sm={8}>
          <Button
            type="primary"
            size="large"
            className="w-full h-16 flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 border-0 text-base"
            icon={<FileTextOutlined style={{ fontSize: 22 }} />}
            onClick={() => setIsViewPayslipModalOpen(true)}
          >
            مشاهده فیش حقوقی
          </Button>
        </Col>
        <Col xs={24} sm={8}>
          <Button
            type="primary"
            size="large"
            className="w-full h-16 flex items-center justify-center gap-3 bg-indigo-500 hover:bg-indigo-600 border-0 text-base"
            icon={<ProfileOutlined style={{ fontSize: 22 }} />}
            onClick={() => setIsUpdateProfileModalOpen(true)}
          >
            بروزرسانی پروفایل
          </Button>
        </Col>
      </Row>

      {/* Main Content – هم‌ارتفاع کردن کارت‌ها */}
      <Row gutter={[16, 16]} align="stretch" style={{ height: '100%' }}>
        {/* ستون چپ */}
        <Col xs={24} lg={16} style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Recent Payslip – ارتفاع ثابت */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <WalletOutlined className="text-blue-500" />
                <span className="font-bold text-gray-700">فیش حقوقی اخیر</span>
              </div>
            }
            className="shadow-sm border-0 mb-4"
            extra={
              <Button type="link" icon={<RightOutlined />} onClick={() => setIsViewPayslipModalOpen(true)}>
                مشاهده همه
              </Button>
            }
          >
            {latestPayslip ? (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      حقوق {latestPayslip.month} {latestPayslip.year}
                    </h3>
                    <p className="text-sm text-gray-500">پرداخت شده در {latestPayslip.paidAt}</p>
                  </div>
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    className="bg-blue-600"
                    onClick={() => downloadPDF(payslipRef, `payslip_${latestPayslip.month}_${latestPayslip.year}.pdf`)}
                  >
                    دانلود PDF
                  </Button>
                </div>
                {/* محتوای فیش حقوقی که قرار است دانلود شود */}
                <div ref={payslipRef} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px' }}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={8}>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">حقوق ناخالص</p>
                        <p className="text-lg font-bold text-gray-800">{formatCurrency(latestPayslip.grossSalary)}</p>
                      </div>
                    </Col>
                    <Col xs={24} sm={8}>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">کسورات</p>
                        <p className="text-lg font-bold text-red-500">{formatCurrency(latestPayslip.deductions)}</p>
                      </div>
                    </Col>
                    <Col xs={24} sm={8}>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">خالص پرداختی</p>
                        <p className="text-lg font-bold text-emerald-600">{formatCurrency(latestPayslip.netSalary)}</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            ) : (
              <Empty description="فیش حقوقی یافت نشد" />
            )}
          </Card>

          {/* Attendance History – کششی */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <ClockCircleOutlined className="text-indigo-500" />
                <span className="font-bold text-gray-700">تاریخچه حضور (۷ روز اخیر)</span>
              </div>
            }
            className="shadow-sm border-0"
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            <Chart options={attendanceOptions} series={attendanceSeries} type="bar" height={220} />
            <div style={{ flex: 1, marginTop: 16 }}>
              <List
                dataSource={attendanceRecords.slice(-5).reverse()}
                renderItem={(record: AttendanceRecord) => {
                  const st = getAttendanceStatus(record.status);
                  return (
                    <List.Item className="border-b border-gray-100 last:border-0 py-2">
                      <div className="flex items-center justify-between w-full">
                        <Space>
                          <Tag icon={st.icon} color={st.color} className="text-xs">
                            {st.text}
                          </Tag>
                          <span className="text-sm text-gray-700">{record.date}</span>
                        </Space>
                        <span className="text-sm text-gray-500">
                          {record.checkIn} — {record.checkOut}
                        </span>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </div>
          </Card>
        </Col>

        {/* ستون راست */}
        <Col xs={24} lg={8} style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Leave Balance – ارتفاع ثابت */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <CalendarOutlined className="text-emerald-500" />
                <span className="font-bold text-gray-700">مانده مرخصی</span>
              </div>
            }
            className="shadow-sm border-0 mb-4"
            style={{ flexShrink: 0 }}
          >
            <div className="space-y-5">
              {/* Annual Leave */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Space>
                    <HomeOutlined className="text-blue-500" />
                    <span className="font-medium">مرخصی سالانه</span>
                  </Space>
                  <span className="text-sm text-gray-500">
                    {leaveBalance.annual.remaining} از {leaveBalance.annual.total} روز
                  </span>
                </div>
                <Progress
                  percent={Math.round((leaveBalance.annual.used / leaveBalance.annual.total) * 100)}
                  strokeColor="#3b82f6"
                  showInfo={false}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>استفاده شده: {leaveBalance.annual.used} روز</span>
                  <span>باقی‌مانده: {leaveBalance.annual.remaining} روز</span>
                </div>
              </div>

              {/* Sick Leave */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Space>
                    <MedicineBoxOutlined className="text-amber-500" />
                    <span className="font-medium">مرخصی استعلاجی</span>
                  </Space>
                  <span className="text-sm text-gray-500">
                    {leaveBalance.sick.remaining} از {leaveBalance.sick.total} روز
                  </span>
                </div>
                <Progress
                  percent={Math.round((leaveBalance.sick.used / leaveBalance.sick.total) * 100)}
                  strokeColor="#f59e0b"
                  showInfo={false}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>استفاده شده: {leaveBalance.sick.used} روز</span>
                  <span>باقی‌مانده: {leaveBalance.sick.remaining} روز</span>
                </div>
              </div>

              {/* Unpaid Leave */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Space>
                    <ClockCircleOutlined className="text-gray-500" />
                    <span className="font-medium">مرخصی بدون حقوق</span>
                  </Space>
                  <span className="text-sm text-gray-500">
                    {leaveBalance.unpaid.remaining} از {leaveBalance.unpaid.total} روز
                  </span>
                </div>
                <Progress
                  percent={Math.round((leaveBalance.unpaid.used / leaveBalance.unpaid.total) * 100)}
                  strokeColor="#6b7280"
                  showInfo={false}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>استفاده شده: {leaveBalance.unpaid.used} روز</span>
                  <span>باقی‌مانده: {leaveBalance.unpaid.remaining} روز</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Notifications – کششی */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <BellOutlined className="text-purple-500" />
                <span className="font-bold text-gray-700">اعلان‌ها</span>
              </div>
            }
            className="shadow-sm border-0"
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0 }}
          >
            <List
              dataSource={notifications}
              style={{ flex: 1, overflow: 'auto', padding: '8px 16px' }}
              renderItem={(item: Notification) => (
                <List.Item className="border-b border-gray-100 last:border-0 py-3">
                  <div className="flex items-start gap-3 w-full">
                    <div className="mt-1">{getNotificationIcon(item.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-medium text-sm ${item.read ? 'text-gray-500' : 'text-gray-800'}`}>
                          {item.title}
                        </span>
                        {!item.read && <Badge color="blue" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.message}</p>
                      <span className="text-xs text-gray-400 mt-1 block">{item.time}</span>
                    </div>
                  </div>
                </List.Item>
              )}
              locale={{ emptyText: 'اعلانی وجود ندارد' }}
            />
          </Card>
        </Col>
      </Row>

      {/* ============================================================ */}
      {/* ======================== مودال‌ها ============================ */}
      {/* ============================================================ */}

      {/* ---------- مودال ویرایش پروفایل ---------- */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-lg">
            <EditOutlined className="text-blue-500" />
            <span>ویرایش پروفایل</span>
          </div>
        }
        open={isEditProfileModalOpen}
        onOk={handleEditProfileOk}
        onCancel={() => {
          setIsEditProfileModalOpen(false);
          editProfileForm.resetFields();
        }}
        okText="ذخیره تغییرات"
        cancelText="انصراف"
        width={600}
        forceRender
      >
        <Form form={editProfileForm} layout="vertical" dir="rtl">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="نام"
                rules={[{ required: true, message: 'لطفاً نام خود را وارد کنید' }]}
                initialValue="علی"
              >
                <Input prefix={<UserOutlined />} placeholder="نام" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="نام خانوادگی"
                rules={[{ required: true, message: 'لطفاً نام خانوادگی را وارد کنید' }]}
                initialValue="احمدی"
              >
                <Input prefix={<UserOutlined />} placeholder="نام خانوادگی" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="email"
            label="ایمیل"
            rules={[{ required: true, type: 'email', message: 'ایمیل معتبر وارد کنید' }]}
            initialValue="ali.ahmadi@company.com"
          >
            <Input prefix={<MailOutlined />} placeholder="ایمیل" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="شماره تماس"
            rules={[{ required: true, message: 'شماره تماس را وارد کنید' }]}
            initialValue="۰۹۱۲۳۴۵۶۷۸۹"
          >
            <Input prefix={<PhoneOutlined />} placeholder="شماره تماس" />
          </Form.Item>
          <Form.Item name="address" label="آدرس" initialValue="تهران، خیابان ولیعصر، پلاک ۱۲۳">
            <Input prefix={<EnvironmentOutlined />} placeholder="آدرس" />
          </Form.Item>
          <Form.Item name="position" label="سمت" initialValue="توسعه‌دهنده ارشد">
            <Input placeholder="سمت" />
          </Form.Item>
        </Form>
      </Modal>

      {/* ---------- مودال بروزرسانی پروفایل ---------- */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-lg">
            <SaveOutlined className="text-indigo-500" />
            <span>بروزرسانی پروفایل</span>
          </div>
        }
        open={isUpdateProfileModalOpen}
        onOk={handleUpdateProfileOk}
        onCancel={() => {
          setIsUpdateProfileModalOpen(false);
          updateProfileForm.resetFields();
        }}
        okText="بروزرسانی"
        cancelText="انصراف"
        width={500}
        forceRender
      >
        <Form form={updateProfileForm} layout="vertical" dir="rtl">
          <Form.Item
            name="email"
            label="ایمیل"
            rules={[{ required: true, type: 'email', message: 'ایمیل معتبر وارد کنید' }]}
            initialValue="ali.ahmadi@company.com"
          >
            <Input prefix={<MailOutlined />} placeholder="ایمیل جدید" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="شماره تماس"
            rules={[{ required: true, message: 'شماره تماس را وارد کنید' }]}
            initialValue="۰۹۱۲۳۴۵۶۷۸۹"
          >
            <Input prefix={<PhoneOutlined />} placeholder="شماره تماس جدید" />
          </Form.Item>
          <Form.Item name="address" label="آدرس" initialValue="تهران، خیابان ولیعصر، پلاک ۱۲۳">
            <Input prefix={<EnvironmentOutlined />} placeholder="آدرس جدید" />
          </Form.Item>
          <Divider plain>تغییر رمز عبور</Divider>
          <Form.Item name="password" label="رمز عبور جدید">
            <Input.Password placeholder="رمز عبور جدید" />
          </Form.Item>
          <Form.Item name="confirmPassword" label="تکرار رمز عبور">
            <Input.Password placeholder="تکرار رمز عبور" />
          </Form.Item>
        </Form>
      </Modal>

      {/* ---------- مودال درخواست مرخصی ---------- */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-lg">
            <CalendarOutlined className="text-emerald-500" />
            <span>درخواست مرخصی</span>
          </div>
        }
        open={isLeaveRequestModalOpen}
        onOk={handleLeaveRequestOk}
        onCancel={() => {
          setIsLeaveRequestModalOpen(false);
          leaveRequestForm.resetFields();
        }}
        okText="ثبت درخواست"
        cancelText="انصراف"
        width={550}
        forceRender
      >
        <Form form={leaveRequestForm} layout="vertical" dir="rtl">
          <Form.Item
            name="leaveType"
            label="نوع مرخصی"
            rules={[{ required: true, message: 'نوع مرخصی را انتخاب کنید' }]}
          >
            <Select placeholder="انتخاب نوع مرخصی">
              <Select.Option value="annual">مرخصی سالانه</Select.Option>
              <Select.Option value="sick">مرخصی استعلاجی</Select.Option>
              <Select.Option value="unpaid">مرخصی بدون حقوق</Select.Option>
              <Select.Option value="other">سایر</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dateRange"
            label="بازه زمانی"
            rules={[{ required: true, message: 'بازه زمانی را انتخاب کنید' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="reason"
            label="توضیحات"
            rules={[{ required: true, message: 'توضیحات را وارد کنید' }]}
          >
            <Input.TextArea rows={4} placeholder="دلیل درخواست مرخصی را وارد کنید" />
          </Form.Item>
        </Form>
      </Modal>

      {/* ---------- مودال مشاهده فیش حقوقی ---------- */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-lg">
            <EyeOutlined className="text-blue-500" />
            <span>مشاهده فیش حقوقی</span>
          </div>
        }
        open={isViewPayslipModalOpen}
        onCancel={() => setIsViewPayslipModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewPayslipModalOpen(false)}>
            بستن
          </Button>,
          <Button
            key="download"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => downloadPDF(modalPayslipRef, `payslip_${selectedPayslip?.month}_${selectedPayslip?.year}.pdf`)}
          >
            دانلود PDF
          </Button>,
        ]}
        width={600}
        forceRender
      >
        <div className="mb-4">
          <Select
            style={{ width: '100%' }}
            value={selectedPayslipMonth}
            onChange={handlePayslipSelect}
            options={payslips.map((p) => ({
              value: p.month,
              label: `${p.month} ${p.year}`,
            }))}
          />
        </div>
        {selectedPayslip ? (
          <div ref={modalPayslipRef} className="bg-gray-50 rounded-lg p-5">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <div>
                <Text strong className="text-lg">
                  {selectedPayslip.month} {selectedPayslip.year}
                </Text>
                <br />
                <Text type="secondary">تاریخ پرداخت: {selectedPayslip.paidAt}</Text>
              </div>
              <Button
                type="link"
                icon={<DownloadOutlined />}
                onClick={() => downloadPDF(modalPayslipRef, `payslip_${selectedPayslip.month}_${selectedPayslip.year}.pdf`)}
              >
                دانلود
              </Button>
            </div>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div className="bg-white p-3 rounded text-center shadow-sm">
                  <Text type="secondary" className="block text-sm">
                    حقوق ناخالص
                  </Text>
                  <Text strong className="text-lg">
                    {formatCurrency(selectedPayslip.grossSalary)}
                  </Text>
                </div>
              </Col>
              <Col span={8}>
                <div className="bg-white p-3 rounded text-center shadow-sm">
                  <Text type="secondary" className="block text-sm">
                    کسورات
                  </Text>
                  <Text strong className="text-lg text-red-500">
                    {formatCurrency(selectedPayslip.deductions)}
                  </Text>
                </div>
              </Col>
              <Col span={8}>
                <div className="bg-white p-3 rounded text-center shadow-sm">
                  <Text type="secondary" className="block text-sm">
                    خالص پرداختی
                  </Text>
                  <Text strong className="text-lg text-emerald-600">
                    {formatCurrency(selectedPayslip.netSalary)}
                  </Text>
                </div>
              </Col>
            </Row>
            <Divider>جزئیات</Divider>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>حقوق پایه:</span>
                <span>{formatCurrency(selectedPayslip.grossSalary * 0.8)}</span>
              </div>
              <div className="flex justify-between">
                <span>مزایا:</span>
                <span>{formatCurrency(selectedPayslip.grossSalary * 0.2)}</span>
              </div>
              <div className="flex justify-between">
                <span>مالیات:</span>
                <span>{formatCurrency(selectedPayslip.deductions * 0.6)}</span>
              </div>
              <div className="flex justify-between">
                <span>بیمه:</span>
                <span>{formatCurrency(selectedPayslip.deductions * 0.4)}</span>
              </div>
            </div>
          </div>
        ) : (
          <Empty description="فیش حقوقی برای این ماه یافت نشد" />
        )}
      </Modal>
    </div>
  );
};

export default EmployeeDashboard;