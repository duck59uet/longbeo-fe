'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getInfo } from '@/services/myaccount';
import { toast } from 'sonner';

export function TopupInfo() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [locale, setLocale] = useState<'en' | 'vi'>('vi');

  // Lấy giá trị locale từ sessionStorage, mặc định là "vi"
  useEffect(() => {
    const storedLocale = sessionStorage.getItem('locale');
    if (storedLocale === 'en' || storedLocale === 'vi') {
      setLocale(storedLocale);
    } else {
      sessionStorage.setItem('locale', 'vi');
      setLocale('vi');
    }
  }, []);

  // Fetch thông tin người dùng
  useEffect(() => {
    getInfo()
      .then((res) => {
        setUserInfo(res.Data);
      })
      .catch((error) => {
        toast.error(
          locale === 'vi'
            ? 'Không thể tải thông tin tài khoản'
            : 'Unable to load account info'
        );
      });
  }, [locale]);

  // Object chứa các chuỗi dịch cho TopupInfo
  const translations = {
    en: {
      instructions: [
        "Please transfer with the exact content to get your funds credited as soon as possible.",
        "If your account is not credited after 10 minutes, please contact Admin for support.",
        "Please do not top-up using another bank through this bank (to avoid errors).",
        "Incorrect account number, bank, or transfer content will incur a 20% transaction fee.",
        "Click the account number or content to copy the exact transfer information."
      ],
      bankAccountLabel: "Bank Account:",
      accountOwnerLabel: "Account Owner:",
      contentLabel: "CONTENT: (MANDATORY: COPY EXACTLY THE CONTENT BELOW)"
    },
    vi: {
      instructions: [
        "Bạn vui lòng chuyển khoản chính xác nội dung để được cộng tiền nhanh nhất.",
        "Nếu sau 10 phút tài khoản chưa được cộng tiền vui lòng liên hệ Admin để được hỗ trợ.",
        "Vui lòng không nạp từ bank khác qua bank này (tránh lỗi).",
        "Nạp sai số tài khoản, sai ngân hàng, sai nội dung sẽ bị trừ 20% phí giao dịch.",
        "Bấm vào số tài khoản hoặc nội dung để sao chép nội dung thông tin chuyển tiền một cách chuẩn nhất."
      ],
      bankAccountLabel: "Số tài khoản:",
      accountOwnerLabel: "Chủ tài khoản:",
      contentLabel: "NỘI DUNG: (BẮT BUỘC GHI ĐÚNG NỘI DUNG DƯỚI ĐÂY)"
    }
  };

  const currentTranslations = translations[locale];

  return (
    <Card className="flex flex-col mt-4">
      <CardContent className="w-full rounded-lg p-4 py-2 mb-2">
        {/* Phần hướng dẫn */}
        <div className="bg-[#F5BEBE] p-4 rounded-lg">
          <ul className="space-y-2 text-[#D82222] text-sm font-semibold font-sans">
            {currentTranslations.instructions.map((text, index) => (
              <li key={index}>- {text}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center mt-6">
          <div className="border rounded-lg w-full text-center grid gap-4 p-4 md:p-[56px] md:grid-cols-2">
            <div className="flex flex-col justify-center text-center md:text-left">
              <p className="text-sm font-semibold">
                {currentTranslations.bankAccountLabel}{' '}
                <span className="font-bold">0451000399584</span>
              </p>
              <p className="text-sm font-semibold">
                {currentTranslations.accountOwnerLabel}{' '}
                <span className="font-bold">NGUYEN DUC THUAN</span>
              </p>
              <div className="mt-6">
                <div className="bg-[#5B7CFD] text-white text-center text-sm font-bold py-2 rounded-t-lg">
                  {currentTranslations.contentLabel}
                </div>
                <div className="bg-[#EEF3FF] text-[#5B7CFD] text-center text-lg font-bold py-4 rounded-b-lg">
                  {userInfo?.username}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <img
                  src="/qr-topup.jpg"
                  alt="QR Code Bank"
                  className="w-full max-w-[400px] md:max-w-[300px] h-auto object-contain"
                />
                <img
                  src="/qr-momo.jpg"
                  alt="QR Code Momo"
                  className="w-full max-w-[400px] md:max-w-[300px] h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
