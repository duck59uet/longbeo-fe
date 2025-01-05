'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopupInfo } from './topup-info';
import { useEffect, useState } from 'react';
import { getTopupHistory } from '@/services/myaccount';
import TopupTable from './topup-table';

const TopupPage: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getTopupHistory({ pageSize: 100, pageIndex: 1 });
        setData(result.Data[1]);
      } catch (error) {
        console.error('Error fetching top-up history:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight font-sans">
          Nạp tiền tài khoản
        </h2>
      </div>
      <div className="w-full">
        <TopupInfo />
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Lịch sử nạp tiền</CardTitle>
          </CardHeader>
          <CardContent>
            <TopupTable data={data}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TopupPage;
