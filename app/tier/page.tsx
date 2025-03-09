import DashboardLayout from '../wrapperLayout';
import OverViewPage from './_components/overview';

export const metadata = {
  title: 'Cấp bậc tài khoản'
};

export default function page() {
  return (
    <DashboardLayout>
      <OverViewPage />
    </DashboardLayout>
  );
}
