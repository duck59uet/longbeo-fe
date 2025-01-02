'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface SignUpButtonProps {
  toggleForm: () => void;
}

export default function SignUpButton({ toggleForm }: SignUpButtonProps) {

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() =>
       toggleForm()
      }
    >
      Đăng ký tài khoản
    </Button>
  );
}