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

export type Order = {
  id: number;
  link: string;
  createdAt: string;
  quantity: number;
  amount: number;
  price: number;
  discount: number;
  username: string;
  status: string;
};

export function getNavItems(locale: 'en' | 'vi'): NavItem[] {
  if (locale === 'en') {
    return [
      {
        title: 'Dashboard',
        url: '/overview',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'My Account',
        url: '/myaccount',
        isAuthorized: true,
        icon: 'user',
        shortcut: ['e', 'e'],
        isActive: false,
        items: []
      },
      {
        title: 'Top-up Account',
        url: '/topup',
        icon: 'user',
        isAuthorized: true,
        shortcut: ['t', 't'],
        isActive: false,
        items: []
      },
      {
        title: 'Account Tier',
        url: '/tier',
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
            url: '/facebook/live',
            icon: 'userPen',
            shortcut: ['matF', 'matF']
          },
          {
            title: 'Boost Facebook Video Views',
            url: '/facebook/view',
            icon: 'userPen'
          },
          {
            title: 'Boost Facebook Reels',
            url: '/facebook/viewReel',
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
            title: 'Boost TikTok Live',
            url: '/tiktok/live',
            icon: 'userPen',
            shortcut: ['matT', 'matT']
          },
          {
            title: 'Boost TikTok Views',
            url: '/tiktok/view',
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
            title: 'Boost YouTube Live',
            url: '/youtube/live',
            icon: 'userPen',
            shortcut: ['matY', 'matY']
          },
          {
            title: 'Boost YouTube Views',
            url: '/youtube/view',
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
            title: 'Boost Shopee Live',
            url: '/shopee/live',
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
            title: 'Boost Instagram Live',
            url: '/instagram/live',
            icon: 'userPen',
            shortcut: ['matI', 'matI']
          },
          {
            title: 'Boost Instagram Views',
            url: '/instagram/view',
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
            url: '/api/docs',
            icon: 'userPen',
            shortcut: ['doc', 'doc']
          },
          {
            title: 'Service List',
            url: '/api/listService',
            icon: 'userPen'
          },
          {
            title: 'API Key',
            url: '/api/apiKey',
            icon: 'userPen',
            isAuthorized: true
          }
        ]
      }
    ];
  } else {
    return [
      {
        title: 'Trang chủ',
        url: '/overview',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Tài khoản của tôi',
        url: '/myaccount',
        icon: 'user',
        shortcut: ['e', 'e'],
        isActive: false,
        isAuthorized: true,
        items: []
      },
      {
        title: 'Lịch sử đơn hàng',
        url: '/orderHistory',
        icon: 'news',
        isAuthorized: true,
        isActive: false,
      },
      {
        title: 'Nạp tiền tài khoản',
        url: '/topup',
        icon: 'user',
        shortcut: ['t', 't'],
        isActive: false,
        isAuthorized: true,
        items: []
      },
      {
        title: 'Cấp bậc tài khoản',
        url: '/tier',
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
            url: '/buff-mat-Livestream-tang-luot-nguoi-xem-video-truc-tiep-tren-Facebook',
            icon: 'userPen',
            shortcut: ['matF', 'matF']
          },
          {
            title: 'Tăng lượt xem video Facebook',
            url: '/buff-view-video-facebook-la-gi',
            icon: 'userPen'
          },
          {
            title: 'Tăng Reel Facebook',
            url: '/huong-dan-tang-luot-xem-reels-facebook-hieu-qua-va-nhanh-nhat',
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
            url: '/dich-vu-tang-mat-livestream-tikTok',
            icon: 'userPen',
            shortcut: ['matT', 'matT']
          },
          {
            title: 'Tăng view tiktok',
            url: '/huong-dan-tang-luot-xem-tiktok-hieu-qua-va-nhanh-chong',
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
            url: '/mua-mat-livestream-youtube-tang-luot-xem-va-tuong-tac-truc-tiep',
            icon: 'userPen',
            shortcut: ['matY', 'matY']
          },
          {
            title: 'Tăng view youtube',
            url: '/mua-view-youtube-khong-tut',
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
            url: '/huong-dan-tang-mat-livestream-shopee',
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
            url: '/cach-tang-view-livestream-instagram-bi-quyet-thanh-cong-cho-doanh-nghiep-cua-ban',
            icon: 'userPen',
            shortcut: ['matI', 'matI']
          },
          {
            title: 'Tăng view instagram',
            url: '/tang-luot-xem-video-instagram-bi-quyet-giup-video-cua-ban-noi-bat-hon',
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
            url: '/api/docs',
            icon: 'userPen',
          },
          {
            title: 'Danh sách service',
            url: '/api/listService',
            icon: 'userPen'
          },
          {
            title: 'API Key',
            url: '/api/apiKey',
            icon: 'userPen',
            isAuthorized: true
          }
        ]
      }
    ];
  }
}
