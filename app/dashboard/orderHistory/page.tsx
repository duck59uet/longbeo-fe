import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';
import OrderHistoryPage from './_components/order-history-page';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Lịch sử đơn hàng'
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <OrderHistoryPage />;
}
