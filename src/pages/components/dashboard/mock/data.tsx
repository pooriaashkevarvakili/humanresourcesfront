import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  UserOutlined,
  StarOutlined,
  RocketOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import type { StatItem, QuickStat, ActivityItem, PlanItem } from '../../../../types/dashboard';

export const statsMock: StatItem[] = [
  {
    title: 'نرخ گردش مالی',
    value: '2.47%',
    icon: <ArrowUpOutlined />,
    color: '#ff4d4f',
    bgColor: '#fff1f0',
    change: '+0.8%',
  },
  {
    title: 'فاکتورهای معوق',
    value: '42',
    icon: <ClockCircleOutlined />,
    color: '#faad14',
    bgColor: '#fffbe6',
    change: '-3',
  },
  {
    title: 'نرخ ریزش مشتری',
    value: '1.8%',
    icon: <ArrowDownOutlined />,
    color: '#52c41a',
    bgColor: '#f6ffed',
    change: '-0.2%',
  },
  {
    title: 'درآمد ماهانه (MRR)',
    value: '89,200',
    icon: <DollarOutlined />,
    color: '#1890ff',
    bgColor: '#e6f7ff',
    change: '+$5,400',
  },
  {
    title: 'کل مشتریان',
    value: '12,450',
    icon: <TeamOutlined />,
    color: '#722ed1',
    bgColor: '#f9f0ff',
    change: '+124',
  },
  {
    title: 'وضعیت سیستم',
    value: '99.9%',
    icon: <CheckCircleOutlined />,
    color: '#52c41a',
    bgColor: '#f6ffed',
    change: 'عالی',
  },
];

export const quickStatsMock: QuickStat[] = [
  { label: 'مشتریان جدید', value: '1,240', change: '+18%', color: '#52c41a' },
  { label: 'تعداد تراکنش‌ها', value: '8,920', change: '+12%', color: '#1890ff' },
  { label: 'میانگین درآمد', value: '$1,240', change: '+8%', color: '#722ed1' },
  { label: 'نرخ تبدیل', value: '32.4%', change: '+2.1%', color: '#faad14' },
];

export const activitiesMock: ActivityItem[] = [
  {
    icon: <UserAddOutlined style={{ color: '#1890ff' }} />,
    title: 'کاربر جدید "سارا علوی" ثبت‌نام کرد.',
    time: '۱ دقیقه پیش',
  },
  {
    icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    title: 'فاکتور #8921 با موفقیت پرداخت شد.',
    time: '۲۵ دقیقه پیش',
  },
  {
    icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
    title: 'لغو اشتراک توسط "شرکت رایان داتیس".',
    time: '۲ ساعت پیش',
  },
  {
    icon: <RocketOutlined style={{ color: '#722ed1' }} />,
    title: 'پلن سرویس بروزرسانی شد. (Enterprise)',
    time: '۴ ساعت پیش',
  },
];

export const plansMock: PlanItem[] = [
  {
    name: 'پلن پایه',
    users: 2840,
    revenue: 5600,
    growth: '+12%',
    color: '#1890ff',
    icon: <UserOutlined />,
  },
  {
    name: 'پلن حرفه‌ای',
    users: 1240,
    revenue: 4500,
    growth: '+18%',
    color: '#52c41a',
    icon: <StarOutlined />,
  },
  {
    name: 'پلن سازمانی',
    users: 340,
    revenue: 4200,
    growth: '+24%',
    color: '#faad14',
    icon: <RocketOutlined />,
  },
];