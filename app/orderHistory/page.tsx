import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';
import OrderHistoryPage from './_components/order-history-page';
import DashboardLayout from '../wrapperLayout';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Lịch sử đơn hàng'
};

export default async function Page() {

  return (
    <DashboardLayout>
      <OrderHistoryPage />
    </DashboardLayout>
  );
}
