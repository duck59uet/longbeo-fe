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
import { Modal } from '@/components/ui/modal';
import { getServiceTimeInfo } from '@/services/serviceTime';
import translations from '@/public/locales/translations.json';
import { getUserLevel } from '@/services/userLevel';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
  link: z.string(),
  quantity: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 20, {
      message: 'Số lượng phải lớn hơn 20'
    }),
  amount: z.string(),
  service_id: z.string(),
  service_time_id: z.string(),
  note: z.string().optional().nullable()
});

type BuyServiceFormValues = z.infer<typeof formSchema>;

export default function BuyServiceForm() {
  const CATEGORY_ID = 10;
  const { data: session } = useSession();
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [servicesTimeData, setServiceTimesData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [localeLoaded, setLocaleLoaded] = useState(false);
  const [userLevel, setUserLevel] = useState<number>(0);
  const [hasFetchedUserLevel, setHasFetchedUserLevel] = useState(false);
  const form = useForm<BuyServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: '',
      service_id: '',
      service_time_id: '',
      quantity: '20',
      amount: '',
      note: ''
    }
  });
  const [locale, setLocale] = useState<'en' | 'vi'>('vi');
  useEffect(() => {
    const storedLocale = sessionStorage.getItem('locale');
    if (storedLocale === 'en' || storedLocale === 'vi') {
      setLocale(storedLocale);
    } else {
      sessionStorage.setItem('locale', 'vi');
      setLocale('vi');
    }
    setLocaleLoaded(true);
  }, []);

  useEffect(() => {
    if (!session?.user || hasFetchedUserLevel) return;

    async function fetchUserLevelData() {
      try {
        const response = await getUserLevel();
        if (response.ErrorCode === 'SUCCESSFUL') {
          const levels = response.Data;
          const userSession = (session?.user as any)?.user;
          if (userSession) {
            const matchedLevel = levels.find(
              (level: any) => level.id === Number(userSession.level)
            );
            if (matchedLevel) {
              setUserLevel(matchedLevel.discount);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user level:', error);
      } finally {
        setHasFetchedUserLevel(true);
      }
    }

    fetchUserLevelData();
  }, [session, hasFetchedUserLevel]);

  useEffect(() => {
    async function fetchServiceInfo() {
      try {
        const data = await getServiceInfo(CATEGORY_ID);
        setServicesData(data.Data);

        if (data.Data && data.Data.length > 0) {
          const firstServiceId = data.Data[0].id.toString();
          form.setValue('service_id', firstServiceId);
          fetchServiceTimeInfo(Number(firstServiceId));
        }
      } catch (error) {
        toast.error(translations[locale].toast.errorService);
      }
    }

    fetchServiceInfo();
  }, []);

  async function fetchServiceTimeInfo(serviceId: number) {
    try {
      const data = await getServiceTimeInfo(serviceId);
      const serviceTimes = Array.isArray(data.Data) ? data.Data : [];
      setServiceTimesData(serviceTimes);
      if (serviceTimes.length > 0) {
        form.setValue('service_time_id', serviceTimes[0].id.toString());
      } else {
        form.setValue('service_time_id', '');
      }
    } catch (error) {
      toast.error(translations[locale].toast.errorServiceTime);
      setServiceTimesData([]);
    }
  }

  const handleServiceChange = (value: string) => {
    form.setValue('service_id', value);
    fetchServiceTimeInfo(Number(value));
  };

  const onSubmit = async (values: BuyServiceFormValues) => {
    try {
      const selectedServiceTime = servicesTimeData.find(
        (time: any) => time.id.toString() === values.service_time_id
      );

      if (!selectedServiceTime) {
        toast.error('Dữ liệu thời gian dịch vụ không hợp lệ.');
        return;
      }

      const response = await createOrder({
        link: values.link,
        service: Number(values.service_time_id),
        quantity: Number(values.quantity)
      });

      if (response.ErrorCode === 'SUCCESSFUL') {
        setModalMessage(translations[locale].toast.orderSuccess);
        setIsModalOpen(true);
        toast.success(translations[locale].toast.orderSuccess);
        form.reset();
      }

      if (response.ErrorCode === 'E004' || response.ErrorCode === 'E500') {
        setModalMessage(translations[locale].toast.insufficientBalance);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setModalMessage(translations[locale].toast.insufficientBalance);
      setIsModalOpen(true);
    }
  };
  const watchedQuantity = Number(form.watch('quantity'));
  const watchedServiceId = Number(form.watch('service_id'));
  const watchedServiceTimeId = Number(form.watch('service_time_id'));
  const serviceTimeItem = servicesTimeData.find(
    (time: any) => time.id === watchedServiceTimeId
  );
  const serviceTimeValue = serviceTimeItem ? serviceTimeItem.time : 0;
  const serviceItem = servicesData.find(
    (service: any) => service.id === watchedServiceId
  );
  const price =
    locale === 'vi'
      ? Number(serviceItem?.price || 0)
      : Number(serviceItem?.enPrice || 0);
  const totalWithoutDiscount = serviceTimeValue * watchedQuantity * price;
  // Tính toán thành tiền sau giảm (nhân với hệ số giảm giá)
  const finalTotal =
    userLevel > 0
      ? totalWithoutDiscount * ((100 - userLevel) / 100)
      : totalWithoutDiscount;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormLabel className="w-1/3 text-lg">
                    {translations[locale].form.linkOrder}
                  </FormLabel>
                  <FormControl className="w-2/3">
                    <Input
                      placeholder={translations[locale].form.orderPlaceholder}
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
                  <FormLabel className="w-1/3 text-lg">
                    {translations[locale].common.server}
                  </FormLabel>
                  <FormControl className="w-2/3">
                    <div className="space-y-2">
                      <RadioGroup
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleServiceChange(value);
                        }}
                      >
                        {servicesData.map((service: any) => (
                          <div
                            key={service?.id}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={service?.id.toString()} />
                            <span className="font-medium text-gray-700">
                              {locale === 'vi'
                                ? service?.name
                                : service?.enName}
                            </span>
                            <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded-md text-sm">
                              {locale === 'vi'
                                ? service?.price
                                : service?.enPrice}{' '}
                              {translations[locale].common.currency}
                            </span>
                            <span className="text-green-600 bg-green-100 px-2 py-1 rounded-md text-sm">
                              {translations[locale].common.active}
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
                  <FormLabel className="w-1/3 text-lg">
                    {translations[locale].form.quantity}
                  </FormLabel>
                  <FormControl className="w-2/3">
                    <Input
                      type="number"
                      placeholder={translations[locale].form.quantity}
                      {...field}
                      defaultValue={20}
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
                  <FormLabel className="w-1/3 text-lg">
                    {translations[locale].form.note}
                  </FormLabel>
                  <FormControl className="w-2/3">
                    <Textarea
                      placeholder={translations[locale].form.note}
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
          <div className="flex items-center space-x-3">
            <FormItem className="flex items-center space-x-3">
              <FormLabel className="w-1/3 text-lg text-black">
                {translations[locale].form.total}
              </FormLabel>
              <span className="text-lg font-semibold text-red-600">
                {totalWithoutDiscount.toFixed(2)}{' '}
                {translations[locale].common.currency}
              </span>
            </FormItem>

            {userLevel > 0 && (
              <FormItem className="flex items-center space-x-3">
                <FormLabel className="w-1/3 text-lg text-black">
                  {locale === 'vi' ? 'Thành tiền sau giảm' : 'Final Total'}
                </FormLabel>
                <span className="text-lg font-semibold text-green-600">
                  {finalTotal.toFixed(2)} {translations[locale].common.currency}
                </span>
              </FormItem>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-[#4680FF] text-white hover:bg-[#2E5BFF]"
          >
            {translations[locale].form.createProcess}
          </Button>
        </form>
      </Form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={translations[locale].modal.notification}
        description={''}
      >
        {modalMessage}
      </Modal>
    </>
  );
}
