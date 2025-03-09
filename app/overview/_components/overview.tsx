'use client';

import PageContainer from '@/components/layout/page-container';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBalanceInfo } from '@/services/myaccount';
import { toast } from 'sonner';
import translations from '@/public/locales/translations.json';

export default function OverViewPage() {
  const [balance, setBalance] = useState(0);
  const [topup, setTopup] = useState(0);
  const [orderSpent, setOrderSpent] = useState(0);
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

  useEffect(() => {
    async function fetchBalanceInfo() {
      try {
        const data = await getBalanceInfo();
        setBalance(data.Data.balance);
        setTopup(data.Data.topup);
        setOrderSpent(data.Data.order);
      } catch (error) {
        toast.error(translations[locale].common.errorOccurred);
      }
    }

    fetchBalanceInfo();

    const interval = setInterval(fetchBalanceInfo, 15000);

    return () => clearInterval(interval);
  }, [locale]);

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            {translations[locale].common.greeting}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>{translations[locale].common.balance}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-500">
                {locale === 'en'
                  ? (balance / 26000).toFixed(2) + ' $'
                  : balance + ' đ'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{translations[locale].common.totalSpent}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-500">
                {locale === 'en'
                  ? (orderSpent / 26000).toFixed(2) + ' $'
                  : orderSpent + ' đ'}{' '}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{translations[locale].common.totalTopup}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-500">
                {locale === 'en'
                  ? (topup / 26000).toFixed(2) + ' $'
                  : topup + ' đ'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {translations[locale].common.memberShipLevel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-500">
                {translations[locale].common.member}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
