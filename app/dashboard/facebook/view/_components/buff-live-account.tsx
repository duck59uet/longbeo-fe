'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BuyServiceForm from './buy-service';
import BuffOrderHistoryTable from './order-buff-history';

export default function BuffLiveAccountPage() {
  // const totalUsers = data.total_users;
  // const employee: Employee[] = data.users;

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="grid gap-4">
          <Card>
            <CardContent>
              <div className="space-y-4 mt-4">
                <Tabs defaultValue="buy-service" className="space-y-4">
                  <TabsList className="w-full h-10 flex flex justify-between">
                    <TabsTrigger
                      value="buy-service"
                      className="text-xl font-sans flex-1 bg-transparent border-none"
                    >
                      Mua dịch vụ
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="text-xl font-sans flex-1 bg-transparent border-none"
                    >
                      Lịch sử đơn
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="buy-service" className="space-y-4">
                    <div className="grid gap-4">
                      <Card className="mt-4 flex-1">
                        <CardContent>
                          <BuyServiceForm />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="history" className="space-y-4">
                    <div className="grid gap-4">
                      <Card className="">
                        <CardContent>
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