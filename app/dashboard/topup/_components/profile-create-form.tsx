'use client';

import { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopupInfo } from './topup-info';
import TopupHistoryTable from './topup-history';

const TopupPage: React.FC = () => {
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

  const translations = {
    en: {
      topupPage: {
        topupAccount: "Top-up Account",
        topupHistory: "Top-up History"
      }
    },
    vi: {
      topupPage: {
        topupAccount: "Nạp tiền tài khoản",
        topupHistory: "Lịch sử nạp tiền"
      }
    }
  };

  const currentTranslations = translations[locale].topupPage;

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight font-sans">
            {currentTranslations.topupAccount}
          </h2>
        </div>
        <div className="w-full">
          <TopupInfo />
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>{currentTranslations.topupHistory}</CardTitle>
            </CardHeader>
            <CardContent>
              <TopupHistoryTable />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default TopupPage;
