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
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
    linkOrder: z.string().nonempty({ message: 'Hãy nhập link order' }),
    quantity: z.number().min(50, { message: 'Số mắt tối thiểu là 50' }).max(100000, { message: 'Số phút tối đa là 100,000' }),
    amount: z.number().min(1, { message: 'Số phút tối thiểu là 1 phút' }),
    // serviceId: z.string().nonempty({ message: 'Hãy chọn ít nhất một dịch vụ' }),
    note: z.string().optional()
});

type BuyServiceFormValues = z.infer<typeof formSchema>;

// const servicesData = [];

export default function BuyServiceForm() {
  const form = useForm<BuyServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        linkOrder: '',
        quantity: 100,
        amount: 1,
        // serviceId: '',
        note: ''
    }
  });

  const onSubmit = async (values: BuyServiceFormValues) => {
    console.log('Form data:', values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="linkOrder"
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
            name="amount"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3">
                <FormLabel className="w-1/3 text-lg">Số lượng</FormLabel>
                <FormControl className="w-2/3">
                  <Input
                    type="number"
                    placeholder="Số phút"
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