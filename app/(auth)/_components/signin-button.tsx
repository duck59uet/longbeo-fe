'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface SignInButtonProps {
  toggleForm: () => void;
}

const texts: any = {
  vi: {
    signIn: 'Đăng nhập tài khoản'
  },
  en: {
    signIn: 'Sign In'
  }
};

export default function SignInButton({ toggleForm }: SignInButtonProps) {
  const [localeLoaded, setLocaleLoaded] = useState(false);

  const [locale, setLocale] = useState<'en' | 'vi'>('vi');
  useEffect(() => {
    const storedLocale = sessionStorage.getItem('locale');
    if (storedLocale === 'en' || storedLocale === 'vi') {
      setLocale(storedLocale);
    } else {
      sessionStorage.setItem('locale', 'vi');
      setLocale('vi');
    }
    setLocaleLoaded(true);
  }, []);

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() => toggleForm()}
    >
      {texts[locale].signIn}
    </Button>
  );
}
