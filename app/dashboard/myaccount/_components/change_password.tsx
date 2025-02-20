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
import { changePassword } from '@/services/myaccount';
import { toast } from 'sonner';

// Object chứa bản dịch cho Change Password Form
const translations = {
  en: {
    form: {
      oldPassword: "Old Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      update: "Change Password"
    },
    toast: {
      updateSuccess: "Password updated successfully",
      updateError: "Failed to update password"
    }
  },
  vi: {
    form: {
      oldPassword: "Mật khẩu cũ",
      newPassword: "Mật khẩu mới",
      confirmPassword: "Nhập lại mật khẩu mới",
      update: "Thay đổi mật khẩu"
    },
    toast: {
      updateSuccess: "Cập nhật mật khẩu thành công",
      updateError: "Cập nhật mật khẩu thất bại"
    }
  }
};

// Schema xác thực (validation messages được định nghĩa cố định)
const formSchema = z
  .object({
    oldPassword: z.string({
      required_error: 'Hãy nhập mật khẩu cũ.'
    }),
    newPassword: z.string({
      required_error: 'Hãy nhập mật khẩu mới.'
    }),
    confirmPassword: z.string({
      required_error: 'Hãy nhập lại mật khẩu mới.'
    })
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Mật khẩu không trùng khớp.'
  });

type UserFormValue = z.infer<typeof formSchema>;

export default function ChangePasswordForm() {
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

  const currentTranslations = translations[locale];

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  async function onSubmit(values: UserFormValue) {
    try {
      const response = await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword || ''
      });
      if (response.ErrorCode === 'SUCCESSFUL') {
        toast.success(currentTranslations.toast.updateSuccess);
        form.reset();
      } else {
        toast.error(currentTranslations.toast.updateError);
      }
    } catch (error) {
      toast.error(currentTranslations.toast.updateError);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-4">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{currentTranslations.form.oldPassword}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={currentTranslations.form.oldPassword}
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{currentTranslations.form.newPassword}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={currentTranslations.form.newPassword}
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{currentTranslations.form.confirmPassword}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={currentTranslations.form.confirmPassword}
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {currentTranslations.form.update}
        </Button>
      </form>
    </Form>
  );
}
