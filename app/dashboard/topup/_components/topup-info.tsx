'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export function TopupInfo() {
  return (
    <Card className="flex flex-col mt-4">
      <CardContent className="w-full rounded-lg p-4 py-2 mb-2">
        <div className="flex items-center justify-between w-full mt-4">
          <div className="flex items-center space-x-2 w-full">
            <div className="bg-[#F5BEBE] p-2 w-full rounded-lg">
              <ul className="space-y-2 text-[#D82222] ">
                <li className="text-sm font-semibold font-sans">
                  - Bạn vui lòng chuyển khoản chính xác nội dung để được cộng tiền
                  nhanh nhất.
                </li>
                <li className="text-sm font-semibold font-sans">
                  - Nếu sau 10 phút tài khoản chưa được cộng tiền vui liên hệ
                  Admin để được hỗ trợ.
                </li>
                <li className="text-sm font-semibold font-sans">
                  - Vui lòng không nạp từ bank khác qua bank này (tránh lỗi)
                </li>
                <li className="text-sm font-semibold font-sans">
                  - Nạp sai số tài khoản, sai ngân hàng, sai nội dung sẽ bị trừ
                  20% phí giao dịch.
                </li>
                <li className="text-sm font-semibold font-sans">
                  - Bấm vào số tài khoản hoặc nội dung để sao chép nội thông tin
                  chuyển tiền 1 cách chuẩn nhất.
                </li>
              </ul>
            </div>

            <div>

            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
