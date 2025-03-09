'use client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { CardContent } from '@/components/ui/card';
import { TriangleAlert } from 'lucide-react';
import { getServiceTimeInfo } from '@/services/serviceTime';
import translations from '@/public/locales/translations.json';
import { getUserLevel } from '@/services/userLevel';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

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
  const { data: session } = useSession();

  const CATEGORY_ID = 1;
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [servicesTimeData, setServiceTimesData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [localeLoaded, setLocaleLoaded] = useState(false);
  const [userLevel, setUserLevel] = useState<number>(0);
  const [hasFetchedUserLevel, setHasFetchedUserLevel] = useState(false);
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
  }, [locale]);

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

  async function fetchServiceTimeInfo(serviceId: number) {
    try {
      const data = await getServiceTimeInfo(serviceId);
      const serviceTimes = Array.isArray(data.Data) ? data.Data : [];
      setServiceTimesData(serviceTimes);
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
  const finalTotal =
    userLevel > 0
      ? totalWithoutDiscount * ((100 - userLevel) / 100)
      : totalWithoutDiscount;

  return (
    <>
      {!session?.user && (
        <div className="p-3 mb-4 bg-red-100 text-red-600 rounded-md mt-4">
          Vui lòng{' '}
          <Link href="/login" className="underline text-blue-600">
            đăng nhập
          </Link>{' '}
          hoặc{' '}
          <Link href="/login" className="underline text-blue-600">
            đăng ký
          </Link>{' '}
          để sử dụng dịch vụ!
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0">
                  <FormLabel className="md:w-1/3 text-base md:text-lg font-medium">
                    {translations[locale].form.linkOrder}
                  </FormLabel>
                  <FormControl className="md:w-2/3 w-full">
                    <Input
                      placeholder={translations[locale].form.orderPlaceholder}
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="service_id"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-start md:space-x-3 space-y-2 md:space-y-0">
                  <FormLabel className="md:w-1/3 text-base md:text-lg font-medium">
                    {translations[locale].common.server}
                  </FormLabel>
                  <FormControl className="md:w-2/3 w-full">
                    <div className="space-y-2">
                      <RadioGroup
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleServiceChange(value);
                        }}
                        className="space-y-3"
                      >
                        {servicesData.map((service: any) => {
                          const isActive = service.status.toString() === '1';
                          return (
                            <div
                              key={service.id}
                              className="flex flex-wrap items-center gap-2"
                            >
                              <RadioGroupItem
                                value={service.id.toString()}
                                disabled={!isActive}
                              />
                              <span className="font-medium text-gray-700 text-sm md:text-base">
                                {locale === 'vi' ? service.name : service.enName}
                              </span>
                              <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded-md text-xs md:text-sm">
                                {locale === 'vi' ? service.price : service.enPrice}
                                {translations[locale].common.currency}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-md text-xs md:text-sm ${
                                  isActive
                                    ? 'text-green-600 bg-green-100'
                                    : 'text-red-600 bg-red-100'
                                }`}
                              >
                                {isActive
                                  ? translations[locale].common.active
                                  : translations[locale].common.notActive}
                              </span>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </div>
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
            {/* Hướng dẫn */}
            <CardContent className="w-full rounded-lg p-3 md:p-4 py-2 mb-2">
              <div className="bg-blue-100 p-3 md:p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <TriangleAlert className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                  <span className="text-red-500 font-semibold text-sm md:text-base">
                    {translations[locale].common.serviceDetail}:
                  </span>
                </div>
                <ul className="space-y-2 text-[#D82222] text-xs md:text-sm font-semibold font-sans">
                  {translations[locale].instructions.map((text, index) => (
                    <li key={index}>- {text}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            {/* Số mắt */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0">
                  <FormLabel className="md:w-1/3 text-base md:text-lg font-medium">
                    {translations[locale].form.quantity}
                  </FormLabel>
                  <FormControl className="md:w-2/3 w-full">
                    <Input
                      type="number"
                      placeholder={translations[locale].form.quantity}
                      {...field}
                      defaultValue={20}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
            {/* Số phút */}
            <FormField
              control={form.control}
              name="service_time_id"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0">
                  <FormLabel className="md:w-1/3 text-base md:text-lg font-medium">
                    {translations[locale].form.serviceTime}
                  </FormLabel>
                  <FormControl className="md:w-2/3 w-full">
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={translations[locale].form.serviceTime}
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Array.isArray(servicesTimeData) &&
                        servicesTimeData.length > 0 ? (
                          servicesTimeData.map((time: any, index: number) => (
                            <SelectItem key={index} value={time.id.toString()}>
                              {time.time} {translations[locale].common.minutes}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-gray-500">
                            {translations[locale].common.noData}
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
            {/* Ghi chú */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-start md:space-x-3 space-y-2 md:space-y-0">
                  <FormLabel className="md:w-1/3 text-base md:text-lg font-medium">
                    {translations[locale].form.note}
                  </FormLabel>
                  <FormControl className="md:w-2/3 w-full">
                    <Textarea
                      placeholder={translations[locale].form.note}
                      rows={4}
                      {...field}
                      value={field.value ?? ''}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
          </div>
          {/* Hiển thị "Thành tiền" ban đầu và "Thành tiền sau giảm" */}
          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between items-start">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-1 md:space-y-0">
              <FormLabel className="text-base md:text-lg font-medium text-black">
                {translations[locale].form.total}:
              </FormLabel>
              <span className="text-base md:text-lg font-semibold text-red-600">
                {totalWithoutDiscount.toFixed(2)}{' '}
                {translations[locale].common.currency}
              </span>
            </div>

            {userLevel > 0 && (
              <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-1 md:space-y-0">
                <FormLabel className="text-base md:text-lg font-medium text-black">
                  {locale === 'vi' ? 'Thành tiền sau giảm:' : 'Final Total:'}
                </FormLabel>
                <span className="text-base md:text-lg font-semibold text-green-600">
                  {finalTotal.toFixed(2)}{' '}
                  {translations[locale].common.currency}
                </span>
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full bg-[#4680FF] text-white hover:bg-[#2E5BFF] py-2 md:py-2.5 text-sm md:text-base"
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
