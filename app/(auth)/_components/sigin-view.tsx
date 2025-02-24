'use client';

import { useEffect, useState } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import UserAuthForm from './user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SignUpForm from './signup-view';

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập'
};

export default function SignInViewPage() {
  const [isSignUp, setIsSignUp] = useState(true);
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

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'vi' ? 'en' : 'vi';
    setLocale(newLocale);
    sessionStorage.setItem('locale', newLocale);
  };

  const texts: any = {
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
      <div className="absolute right-4 top-4 flex space-x-2 md:right-8 md:top-8">
        <button
          onClick={toggleLanguage}
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          {texts[locale].switchLang}
        </button>
        <Link
          href="/examples/authentication"
          className={cn(buttonVariants({ variant: 'ghost' }))}
        >
          {texts[locale].login}
        </Link>
      </div>
      <div className="relative hidden h-full flex-col bg-[#FFFFF] items-center justify-center text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-[#FFFFF]" />
        <div className="relative z-20 flex items-center justify-center text-lg font-medium">
          <Image
            src="/logo.png"
            alt="Dịch Vụ Mắt"
            width={400}
            height={400}
            className="mx-auto"
          />
        </div>
      </div>
      {isSignUp ? (
        <>
          <div className="flex h-full items-center p-4 lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="font-sans text-2xl font-semibold tracking-tight">
                  {texts[locale].signIn}
                </h1>
                <p className="font-sans text-sm text-muted-foreground">
                  {texts[locale].fillInfo}
                </p>
              </div>
              <UserAuthForm toggleForm={toggleForm} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex h-full items-center p-4 lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[370px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="font-sans text-2xl font-semibold tracking-tight">
                  {texts[locale].signUp}
                </h1>
                <p className="font-sans text-sm text-muted-foreground">
                  {texts[locale].fillInfo}
                </p>
              </div>
              <SignUpForm toggleForm={toggleForm} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
