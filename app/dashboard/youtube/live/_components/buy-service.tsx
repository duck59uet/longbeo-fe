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
  const CATEGORY_ID = 2;
  const [hasShownToast, setHasShownToast] = useState(false);
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [servicesTimeData, setServiceTimesData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [locale, setLocale] = useState<'en' | 'vi'>('vi');
  const [localeLoaded, setLocaleLoaded] = useState(false);
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
    if (localeLoaded && !hasShownToast) {
      const toastId2 = toast(
        <div className="toast-custom" onClick={() => toast.dismiss(toastId2)}>
          <button
            onClick={() => toast.dismiss(toastId2)}
            className="absolute top-2 right-2 text-sm text-gray-500"
          >
            {translations[locale].toast.close}
          </button>
          <h4 className="text-lg font-semibold text-orange-800">
            {translations[locale].toast.notification}
          </h4>
          <p className="text-sm text-orange-700">
            {translations[locale].toast.notificationContent}
          </p>
        </div>,
        { duration: Infinity }
      );

      setHasShownToast(true);
    }
  }, [hasShownToast, locale, localeLoaded]);

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
            <FormLabel className="w-1/3 text-lg">
              {translations[locale].form.total}
            </FormLabel>
            <span className="text-lg font-semibold text-red-500">
              {(servicesTimeData.find(
                (serviceTime: any) =>
                  serviceTime.id === Number(form.watch('service_time_id'))
              )?.time || 0) *
                Number(form.watch('quantity')) *
                (locale === 'vi'
                  ? servicesData.find(
                      (service: any) =>
                        service.id === Number(form.watch('service_id'))
                    )?.price || 0
                  : servicesData.find(
                      (service: any) =>
                        service.id === Number(form.watch('service_id'))
                    )?.enPrice || 0)}{' '}
              {translations[locale].common.currency}
            </span>
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
