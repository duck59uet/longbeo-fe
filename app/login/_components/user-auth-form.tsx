'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import SignUpButton from './signup-button';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  username: z.string({ description: 'Hãy nhập tên tài khoản' }),
  password: z.string({ description: 'Hãy nhập mật khẩu' })
});

const translations: any = {
  en: {
    username: 'Username',
    password: 'Password',
    rememberMe: 'Remember me',
    login: 'Login',
    incorrectCredentials: 'Incorrect username or password',
    loginFailed: 'Login failed. Please try again later.',
    or: 'or'
  },
  vi: {
    username: 'Tên tài khoản',
    password: 'Mật khẩu',
    rememberMe: 'Ghi nhớ tài khoản',
    login: 'Đăng nhập',
    incorrectCredentials: 'Tên tài khoản hoặc mật khẩu không đúng',
    loginFailed: 'Đăng nhập thất bại. Vui lòng thử lại sau.',
    or: 'hoặc'
  }
};

type UserFormValue = z.infer<typeof formSchema>;

interface UserAuthFormProps {
  toggleForm: () => void;
  locale: 'en' | 'vi';
}

export default function UserAuthForm({ toggleForm, locale }: UserAuthFormProps) {
  const searchParams = useSearchParams();
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    username: '',
    password: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          username: data.username,
          password: data.password,
          callbackUrl: callbackUrl ?? '/overview'
        });

        if (result?.ok) {
          window.location.href = result.url || '/overview';
        } else {
          toast.error(translations[locale].incorrectCredentials);
        }
      } catch (error) {
        toast.error(translations[locale].loginFailed);
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sans">{translations[locale].username}</FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    placeholder={translations[locale].username}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sans">{translations[locale].password}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={translations[locale].password}
                    autoComplete="current-password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMeChecked}
              onCheckedChange={(checked) => setRememberMeChecked(checked === true)}
              disabled={loading}
            />
            <label htmlFor="rememberMe" className="font-sans">
              {translations[locale].rememberMe}
            </label>
          </div>
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            {translations[locale].login}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">{translations[locale].or}</span>
        </div>
      </div>
      <SignUpButton toggleForm={toggleForm} locale={locale}/>
    </>
  );
}
