import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OverViewPage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Số dư hiện tại</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tổng đã tiêu</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tổng đã nạp</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Thành viên</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
