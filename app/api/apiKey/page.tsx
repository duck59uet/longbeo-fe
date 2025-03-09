import DashboardLayout from '@/app/wrapperLayout';
import OverViewPage from './_components/overview';

export const metadata = {
  title: 'API key'
};

export default function page() {
  return (
    <DashboardLayout>
      <OverViewPage />
    </DashboardLayout>
  );
}
