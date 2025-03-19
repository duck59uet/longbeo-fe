'use client';

import { useEffect, useState } from 'react';
import { getOrder } from '@/services/order';
import { DataTable as OrderTable } from '@/components/ui/table/data-table';
import PageContainer from '@/components/layout/page-container';
import { getColumns } from './columns';

export default function BuffOrderHistoryTable() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [locale, setLocale] = useState<'en' | 'vi'>('vi');

  useEffect(() => {
    const storedLocale = sessionStorage.getItem('locale');
    if (storedLocale === 'en' || storedLocale === 'vi') {
      setLocale(storedLocale);
    } else {
      sessionStorage.setItem('locale', 'vi');
      setLocale('vi');
    }
  }, []);

  const columns = getColumns(locale);

  const fetchData = async (page: any, limit: any) => {
    try {
      const result = await getOrder({ categoryId: 3, page, limit });
      setData(result.Data[1]);
      setTotalItems(result.total[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(page, limit);
  }, [page, limit]);

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: any) => {
    setLimit(newLimit);
  };

  // console.log(data);
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <OrderTable
          columns={columns}
          data={data}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </div>
    </PageContainer>
  );
}
