import { Metadata } from 'next';
import SignInViewPage from './_components/sigin-view';

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập'
};

export default function Page() {
  return <SignInViewPage />;
}
