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
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { signUpUser } from '@/services/signup';
import SignInButton from './signin-button';

const translations: any = {
  en: {
    username: 'Username',
    fullname: 'Full name',
    email: 'Email',
    phone: 'Phone number',
    password: 'Password',
    referUser: 'Referrer',
    register: 'Sign Up',
    or: 'or',
    success: 'Registration successful',
    failure: 'Registration failed. Please try again later.'
  },
  vi: {
    username: 'Tên tài khoản',
    fullname: 'Họ và tên',
    email: 'Email',
    phone: 'Số điện thoại',
    password: 'Mật khẩu',
    referUser: 'Người giới thiệu',
    register: 'Đăng ký',
    or: 'hoặc',
    success: 'Đăng ký thành công',
    failure: 'Đăng ký thất bại. Vui lòng thử lại sau.'
  }
};

const formSchema = z.object({
  username: z.string({ description: 'Hãy nhập tên tài khoản' }),
  fullname: z.string({ description: 'Hãy nhập họ và tên' }),
  email: z.string().email({ message: 'Hãy nhập email hợp lệ' }),
  password: z.string({ description: 'Hãy nhập mật khẩu' }),
  phone: z
    .string()
    .regex(/^[0-9]+$/, { message: 'Số điện thoại chỉ được chứa các ký tự số' })
    .nonempty({ message: 'Hãy nhập số điện thoại' }),
  referUser: z.string().optional()
});

type UserFormValue = z.infer<typeof formSchema>;

interface UserAuthFormProps {
  toggleForm: () => void;
  locale: 'en' | 'vi';
}

export default function SignUpForm({ toggleForm, locale }: UserAuthFormProps) {
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    phone: '',
    referUser: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      const user = await signUpUser({
        username: data.username,
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        phone: data.phone,
        referUser: data.referUser
      });

      if (user.ErrorCode === 'SUCCESSFUL') {
        toast.success('Đăng ký thành công');
        window.location.href = '/';
      } else {
        toast.error('Đăng ký thất bại. Vui lòng thử lại sau.');
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
                <FormLabel>{translations[locale].username}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder={translations[locale].username} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations[locale].fullname}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder={translations[locale].fullname} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations[locale].email}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={translations[locale].email} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations[locale].phone}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder={translations[locale].phone} {...field} />
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
                <FormLabel>{translations[locale].password}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={translations[locale].password} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="referUser"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations[locale].referUser}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={translations[locale].referUser}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className="ml-auto w-full mt-[12px]"
            type="submit"
          >
            {translations[locale].register}
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
      <SignInButton toggleForm={toggleForm} locale={locale}/>
    </>
  );
}
