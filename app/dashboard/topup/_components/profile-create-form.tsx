'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopupInfo } from './topup-info';

interface ProfileFormType {
  initialData: any | null;
  categories: any;
}
const ProfileCreateForm: React.FC<ProfileFormType> = () => {

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight font-sans">
            Nạp tiền tài khoản
          </h2>
        </div>
        <div className="w-full">
          <TopupInfo />
          <Card className='mt-4'>
            <CardHeader>
              <CardTitle>Lịch sử nạp tiền</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProfileCreateForm;
