'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

export default function OverViewPage() {
  // Lấy locale từ sessionStorage, mặc định là 'vi'
  const [locale, setLocale] = useState<'en' | 'vi'>('vi');
  useEffect(() => {
    const storedLocale = sessionStorage.getItem('locale');
    if (storedLocale === 'en' || storedLocale === 'vi') {
      setLocale(storedLocale);
    } else {
      sessionStorage.setItem('locale', 'vi');
      setLocale('vi');
    }
  }, []);

  // Dữ liệu các gói theo ngôn ngữ
  const translations = {
    en: {
      cards: [
        {
          title: "Collaborator",
          amount: "0 VND",
          button: "Upgrade Now",
          features: [
            { text: "Service discount.", enabled: true },
            { text: "Can create your own website.", enabled: true },
            { text: "Custom website design.", enabled: true },
            { text: "24/7 support chat.", enabled: true },
            { text: "Exclusive benefits.", enabled: false }
          ]
        },
        {
          title: "Distributor",
          amount: "0 VND",
          button: "Upgrade Now",
          features: [
            { text: "Service discount.", enabled: true },
            { text: "Can create your own website.", enabled: true },
            { text: "Custom website design.", enabled: true },
            { text: "24/7 support chat.", enabled: true },
            { text: "Exclusive benefits.", enabled: true }
          ]
        },
        {
          title: "Agent",
          amount: "0 VND",
          button: "Upgrade Now",
          features: [
            { text: "Service discount.", enabled: true },
            { text: "Can create your own website.", enabled: true },
            { text: "Custom website design.", enabled: true },
            { text: "24/7 support chat.", enabled: true },
            { text: "Exclusive benefits.", enabled: true }
          ]
        }
      ]
    },
    vi: {
      cards: [
        {
          title: "Cộng Tác Viên",
          amount: "0 VND",
          button: "Nâng Cấp Ngay",
          features: [
            { text: "Giảm giá dịch vụ.", enabled: true },
            { text: "Có thể tạo website riêng.", enabled: true },
            { text: "Giao diện trang website riêng.", enabled: true },
            { text: "Có nhóm chat hỗ trợ 24/7.", enabled: true },
            { text: "Có các ưu đãi quyền lợi riêng.", enabled: false }
          ]
        },
        {
          title: "Nhà Phân Phối",
          amount: "0 VND",
          button: "Nâng Cấp Ngay",
          features: [
            { text: "Giảm giá dịch vụ.", enabled: true },
            { text: "Có thể tạo website riêng.", enabled: true },
            { text: "Giao diện trang website riêng.", enabled: true },
            { text: "Có nhóm chat hỗ trợ 24/7.", enabled: true },
            { text: "Có các ưu đãi quyền lợi riêng.", enabled: true }
          ]
        },
        {
          title: "Đại Lý",
          amount: "0 VND",
          button: "Nâng Cấp Ngay",
          features: [
            { text: "Giảm giá dịch vụ.", enabled: true },
            { text: "Có thể tạo website riêng.", enabled: true },
            { text: "Giao diện trang website riêng.", enabled: true },
            { text: "Có nhóm chat hỗ trợ 24/7.", enabled: true },
            { text: "Có các ưu đãi quyền lợi riêng.", enabled: true }
          ]
        }
      ]
    }
  };

  const cards = translations[locale].cards;

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-center font-sans">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold font-sans">{item.amount}</div>
                <Button className="mt-4 w-full font-sans" variant="outline">
                  {item.button}
                </Button>
                <ul className="mt-4 text-left space-y-2">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span
                        className={`mr-2 font-sans ${
                          feature.enabled ? 'text-blue-500' : 'text-red-500'
                        }`}
                      >
                        {feature.enabled ? '✔' : '✖'}
                      </span>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
