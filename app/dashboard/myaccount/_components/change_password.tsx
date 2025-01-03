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
import { changePassword, getInfo, updateInfo } from '@/services/myaccount';
import { toast } from 'sonner';

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
    path: ['confirmPassword'], // Đường dẫn của lỗi
    message: 'Mật khẩu không trùng khớp.'
  });

export default function ChangePasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword || '',
      });
      if (response.ErrorCode === 'SUCCESSFUL') {
        toast.success('Cập nhật mật khẩu thành công');
        form.reset();
      } else {
        toast.error('Cập nhật mật khẩu thất bại');
      }
    } catch (error) {
      toast.error('Cập nhật mật khẩu thất bại');
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
              <FormLabel>Mật khẩu cũ</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Mật khẩu cũ"
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
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Mật khẩu mới"
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
              <FormLabel>Nhập lại mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Thay đổi mật khẩu</Button>
      </form>
    </Form>
  );
}
