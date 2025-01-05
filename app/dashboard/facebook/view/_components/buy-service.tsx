// filepath: /d:/longbeo-fe/app/dashboard/facebook/_components/buy-service.tsx
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect, useState } from 'react';
import { getServiceInfo } from '@/services/service';
import { toast } from 'sonner';
import { createOrder } from '@/services/order';

const formSchema = z.object({
    link: z.string(),
    quantity: z.string(),
    amount: z.string(),
    service_id: z.string(),
    note: z.string().optional().nullable(),
});

type BuyServiceFormValues = z.infer<typeof formSchema>;

export default function BuyServiceForm() {
  const [servicesData, setServicesData] = useState([]);
  const form = useForm<BuyServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        link: '',
        service_id: '',
        quantity: '',
        amount: '',
        note: ''
    }
  });

  useEffect(() => {
    async function fetchServiceInfo() {
      try {
        const data = await getServiceInfo();
        setServicesData(data.Data);
      } catch (error) {
        toast.error('Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.');
      }
    }

    fetchServiceInfo();
  }, []);

  const onSubmit = async (values: BuyServiceFormValues) => {
    try {
      const response = await createOrder({ 
        ...values, 
        service_id: Number(values.service_id),
        quantity: Number(values.quantity),
        amount: Number(values.amount)
      });
      
      if(response.ErrorCode === "SUCCESSFUL"){
        toast.success('Đã tạo đơn hàng thành công');
        form.reset();
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3">
                <FormLabel className="w-1/3 text-lg">Link order</FormLabel>
                <FormControl className="w-2/3">
                  <Input
                    placeholder="Nhập link hoặc ID bài viết cần tăng"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service_id"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3">
                <FormLabel className="w-1/3 text-lg">Máy chủ</FormLabel>
                <FormControl className="w-2/3">
                  <div className='space-y-2'>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {servicesData.map((service: any) => (
                      <div key={service?.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={service?.id.toString()} />
                        <span className="bg-red-100 text-red-500 font-bold text-sm px-2 py-1 rounded-md">
                          {service?.id}
                        </span>
                        <span className="font-medium text-gray-700">
                          {service?.name}
                        </span>
                        <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded-md text-sm">
                          {service?.price} đ
                        </span>
                        <span className="text-green-600 bg-green-100 px-2 py-1 rounded-md text-sm">
                          Hoạt động
                        </span>
                      </div>
                    ))}
                  </RadioGroup>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3">
                <FormLabel className="w-1/3 text-lg">Số mắt</FormLabel>
                <FormControl className="w-2/3">
                  <Input
                    type="number"
                    placeholder="Số mắt"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3">
                <FormLabel className="w-1/3 text-lg">Số phút</FormLabel>
                <FormControl className="w-2/3">
                  <Input
                    type="number"
                    placeholder="Số phút"
                    min={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 md-9">
                <FormLabel className="w-1/3 text-lg">Ghi chú</FormLabel>
                <FormControl className="w-2/3">
                  <Textarea
                    placeholder="Ghi chú"
                    rows={4}
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className='w-full'>Tạo tiến trình</Button>
      </form>
    </Form>
  );
}
