'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserForm from './userForm';
import { BalanceInfo } from './balanceInfo';
import ChangePasswordForm from './change_password';
import { useEffect, useState } from 'react';
import translations from '@/public/locales/translations.json';

export default function OverViewPage() {
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

  const ovPage = translations[locale].overviewPage;

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="w-full h-10 flex">
            <TabsTrigger value="overview" className="text-xl font-sans flex-1">
              {ovPage.tabs.info}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xl font-sans flex-1">
              {ovPage.tabs.changePassword}
            </TabsTrigger>
            <TabsTrigger value="sales" className="text-xl font-sans flex-1">
              {ovPage.tabs.accountConfig}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader className="border-b-[1px] border-black">
                  <CardTitle>{ovPage.card.userInfo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <UserForm />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader className="border-b-[1px] border-black">
                  <CardTitle>{ovPage.card.balance}</CardTitle>
                </CardHeader>
                <CardContent>
                  <BalanceInfo />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader className="border-b-[1px] border-black">
                  <CardTitle>{ovPage.card.changePassword}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChangePasswordForm />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="sales" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader className="border-b-[1px] border-black">
                  <CardTitle>{ovPage.card.changePassword}</CardTitle>
                </CardHeader>
                <CardContent>
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>{ovPage.card.balance}</CardTitle>
                </CardHeader>
                <CardContent>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
