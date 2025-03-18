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
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { signUpUser } from '@/services/signup';
import SignInButton from './signin-button';
import { TermsModal } from './term-modal';


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
    failure: 'Registration failed. Please try again later.',
    terms: 'I agree to the',
    termsLink: 'terms of service',
    termsRequired: 'You must agree to the terms of service'
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
    failure: 'Đăng ký thất bại. Vui lòng thử lại sau.',
    terms: 'Tôi đồng ý với',
    termsLink: 'điều khoản dịch vụ',
    termsRequired: 'Bạn phải đồng ý với điều khoản dịch vụ'
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
  referUser: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'Bạn phải đồng ý với điều khoản dịch vụ'
  })
});

type UserFormValue = z.infer<typeof formSchema>;

interface UserAuthFormProps {
  toggleForm: () => void;
  locale: 'en' | 'vi';
}

export default function SignUpForm({ toggleForm, locale }: UserAuthFormProps) {
  const [loading, startTransition] = useTransition();
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  
  const defaultValues = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    phone: '',
    referUser: '',
    agreeToTerms: false
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
        toast.success(translations[locale].success);
        window.location.href = '/';
      } else {
        toast.error(translations[locale].failure);
      }
    });
  };

  const openTermsModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTermsModalOpen(true);
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
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal">
                    {translations[locale].terms}{' '}
                    <a 
                      href="#" 
                      onClick={openTermsModal}
                      className="underline text-blue-600 hover:text-blue-800"
                    >
                      {translations[locale].termsLink}
                    </a>
                  </FormLabel>
                  <FormMessage />
                </div>
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
      
      {/* Modal Điều khoản dịch vụ */}
      <TermsModal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)} 
        locale={locale}
      />
    </>
  );
}
