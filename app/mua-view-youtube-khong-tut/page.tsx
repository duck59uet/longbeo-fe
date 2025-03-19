import DashboardLayout from '@/app/wrapperLayout';
import BuffLiveAccountPage from './_components/buff-live-account';

export const metadata = {
  title: 'Tăng view youtube'
};

export default async function Page() {
  return (
    <DashboardLayout>
      <BuffLiveAccountPage />
    </DashboardLayout>
  );
}
