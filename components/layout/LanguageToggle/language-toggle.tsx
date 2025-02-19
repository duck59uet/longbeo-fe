'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import translations from '@/public/locales/translations.json';

type Locale = 'en' | 'vi';

export default function LanguageToggle() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('vi');

  useEffect(() => {
    const storedLocale = sessionStorage.getItem('locale') as Locale | null;
    if (storedLocale && (storedLocale === 'en' || storedLocale === 'vi')) {
      setCurrentLocale(storedLocale);
    } else {
      sessionStorage.setItem('locale', 'vi');
    }
  }, []);

  const handleLanguageChange = (locale: Locale) => {
    sessionStorage.setItem('locale', locale);
    setCurrentLocale(locale);
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {currentLocale.toUpperCase()}
          <span className="sr-only">
            {translations[currentLocale].common.toggle_language}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
          <span className="mr-2">EN</span> {translations.en.common.english}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('vi')}>
          <span className="mr-2">VI</span> {translations.vi.common.vietnamese}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
