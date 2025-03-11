'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BuyServiceForm from './buy-service';
import BuffOrderHistoryTable from './order-buff-history';
import { useEffect, useState } from 'react';
import translations from '@/public/locales/translations.json';
import { Heading } from '@/components/ui/heading';
import ArticleInfo from './articleInfo';
import ThankYouMessage from '@/components/thankyou-panel';

export default function BuffLiveAccountPage() {
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

  return (
    <PageContainer scrollable>
      <Heading title="Tăng mắt view video facebook" description="" />
      <div className="space-y-2 mt-2">
        <div className="grid gap-4">
          <Card>
            <CardContent>
              <div className="space-y-4 mt-4">
                <Tabs defaultValue="buy-service" className="space-y-4">
                  <TabsList className="w-full h-10 flex flex justify-between bg-[#ECF2FF]">
                    <TabsTrigger
                      value="buy-service"
                      className="text-xl font-sans flex-1 bg-transparent border-none"
                    >
                      {translations[locale].common.newOrder}
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="text-xl font-sans flex-1 bg-transparent border-none"
                    >
                      {translations[locale].common.orderHistory}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="buy-service" className="space-y-4">
                    <div className="grid gap-4">
                      <Card className="mt-4 flex-1">
                        <CardContent>
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <BuyServiceForm />
                            </div>
                            <div className="w-[300px] h-full">
                              <ThankYouMessage />
                            </div>
                          </div>
                          <div className="mt-4">
                            <ArticleInfo />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="history" className="space-y-4">
                    <div className="grid gap-4">
                      <Card className="">
                        <CardContent className="p-0">
                          <BuffOrderHistoryTable />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
