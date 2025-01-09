"use client";

import { getBalanceInfo } from '@/services/myaccount';
import { Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function BalanceInfo() {
  const [balance, setBalance] = useState(0);
  const [topup, setTopup] = useState(0);
  const [orderSpent, setOrderSpent] = useState(0);

  useEffect(() => {
    async function fetchBalanceInfo() {
      try {
        const data = await getBalanceInfo();
        setBalance(data.Data.balance);
        setTopup(data.Data.topup);
        setOrderSpent(data.Data.order);
      } catch (error) {
        toast.error('Không thể tải thông tin số dư. Vui lòng thử lại sau.');
      }
    }

    fetchBalanceInfo();
  }, []);

  return (
    <div className="space-y-8 mt-4">
      <div className="flex items-center">
        <div className="ml-4 space-y-1 flex items-center">
          <Wallet className="mr-2"/>
          <p className="text-sm font-medium leading-none font-2xl">Đã nạp</p>
        </div>
        <div className="ml-auto font-medium">{topup}</div>
      </div>
      <div className="flex items-center ">
        <div className="ml-4 space-y-1 flex items-center">
          <Wallet className="mr-2" />
          <p className="text-sm font-medium leading-none">Số dư</p>
        </div>
        <div className="ml-auto font-medium">{balance}</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1 flex items-center">
          <Wallet className="mr-2" />
          <p className="text-sm font-medium leading-none">Đã tiêu</p>
        </div>
        <div className="ml-auto font-medium">{orderSpent}</div>
      </div>
    </div>
  );
}
