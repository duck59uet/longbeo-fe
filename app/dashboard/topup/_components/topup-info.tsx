'use client';

import * as React from 'react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getInfo } from '@/services/myaccount';

export function TopupInfo() {
  const [userInfo, setUserInfo] = useState<any>(null);

  React.useEffect(() => {
    getInfo().then((res) => {
      setUserInfo(res.Data);
    });
  }, []);

  const instructions = [
    'Bạn vui lòng chuyển khoản chính xác nội dung để được cộng tiền nhanh nhất.',
    'Nếu sau 10 phút tài khoản chưa được cộng tiền vui liên hệ Admin để được hỗ trợ.',
    'Vui lòng không nạp từ bank khác qua bank này (tránh lỗi).',
    'Nạp sai số tài khoản, sai ngân hàng, sai nội dung sẽ bị trừ 20% phí giao dịch.',
    'Bấm vào số tài khoản hoặc nội dung để sao chép nội thông tin chuyển tiền 1 cách chuẩn nhất.'
  ];

  return (
    <>
      {/* Card chính */}
      <Card className="flex flex-col mt-4">
        <CardContent className="w-full rounded-lg p-4 py-2 mb-2">
          {/* Hướng dẫn */}
          <div className="bg-[#F5BEBE] p-4 rounded-lg">
            <ul className="space-y-2 text-[#D82222] text-sm font-semibold font-sans">
              {instructions.map((text, index) => (
                <li key={index}>- {text}</li>
              ))}
            </ul>
          </div>

          {/* Thông tin ngân hàng */}
          <div className="flex flex-col items-center mt-6">
            <div className="border rounded-lg p-[56px] w-full text-center grid gap-4 md:grid-cols-2">
              <div className='flex justify-center items-center'>
                <img
                  src="/qr-topup.jpg" // Đường dẫn tới ảnh QR
                  alt="QR Code"
                  className="w-full max-w-[130px] h-auto object-contain"
                />
              </div>
              <div className="text-left content-center">
                <p className="text-sm font-semibold">
                  Số tài khoản: <span className="font-bold">0451000399584</span>
                </p>
                <p className="text-sm font-semibold">
                  Chủ tài khoản:{' '}
                  <span className="font-bold">NGUYEN DUC THUAN</span>
                </p>
              </div>
            </div>
          </div>

          {/* Nội dung chuyển khoản */}
          <div className="mt-6">
            <div className="bg-[#5B7CFD] text-white text-center text-sm font-bold py-2 rounded-t-lg">
              NỘI DUNG: (BẮT BUỘC GHI ĐÚNG NỘI DUNG DƯỚI ĐÂY)
            </div>
            <div className="bg-[#EEF3FF] text-[#5B7CFD] text-center text-lg font-bold py-4 rounded-b-lg">
              naptien {userInfo?.username}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
