import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [];

export type BuffHistory = {
  orderId: string;
  orderLink: string;
  serviceId: string;
  orderQuantity: number;
  orderAmount: number;
  orderPrice: number;
  createdAt: string;
  orderNote: string;
  serviceName: string;
  servicePrice: number; 
};

export type TopupHistory = {
  id: number;
  amount: string;
  createdAt: string;
  note: string;
  payment_method: string;
  payment_code: string;
  sender: string;
  content: string;
}

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Trang chủ',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Tài khoản của tôi',
    url: '/dashboard/myaccount',
    icon: 'user',
    shortcut: ['e', 'e'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Nạp tiền tài khoản',
    url: '/dashboard/topup',
    icon: 'user',
    shortcut: ['t', 't'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Cấp bậc tài khoán',
    url: '/dashboard/tier', 
    icon: 'billing',
    isActive: false,
    items: []
  },
  {
    title: 'Facebook',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'facebook',
    isActive: true,

    items: [
      {
        title: 'Tăng mắt live Facebook',
        url: '/dashboard/facebook/live',
        icon: 'userPen',
        shortcut: ['matF', 'matF']
      },
      {
        title: 'Tăng view Live Facebook',
        url: '/dashboard/facebook/view',
        icon: 'userPen',
      },
      {
        title: 'Tăng view Reel Facebook',
        url: '/dashboard/facebook/viewReel',
        icon: 'userPen',
      },
    ]
  },
  {
    title: 'Tiktok',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'tiktok',
    isActive: true,

    items: [
      {
        title: 'Tăng mắt tiktok',
        url: '/dashboard/tiktok/live',
        icon: 'userPen',
        shortcut: ['matT', 'matT']
      },
      {
        title: 'Tăng view tiktok',
        url: '/dashboard/tiktok/view',
        icon: 'userPen',
      },
    ]
  },
  {
    title: 'Youtube',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'youtube',
    isActive: true,

    items: [
      {
        title: 'Tăng mắt youtube',
        url: '/dashboard/youtube/live',
        icon: 'userPen',
        shortcut: ['matY', 'matY']
      },
      {
        title: 'Tăng view youtube',
        url: '/dashboard/youtube/view',
        icon: 'userPen',
      },
    ]
  },
  {
    title: 'Shopee',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'shopee',
    isActive: true,

    items: [
      {
        title: 'Tăng mắt shopee',
        url: '/dashboard/shopee/live',
        icon: 'userPen',
        shortcut: ['matS', 'matS']
      },
    ]
  },
  {
    title: 'Instagram',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'instagram',
    isActive: true,

    items: [
      {
        title: 'Tăng mắt instagram',
        url: '/dashboard/instagram/live',
        icon: 'userPen',
        shortcut: ['matI', 'matI']
      },
      {
        title: 'Tăng view instagram',
        url: '/dashboard/instagram/view',
        icon: 'userPen',
      },
    ]
  },
];
