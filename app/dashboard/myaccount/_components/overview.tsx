import PageContainer from '@/components/layout/page-container';
import { RecentSales } from './recent-sales';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function OverViewPage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="w-full">
            <TabsTrigger value="overview">Thông tin</TabsTrigger>
            <TabsTrigger value="analytics">Thay đổi mật khẩu</TabsTrigger>
            <TabsTrigger value="sales">Cấu hình tài khoản</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Tài chính</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Tài chính</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}