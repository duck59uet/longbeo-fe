'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OverViewPage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Cộng Tác Viên',
              amount: '0 VND',
              features: [
                { text: 'Giảm giá dịch vụ.', enabled: true },
                { text: 'Có thể tạo website riêng.', enabled: true },
                { text: 'Giao diện trang website riêng.', enabled: true },
                { text: 'Có nhóm chat hỗ trợ 24/7.', enabled: true },
                { text: 'Có các ưu đãi quyền lợi riêng.', enabled: false },
              ],
            },
            {
              title: 'Nhà Phân Phối',
              amount: '0 VND',
              features: [
                { text: 'Giảm giá dịch vụ.', enabled: true },
                { text: 'Có thể tạo website riêng.', enabled: true },
                { text: 'Giao diện trang website riêng.', enabled: true },
                { text: 'Có nhóm chat hỗ trợ 24/7.', enabled: true },
                { text: 'Có các ưu đãi quyền lợi riêng.', enabled: true },
              ],
            },
            {
              title: 'Đại Lý',
              amount: '0 VND',
              features: [
                { text: 'Giảm giá dịch vụ.', enabled: true },
                { text: 'Có thể tạo website riêng.', enabled: true },
                { text: 'Giao diện trang website riêng.', enabled: true },
                { text: 'Có nhóm chat hỗ trợ 24/7.', enabled: true },
                { text: 'Có các ưu đãi quyền lợi riêng.', enabled: true },
              ],
            },
          ].map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold">{item.amount}</div>
                <Button className="mt-4 w-full" variant="outline">
                  Nâng Cấp Ngay
                </Button>
                <ul className="mt-4 text-left space-y-2">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span
                        className={`mr-2 ${
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