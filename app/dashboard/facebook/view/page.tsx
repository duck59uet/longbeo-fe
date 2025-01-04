import { SearchParams } from 'nuqs/parsers';
import BuffLiveAccountPage from './_components/buff-live-account';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Tăng mắt facebook'
};

export default async function Page({ searchParams }: pageProps) {
  return <BuffLiveAccountPage />;
}
