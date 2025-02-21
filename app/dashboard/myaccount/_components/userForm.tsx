'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
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
import { getInfo, updateInfo } from '@/services/myaccount';
import { toast } from 'sonner';

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  username: z.string({ required_error: 'Please select a country.' }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  createdAt: z.string().optional(),
  avatar: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
});

type UserFormValue = z.infer<typeof formSchema>;

// Object chứa các bản dịch cho tiếng Anh và tiếng Việt
const translations = {
  en: {
    form: {
      fullname: "Full name",
      email: "Email",
      username: "Username",
      level: "Level",
      createdAt: "Joined at",
      avatar: "Avatar URL",
      facebook: "Facebook link",
      update: "Update Info"
    },
    toast: {
      updateSuccess: "User info updated successfully",
      updateError: "Failed to update user info"
    }
  },
  vi: {
    form: {
      fullname: "Họ và tên",
      email: "Email",
      username: "Tài khoản",
      level: "Cấp độ",
      createdAt: "Thời gian tham gia",
      avatar: "Link ảnh đại diện",
      facebook: "Link facebook",
      update: "Cập nhật thông tin"
    },
    toast: {
      updateSuccess: "Cập nhật thông tin thành công",
      updateError: "Cập nhật thông tin thất bại"
    }
  }
};

export default function UserForm() {
  const [loading, setLoading] = React.useState(true);
  const [userInfo, setUserInfo] = React.useState<UserFormValue | null>(null);
  
  // Lấy ngôn ngữ từ sessionStorage, mặc định là 'vi'
  const [locale, setLocale] = React.useState<'en' | 'vi'>('vi');
  React.useEffect(() => {
    const storedLocale = sessionStorage.getItem('locale');
    if (storedLocale === 'en' || storedLocale === 'vi') {
      setLocale(storedLocale);
    } else {
      sessionStorage.setItem('locale', 'vi');
      setLocale('vi');
    }
  }, []);

  // Alias để truy cập dễ các chuỗi dịch
  const currentTranslations = translations[locale];

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      avatar: '',
      facebook: ''
    }
  });

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getInfo();
        setUserInfo(response.Data);
        form.reset(response.Data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [form]);

  async function onSubmit(values: UserFormValue) {
    try {
      const response = await updateInfo({
        fullname: values.fullname,
        avatar: values.avatar || '',
        facebook: values.facebook || ''
      });
      if (response.ErrorCode === 'SUCCESSFUL') {
        toast.success(currentTranslations.toast.updateSuccess);
      } else {
        toast.error(currentTranslations.toast.updateError);
      }
    } catch (error) {
      toast.error(currentTranslations.toast.updateError);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{currentTranslations.form.fullname}</FormLabel>
                <FormControl>
                  <Input placeholder={currentTranslations.form.fullname} {...field} />
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
                <FormLabel>{currentTranslations.form.email}</FormLabel>
                <FormControl>
                  <Input disabled type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{currentTranslations.form.username}</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{currentTranslations.form.createdAt}</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{currentTranslations.form.avatar}</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{currentTranslations.form.facebook}</FormLabel>
              <FormControl>
                <Input placeholder={currentTranslations.form.facebook} {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{currentTranslations.form.update}</Button>
      </form>
    </Form>
  );
}
