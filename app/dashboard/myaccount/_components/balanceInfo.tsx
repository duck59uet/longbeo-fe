'use client';

import { getBalanceInfo } from '@/services/myaccount';
import { Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import translations from '@/public/locales/translations.json';

export function BalanceInfo() {
  const [balance, setBalance] = useState(0);
  const [topup, setTopup] = useState(0);
  const [orderSpent, setOrderSpent] = useState(0);
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

  // Fetch số dư từ API
  useEffect(() => {
    async function fetchBalanceInfo() {
      try {
        const data = await getBalanceInfo();
        setBalance(data.Data.balance);
        setTopup(data.Data.topup);
        setOrderSpent(data.Data.order);
      } catch (error) {
        toast.error(
          locale === 'vi'
            ? 'Không thể tải thông tin số dư. Vui lòng thử lại sau.'
            : 'Unable to load balance info. Please try again later.'
        );
      }
    }
    fetchBalanceInfo();
  }, [locale]);

  // Lấy chuỗi dịch cho balance. Nếu không có, dùng fallback.
  const balanceTranslations =
    translations[locale].balance || {
      topup: locale === 'en' ? 'Top-up' : 'Đã nạp',
      balance: locale === 'en' ? 'Balance' : 'Số dư',
      orderSpent: locale === 'en' ? 'Spent' : 'Đã tiêu'
    };

  return (
    <div className="space-y-8 mt-4">
      <div className="flex items-center">
        <div className="ml-4 space-y-1 flex items-center">
          <Wallet className="mr-2" />
          <p className="text-sm font-medium leading-none text-2xl">
            {balanceTranslations.topup}
          </p>
        </div>
        <div className="ml-auto font-medium">{topup}</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1 flex items-center">
          <Wallet className="mr-2" />
          <p className="text-sm font-medium leading-none">
            {balanceTranslations.balance}
          </p>
        </div>
        <div className="ml-auto font-medium">{balance}</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1 flex items-center">
          <Wallet className="mr-2" />
          <p className="text-sm font-medium leading-none">
            {balanceTranslations.orderSpent}
          </p>
        </div>
        <div className="ml-auto font-medium">{orderSpent}</div>
      </div>
    </div>
  );
}
