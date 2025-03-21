import DashboardLayout from '@/app/wrapperLayout';
import BuffLiveAccountPage from './_components/buff-live-account';

export const metadata = {
  title: 'Tăng mắt instagram'
};

export default async function Page() {
  return (
    <DashboardLayout>
      <BuffLiveAccountPage />
    </DashboardLayout>
  );
}
