'use client';

import { useEffect, useState } from 'react';
import BuffHistoryTable from './buff-history-table';
import { getOrder } from '@/services/order';

export default function BuffOrderHistoryTable() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getOrder('1, 2, 3, 4, 5');
        setData(result.Data);
      } catch (error) {
        console.error('Error fetching top-up history:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <BuffHistoryTable data={data} />
    </div>
  );
}
