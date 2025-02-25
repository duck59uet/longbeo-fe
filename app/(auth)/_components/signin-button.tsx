'use client';

import { Button } from '@/components/ui/button';

interface SignInButtonProps {
  toggleForm: () => void;
  locale: 'en' | 'vi';
}

const texts: any = {
  vi: {
    signIn: 'Đăng nhập tài khoản'
  },
  en: {
    signIn: 'Sign In'
  }
};

export default function SignInButton({ toggleForm, locale }: SignInButtonProps) {

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
