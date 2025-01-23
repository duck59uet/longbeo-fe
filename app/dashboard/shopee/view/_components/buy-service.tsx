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
// import '@/styles/toast-custom.css';

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
  const [hasShownToast, setHasShownToast] = useState(false);
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [servicesTimeData, setServiceTimesData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
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

  const instructions = [
    'Liên kết: Liên kết phát trực tiếp Shopee',
    'Vị trí: Toàn cầu',
    'Bắt đầu: 0-5 phút',
    'Thời gian: 15 phút',
    'Không thả',
    'Không nạp lại'
  ];

  const instructions1 = [
    'Khi dịch vụ bận, tốc độ bắt đầu của quy trình sẽ thay đổi.',
    'Không đặt đơn hàng thứ hai thông qua cùng một liên kết trước khi đơn hàng của bạn được hoàn tất trong hệ thống.',
    'Trong trường hợp có bất kỳ vấn đề nào với dịch vụ, vui lòng liên hệ với bộ phận hỗ trợ.',
  ];

  useEffect(() => {
    if (!hasShownToast) {
      const toastId1 = toast(
        <div
          className="toast-custom"
          onClick={() => toast.dismiss(toastId1)} // Loại bỏ khi click
        >
          <h4 className="text-lg font-semibold text-orange-800">Lưu ý</h4>
          <p className="text-sm text-orange-700">
            Hiện tại FB đang quét TẤT CẢ đơn hàng buff mắt ở Máy sever 1 và
            sever 2 sẽ KHÔNG hoàn tiền trong mọi trường hợp (Kể cả KHÔNG lên
            mắt), các bạn cân nhắc trước khi đặt hàng. Chỉ tăng mắt cho
            Video/Livestream công khai, nếu cố tình đặt Video/Livestream KHÔNG
            công khai có thể KHÔNG lên đủ hoặc KHÔNG lên. Chúng tôi KHÔNG hỗ trợ
            hoàn tiền!
          </p>
        </div>,
        {
          duration: Infinity // Không tự động đóng
        }
      );

      const toastId2 = toast(
        <div
          className="toast-custom"
          onClick={() => toast.dismiss(toastId2)} // Loại bỏ khi click
        >
          <h4 className="text-lg font-semibold text-orange-800">Thông báo</h4>
          <p className="text-sm text-orange-700">
            Nghiêm Cấm: các hành vi sử dụng dịch vụ gây hiểu nhầm, vi phạm đạo
            đức, vi phạm pháp luật, và những hành vi có thể dẫn đến việc lan
            truyền thông tin sai lệch, bao gồm cả việc sử dụng sai mục đích
            trong giáo dục trẻ em, bạn có thể đưa ra các điều khoản như sau:
            <br />
            1. Cấm hành vi gây hiểu nhầm: Cấm mọi hành vi sử dụng dịch vụ nhằm
            gây ra sự hiểu nhầm hoặc làm sai lệch thông tin, ảnh hưởng đến sự
            nhận thức của người dùng về các sản phẩm, dịch vụ hoặc thông tin
            được cung cấp.
            <br />
            2. Cấm vi phạm đạo đức và pháp luật: Cấm mọi hành vi sử dụng dịch vụ
            nhằm thực hiện các hành vi vi phạm đạo đức, chuẩn mực xã hội, hoặc
            vi phạm các quy định pháp luật hiện hành. Điều này bao gồm các hành
            vi như quấy rối, lừa đảo, hoặc xuyên tạc thông tin có chủ đích.
            <br />
            3. Cấm lan truyền thông tin vi phạm: Cấm việc chia sẻ, phát tán
            thông tin sai lệch, thông tin gây hiểu lầm hoặc thông tin có hại cho
            cộng đồng. Các hành vi này không chỉ gây ảnh hưởng xấu đến người
            nhận mà còn có thể dẫn đến các hành vi phạm pháp khác. 4. Cấm sử
            dụng sai mục đích trong giáo dục trẻ em: Cấm việc sử dụng dịch vụ để
            thực hiện các hành vi không phù hợp trong việc giáo dục trẻ em, như
            đưa vào giảng dạy các thông tin sai lệch, không phù hợp về văn hóa,
            đạo đức, hoặc pháp luật.
          </p>
        </div>,
        {
          duration: Infinity
        }
      );

      setHasShownToast(true);
    }
  }, [hasShownToast]);

  useEffect(() => {
    async function fetchServiceInfo() {
      try {
        const data = await getServiceInfo(3);
        setServicesData(data.Data);
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
      } catch (error) {
        toast.error('Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.');
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
        ...values,
        service_id: Number(values.service_id),
        service_time_id: Number(values.service_time_id),
        quantity: Number(values.quantity),
        amount: selectedServiceTime.time
      });

      if (response.ErrorCode === 'SUCCESSFUL') {
        toast.success('Đã tạo đơn hàng thành công');
        form.reset();
      }

      if (response.AdditionalData.Code === 'E004') {
        setModalMessage('Không đủ số dư trong tài khoản');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error creating order:', error);
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
            <CardContent className="w-full rounded-lg p-4 py-2 mb-2">
              {/* Hướng dẫn */}
              <div className="bg-blue-100 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <TriangleAlert className="w-6 h-6 text-red-500" />
                  <span className="text-red-500 font-semibold">Chi tiết dịch vụ:</span>
                </div>
                <ul className="space-y-2 text-[#D82222] text-sm font-semibold font-sans mb-4">
                  {instructions.map((text, index) => (
                    <li key={index}>- {text}</li>
                  ))}
                </ul>
                <span className="text-red-500 font-semibold">Thông tin chung:</span>
                <ul className="space-y-2 text-[#D82222] text-sm font-semibold font-sans mb-4">
                  {instructions1.map((text, index) => (
                    <li key={index}>- {text}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormLabel className="w-1/3 text-lg">Số mắt</FormLabel>
                  <FormControl className="w-2/3">
                    <Input type="number" placeholder="Số mắt" {...field} />
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
                  <FormLabel className="w-1/3 text-lg">Số phút</FormLabel>
                  <FormControl className="w-2/3">
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-2/3">
                        <SelectValue placeholder="Số phút" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Array.isArray(servicesTimeData) &&
                        servicesTimeData.length > 0 ? (
                          servicesTimeData.map((time: any, index: number) => (
                            <SelectItem key={index} value={time.id.toString()}>
                              {time.time} phút
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-gray-500">
                            Không có dữ liệu thời gian
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
          <div className="flex items-center space-x-3">
            <FormLabel className="w-1/3 text-lg">Thành tiền</FormLabel>
            <span className="text-lg font-semibold text-red-500">
              {Number(form.watch('service_time_id')) *
                Number(form.watch('quantity')) *
                servicesData.find(
                  (service: any) =>
                    service.id === Number(form.watch('service_id'))
                )?.price || 0}{' '}
              đ
            </span>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#4680FF] text-white hover:bg-[#2E5BFF]"
          >
            Tạo tiến trình
          </Button>
        </form>
      </Form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thông báo"
        description={''}
      >
        {modalMessage}
      </Modal>
    </>
  );
}
