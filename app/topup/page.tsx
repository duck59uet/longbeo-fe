import React from 'react';
import TopupPage from './_components/profile-create-form';
import DashboardLayout from '../wrapperLayout';


export const metadata = {
  title: 'Nạp tiền tài khoản'
};

export default async function Page() {
  return (
    <DashboardLayout>
      <TopupPage />
    </DashboardLayout>
  );
}
