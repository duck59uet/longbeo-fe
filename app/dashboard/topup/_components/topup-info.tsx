'use client';

import * as React from 'react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getInfo } from '@/services/myaccount';

export function TopupInfo() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            <img
              src="/vỉetcombank.webp" // Thay bằng đường dẫn logo thực tế
              alt="Vietcombank"
              className="w-24 mb-2"
            />
            <div className="border rounded-lg p-4 w-full text-center">
              <p className="text-sm font-semibold">
                Số tài khoản: <span className="font-bold">0451000399584</span>
              </p>
              <p className="text-sm font-semibold">
                Chủ tài khoản:{' '}
                <span className="font-bold">NGUYEN DUC THUAN</span>
              </p>
              <button
                onClick={openModal}
                className="mt-2 px-4 py-2 text-sm text-white bg-[#F5BEBE] hover:bg-[#D82222] rounded-lg"
              >
                Quét Mã QR
              </button>
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

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-4 w-[90%] max-w-md shadow-lg transform transition-transform scale-95"
            onClick={(e) => e.stopPropagation()} // Ngăn sự kiện nhấn ngoài modal
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Quét Mã QR</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="flex justify-center items-center">
              <img
                src="/qr-topup.jpg" // Đường dẫn tới ảnh QR
                alt="QR Code"
                className="w-full max-w-[300px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
