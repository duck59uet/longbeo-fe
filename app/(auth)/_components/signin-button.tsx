'use client';

import { Button } from '@/components/ui/button';

interface SignInButtonProps {
  toggleForm: () => void;
}

export default function SignInButton({ toggleForm }: SignInButtonProps) {

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() =>
       toggleForm()
      }
    >
      Đăng nhập tài khoản
    </Button>
  );
}