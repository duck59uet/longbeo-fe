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
import { Modal } from '@/components/ui/modal';
import { CardContent } from '@/components/ui/card';
import { TriangleAlert } from 'lucide-react';
import { getServiceTimeInfo } from '@/services/serviceTime';
import translations from '@/public/locales/translations.json';
import { useSession } from 'next-auth/react';
import { getUserLevel } from '@/services/userLevel';
import Link from 'next/link';
import { getNewsByCatogeryId } from '@/services/news';

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
  const CATEGORY_ID = 8;
  const { data: session } = useSession();
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [servicesTimeData, setServiceTimesData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [localeLoaded, setLocaleLoaded] = useState(false);
  const [userLevel, setUserLevel] = useState<number>(0);
  const [hasFetchedUserLevel, setHasFetchedUserLevel] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [news, setNews] = useState<string>('');

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
        toast.error('Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.');
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
      toast.error('Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.');
      setServiceTimesData([]);
    }
  }

  useEffect(() => {
    async function fetchNewsData(serviceId: number) {
      try {
        const data = await getNewsByCatogeryId(serviceId);
        setTitle(data.Data.title);
        setNews(data.Data.content.content);
      } catch (error) {
        // toast.error(translations[locale].toast.errorServiceTime);
        setServiceTimesData([]);
      }
    }

    fetchNewsData(CATEGORY_ID);
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

  const renderNewsContent = () => {
    if (!news) return null;
    return <div dangerouslySetInnerHTML={{ __html: news }} />;
  };

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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-8 mt-3 md:mt-4"
        >
          <div className="grid grid-cols-1 gap-5 md:gap-6">
            {/* Link Order Field */}
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3">
                  <FormLabel className="text-base md:text-lg font-medium md:w-1/3">
                    {translations[locale].form.linkOrder}
                  </FormLabel>
                  <div className="w-full md:w-2/3">
                    <FormControl>
                      <Input
                        placeholder={translations[locale].form.orderPlaceholder}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* Service Selection Field */}
            <FormField
              control={form.control}
              name="service_id"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-start space-y-2 md:space-y-0 md:space-x-3">
                  <FormLabel className="text-base md:text-lg font-medium md:w-1/3">
                    {translations[locale].common.server}
                  </FormLabel>
                  <div className="w-full md:w-2/3">
                    <FormControl>
                      <div className="space-y-3">
                        <RadioGroup
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleServiceChange(value);
                          }}
                          className="flex flex-col space-y-3"
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
                                  {locale === 'vi'
                                    ? service.name
                                    : service.enName}
                                </span>
                                <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded-md text-xs md:text-sm">
                                  {locale === 'vi'
                                    ? service.price
                                    : service.enPrice}
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
                    <FormMessage className="mt-1 text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* Service Instructions */}
            <CardContent className="w-full rounded-lg p-3 md:p-4 py-2 mb-1 md:mb-2 px-3 md:px-4">
              <div className="bg-blue-100 p-3 md:p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2 md:mb-4">
                  <TriangleAlert className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                  <span className="text-sm md:text-base text-red-500 font-semibold">
                    {translations[locale].common.serviceDetail}:
                  </span>
                </div>
                <ul className="space-y-1 md:space-y-2 text-[#D82222] text-xs md:text-sm font-semibold font-sans">
                  {translations[locale].instructions.map((text, index) => (
                    <li key={index}>- {text}</li>
                  ))}
                </ul>
              </div>
            </CardContent>

            {/* Quantity Field */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3">
                  <FormLabel className="text-base md:text-lg font-medium md:w-1/3">
                    {translations[locale].form.quantity}
                  </FormLabel>
                  <div className="w-full md:w-2/3">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={translations[locale].form.quantity}
                        {...field}
                        defaultValue={20}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* Note Field */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-start space-y-2 md:space-y-0 md:space-x-3">
                  <FormLabel className="text-base md:text-lg font-medium md:w-1/3">
                    {translations[locale].form.note}
                  </FormLabel>
                  <div className="w-full md:w-2/3">
                    <FormControl>
                      <Textarea
                        placeholder={translations[locale].form.note}
                        rows={3}
                        {...field}
                        value={field.value ?? ''}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-xs" />
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Total Price Information */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-base md:text-lg font-medium text-black">
                {translations[locale].form.total}:
              </span>
              <span className="text-base md:text-lg font-semibold text-red-600">
                {totalWithoutDiscount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}{' '}
                {translations[locale].common.currency}
              </span>
            </div>

            {userLevel > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-base md:text-lg font-medium text-black">
                  {locale === 'vi' ? 'Thành tiền sau giảm:' : 'Final Total:'}
                </span>
                <span className="text-base md:text-lg font-semibold text-green-600">
                  {finalTotal.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}{' '}
                  {translations[locale].common.currency}
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!session?.user}
            className="w-full bg-[#4680FF] text-white hover:bg-[#2E5BFF] py-2.5 md:py-3 text-sm md:text-base mt-2 md:mt-4"
          >
            {translations[locale].form.createProcess}
          </Button>
          {title && <h3>{title}</h3>}
          {news && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded">
              {renderNewsContent()}
            </div>
          )}
        </form>
      </Form>

      {/* Notification Modal */}
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
