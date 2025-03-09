'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface SignUpButtonProps {
  toggleForm: () => void;
  locale: 'en' | 'vi';
}

const texts: any = {
  vi: {
    signUp: 'Đăng ký tài khoản'
  },
  en: {
    signUp: 'Sign up'
  }
};

export default function SignUpButton({ toggleForm, locale }: SignUpButtonProps) {

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
