'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import UserAuthForm from './user-auth-form';
import SignUpForm from './signup-view';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SignInViewPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [locale, setLocale] = useState<'en' | 'vi'>('vi');

  // Đồng bộ locale từ sessionStorage
  useEffect(() => {
    const storedLocale = sessionStorage.getItem('locale');
    if (storedLocale === 'en' || storedLocale === 'vi') {
      setLocale(storedLocale);
    } else {
      sessionStorage.setItem('locale', 'vi');
      setLocale('vi');
    }
  }, []);

  // Hàm toggle ngôn ngữ
  const toggleLanguage = () => {
    const newLocale = locale === 'vi' ? 'en' : 'vi';
    sessionStorage.setItem('locale', newLocale);
    setLocale(newLocale);
  };

  // Toggle giữa form đăng nhập và đăng ký
  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const texts = {
    vi: {
      signIn: 'Đăng Nhập Tài Khoản',
      signUp: 'Đăng Ký Tài Khoản',
      fillInfo: 'Xin Mời Bạn Điền Thông Tin Vào Bên Dưới.',
      switchLang: 'English',
      login: 'Đăng nhập'
    },
    en: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      fillInfo: 'Please enter your details below.',
      switchLang: 'Tiếng Việt',
      login: 'Sign In'
    }
  };

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Nút chuyển đổi ngôn ngữ */}
      <div className="absolute right-4 top-4 flex space-x-2 md:right-8 md:top-8">
        <button onClick={toggleLanguage} className={cn(buttonVariants({ variant: 'outline' }))}>
          {texts[locale].switchLang}
        </button>
      </div>

      {/* Logo và nền bên trái */}
      <div className="relative hidden h-full flex-col bg-[#FFFFF] items-center justify-center text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-[#FFFFF]" />
        <div className="relative z-20 flex items-center justify-center text-lg font-medium">
          <Image src="/logo.png" alt="Dịch Vụ Mắt" width={400} height={400} className="mx-auto" />
        </div>
      </div>

      {/* Form đăng nhập hoặc đăng ký */}
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="font-sans text-2xl font-semibold tracking-tight">
              {isSignUp ? texts[locale].signIn : texts[locale].signUp}
            </h1>
            <p className="font-sans text-sm text-muted-foreground">
              {texts[locale].fillInfo}
            </p>
          </div>
          {isSignUp ? (
            <UserAuthForm toggleForm={toggleForm} locale={locale} />
          ) : (
            <SignUpForm toggleForm={toggleForm} locale={locale} />
          )}
        </div>
      </div>
    </div>
  );
}
