import DashboardLayout from '../wrapperLayout';
import OverViewPage from './_components/overview';

export const metadata = {
  title: 'Tài khoản của tôi'
};

export default function page() {
  return (
    <DashboardLayout>
      <OverViewPage />
    </DashboardLayout>
  );
}
