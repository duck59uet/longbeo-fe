import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = localStorage.getItem('accessToken');

  if (!session) {
    return redirect('/');
  } else {
    redirect('/dashboard/overview');
  }
}
