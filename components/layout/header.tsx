'use client';

import React, { useEffect, useState } from 'react';
import { UserNav } from './user-nav';
import { SidebarTrigger } from '../ui/sidebar';
import LanguageToggle from './LanguageToggle/language-toggle';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import translations from '@/public/locales/translations.json';

export default function Header() {
  const { data: session } = useSession();
  const [locale, setLocale] = useState<'en' | 'vi'>('vi');

  useEffect(() => {
    const storedLocale = sessionStorage.getItem('locale');
    if (storedLocale === 'en' || storedLocale === 'vi') {
      setLocale(storedLocale);
    } else {
      // Nếu không có, mặc định là 'vi'
      setLocale('vi');
    }
  }, []);
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="flex items-center gap-2 px-4">
        <UserNav />
        <LanguageToggle />
        {!session?.user && (
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {translations[locale].common.login}
          </Link>
        )}
      </div>
    </header>
  );
}
