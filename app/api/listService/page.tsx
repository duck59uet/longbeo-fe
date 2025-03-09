import DashboardLayout from '@/app/wrapperLayout';
import OverViewPage from './_components/overview';

export const metadata = {
  title: 'Danh sách service'
};

export default function page() {
  return (
    <DashboardLayout>
      <OverViewPage />
    </DashboardLayout>
  );
}
