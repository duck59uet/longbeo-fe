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
import { useSession } from 'next-auth/react';
import { getUserLevel } from '@/services/userLevel';

const formSchema = z.object({
  link: z.string(),
  quantity: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 50, {
      message: 'Số lượng phải lớn hơn 50'
    }),
  amount: z.string(),
  service_id: z.string(),
  service_time_id: z.string(),
  note: z.string().optional().nullable()
});

type BuyServiceFormValues = z.infer<typeof formSchema>;

export default function BuyServiceForm() {
  const { data: session } = useSession();
  const CATEGORY_ID = 4;
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
      quantity: '50',
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
    } catch (error) {
      toast.error(translations[locale].toast.errorServiceTime);
      setServiceTimesData([]);
    }
  }

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
            <CardContent className="w-full rounded-lg p-4 py-2 mb-2">
              {/* Hướng dẫn */}
              <div className="bg-blue-100 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <TriangleAlert className="w-6 h-6 text-red-500" />
                  <span className="text-red-500 font-semibold">
                    {translations[locale].common.serviceDetail}:
                  </span>
                </div>
                <ul className="space-y-2 text-[#D82222] text-sm font-semibold font-sans mb-4">
                  {translations[locale].instaInstructions.map((text, index) => (
                    <li key={index}>- {text}</li>
                  ))}
                </ul>
                <span className="text-red-500 font-semibold">
                  {translations[locale].common.commonInfo}:
                </span>
                <ul className="space-y-2 text-[#D82222] text-sm font-semibold font-sans mb-4">
                  {translations[locale].instaInstructions1.map(
                    (text, index) => (
                      <li key={index}>- {text}</li>
                    )
                  )}
                </ul>
              </div>
            </CardContent>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="service_time_id"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormLabel className="w-1/3 text-lg">
                    {translations[locale].form.serviceTime}
                  </FormLabel>
                  <FormControl className="w-2/3">
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-2/3">
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
