'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface SignUpButtonProps {
  toggleForm: () => void;
}

const texts: any = {
  vi: {
    signUp: 'Đăng ký tài khoản'
  },
  en: {
    signUp: 'Sign up'
  }
};

export default function SignUpButton({ toggleForm }: SignUpButtonProps) {
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
      {texts[locale].signUp}
    </Button>
  );
}
