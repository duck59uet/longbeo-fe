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
import { getInfo } from '@/services/myaccount';

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  username: z.string({
    required_error: 'Please select a country.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  createdAt: z.string().optional(),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserForm() {
  const [loading, setLoading] = React.useState(true);
  const [userInfo, setUserInfo] = React.useState<UserFormValue | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
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
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
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
                  <Input
                    disabled={true}
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
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
                <FormLabel>Tài khoản</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} disabled={true}/>
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
                <FormLabel>Cấp độ</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
                <FormLabel>Thời gian tham gia</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} disabled={true}/>
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
                <FormLabel>Link ảnh đại diện</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link facebook</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
