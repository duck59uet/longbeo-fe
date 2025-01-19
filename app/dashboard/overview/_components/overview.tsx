'use client';

import PageContainer from '@/components/layout/page-container';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBalanceInfo } from '@/services/myaccount';
import { toast } from 'sonner';

export default function OverViewPage() {
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

    const interval = setInterval(fetchBalanceInfo, 15000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Số dư hiện tại</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-500">{balance} đ</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tổng đã tiêu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-500">{orderSpent} đ</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tổng đã nạp</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-500">{topup} đ</p>
            </CardContent>
          </Card>
          
          {/* Thành viên */}
          <Card>
            <CardHeader>
              <CardTitle>Thành viên</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-500">Cấp bậc</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
