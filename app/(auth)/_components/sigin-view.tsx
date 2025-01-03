'use client';

import { useState } from 'react';
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

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Đăng nhập
      </Link>
      <div className="relative hidden h-full flex-col bg-muted items-center justify-center text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center justify-center text-lg font-medium">
          <Image
            src="/dichvumat.png"
            alt="Dịch Vụ Mắt"
            width={400} // Phóng to hình ảnh
            height={400} // Phóng to hình ảnh
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
                  Đăng Nhập Tài Khoản
                </h1>
                <p className="font-sans text-sm text-muted-foreground">
                  Xin Mời Bạn Điền Thông Tin Vào Bên Dưới.
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
                  Đăng Ký Tài Khoản
                </h1>
                <p className="font-sans text-sm text-muted-foreground">
                  Xin Mời Bạn Điền Thông Tin Vào Bên Dưới.
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
