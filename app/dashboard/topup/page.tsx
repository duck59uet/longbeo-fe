import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';
import TopupPage from './_components/profile-create-form';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Nạp tiền tài khoản'
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <TopupPage />;
}
