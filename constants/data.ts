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

export function getNavItems(locale: 'en' | 'vi'): NavItem[] {
  if (locale === 'en') {
    return [
      {
        title: 'Dashboard',
        url: '/dashboard/overview',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'My Account',
        url: '/dashboard/myaccount',
        icon: 'user',
        shortcut: ['e', 'e'],
        isActive: false,
        items: []
      },
      {
        title: 'Top-up Account',
        url: '/dashboard/topup',
        icon: 'user',
        shortcut: ['t', 't'],
        isActive: false,
        items: []
      },
      {
        title: 'Account Tier',
        url: '/dashboard/tier',
        icon: 'billing',
        isActive: false,
        items: []
      },
      {
        title: 'Facebook',
        url: '#',
        icon: 'facebook',
        isActive: true,
        items: [
          {
            title: 'Boost Facebook Live',
            url: '/dashboard/facebook/live',
            icon: 'userPen',
            shortcut: ['matF', 'matF']
          },
          {
            title: 'Boost Facebook Video Views',
            url: '/dashboard/facebook/view',
            icon: 'userPen'
          },
          {
            title: 'Boost Facebook Reels',
            url: '/dashboard/facebook/viewReel',
            icon: 'userPen'
          }
        ]
      },
      {
        title: 'TikTok',
        url: '#',
        icon: 'tiktok',
        isActive: true,
        items: [
          {
            title: 'Boost TikTok Likes',
            url: '/dashboard/tiktok/live',
            icon: 'userPen',
            shortcut: ['matT', 'matT']
          },
          {
            title: 'Boost TikTok Views',
            url: '/dashboard/tiktok/view',
            icon: 'userPen'
          }
        ]
      },
      {
        title: 'YouTube',
        url: '#',
        icon: 'youtube',
        isActive: true,
        items: [
          {
            title: 'Boost YouTube Likes',
            url: '/dashboard/youtube/live',
            icon: 'userPen',
            shortcut: ['matY', 'matY']
          },
          {
            title: 'Boost YouTube Views',
            url: '/dashboard/youtube/view',
            icon: 'userPen'
          }
        ]
      },
      {
        title: 'Shopee',
        url: '#',
        icon: 'shopee',
        isActive: true,
        items: [
          {
            title: 'Boost Shopee Likes',
            url: '/dashboard/shopee/live',
            icon: 'userPen',
            shortcut: ['matS', 'matS']
          }
        ]
      },
      {
        title: 'Instagram',
        url: '#',
        icon: 'instagram',
        isActive: true,
        items: [
          {
            title: 'Boost Instagram Likes',
            url: '/dashboard/instagram/live',
            icon: 'userPen',
            shortcut: ['matI', 'matI']
          },
          {
            title: 'Boost Instagram Views',
            url: '/dashboard/instagram/view',
            icon: 'userPen'
          }
        ]
      },
      {
        title: 'API Documentation',
        url: '#',
        icon: 'book',
        isActive: true,
        items: [
          {
            title: 'Documentation',
            url: '/dashboard/api/docs',
            icon: 'userPen',
            shortcut: ['doc', 'doc']
          },
          {
            title: 'Service List',
            url: '/dashboard/api/listService',
            icon: 'userPen'
          }
        ]
      }
    ];
  } else {
    return [
      {
        title: 'Trang chủ',
        url: '/dashboard/overview',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Tài khoản của tôi',
        url: '/dashboard/myaccount',
        icon: 'user',
        shortcut: ['e', 'e'],
        isActive: false,
        items: []
      },
      {
        title: 'Nạp tiền tài khoản',
        url: '/dashboard/topup',
        icon: 'user',
        shortcut: ['t', 't'],
        isActive: false,
        items: []
      },
      {
        title: 'Cấp bậc tài khoản',
        url: '/dashboard/tier',
        icon: 'billing',
        isActive: false,
        items: []
      },
      {
        title: 'Facebook',
        url: '#',
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
            title: 'Tăng lượt xem video Facebook',
            url: '/dashboard/facebook/view',
            icon: 'userPen'
          },
          {
            title: 'Tăng Reel Facebook',
            url: '/dashboard/facebook/viewReel',
            icon: 'userPen'
          }
        ]
      },
      {
        title: 'Tiktok',
        url: '#',
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
            icon: 'userPen'
          }
        ]
      },
      {
        title: 'Youtube',
        url: '#',
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
            icon: 'userPen'
          }
        ]
      },
      {
        title: 'Shopee',
        url: '#',
        icon: 'shopee',
        isActive: true,
        items: [
          {
            title: 'Tăng mắt shopee',
            url: '/dashboard/shopee/live',
            icon: 'userPen',
            shortcut: ['matS', 'matS']
          }
        ]
      },
      {
        title: 'Instagram',
        url: '#',
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
            icon: 'userPen'
          }
        ]
      },
      {
        title: 'Tài liệu API',
        url: '#',
        icon: 'book',
        isActive: true,
        items: [
          {
            title: 'Tài liệu',
            url: '/dashboard/api/docs',
            icon: 'userPen',
            shortcut: ['doc', 'doc']
          },
          {
            title: 'Danh sách service',
            url: '/dashboard/api/listService',
            icon: 'userPen'
          }
        ]
      }
    ];
  }
}
