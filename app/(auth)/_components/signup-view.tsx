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
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { signUpUser } from '@/services/signup';
import SignInButton from './signin-button';

const formSchema = z.object({
  username: z.string({ message: 'Hãy nhập tên tài khoản' }),
  fullname: z.string({ message: 'Hãy nhập họ và tên' }),
  email: z.string().email({ message: 'Hãy nhập email hợp lệ' }),
  password: z.string({ message: 'Hãy nhập mật khẩu' })
});

type UserFormValue = z.infer<typeof formSchema>;

interface UserAuthFormProps {
  toggleForm: () => void;
}

export default function SignUpForm({ toggleForm }: UserAuthFormProps) {
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    username: '',
    fullname: '',
    email: '',
    password: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      const user = await signUpUser({
        userName: data.username,
        fullName: data.fullname,
        email: data.email,
        password: data.password
      });

      if (user) {
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
                <FormLabel>Tên tài khoản</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Tên tài khoản" {...field} />
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
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Họ và tên" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
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
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Mật khẩu" {...field} />
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
            Đăng ký
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">hoặc</span>
        </div>
      </div>
      <SignInButton toggleForm={toggleForm} />
    </>
  );
}
