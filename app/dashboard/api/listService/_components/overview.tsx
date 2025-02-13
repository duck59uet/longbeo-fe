'use client';

import PageContainer from '@/components/layout/page-container';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAvailableTime } from '@/services/serviceTime';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Service {
  id: number;
  time: string;
  serviceName: string;
  categoryName: string;
  price: number;
}

export default function ServiceTable() {
  const [services, setServices] = useState<Service[]>([]);

  function sortServices(data: Service[]): Service[] {
    return data.sort((a, b) => {
      if (a.categoryName !== b.categoryName) {
        return a.categoryName.localeCompare(b.categoryName);
      }
      
      if (a.serviceName !== b.serviceName) {
        return a.serviceName.localeCompare(b.serviceName);
      }
      
      return Number(a.time) - Number(b.time);
    });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAvailableTime();

        if (result.ErrorCode === 'SUCCESSFUL') {
          const data = sortServices(result.Data);
          setServices(data);
        } else {
          throw new Error('Dữ liệu không hợp lệ');
        }
      } catch (error) {
        toast.error('Không thể tải dữ liệu');
      }
    }

    fetchData();
  }, []);

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <ScrollArea className="grid h-[calc(80vh-220px)] rounded-md border md:h-[calc(90dvh-240px)]">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Tên dịch vụ</th>
                <th className="px-4 py-2 border">Kênh</th>
                <th className="px-4 py-2 border">Thời gian</th>
                <th className="px-4 py-2 border">Giá</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">{service.id}</td>
                  <td className="px-4 py-2 border">{service.categoryName}</td>
                  <td className="px-4 py-2 border">{service.serviceName}</td>
                  <td className="px-4 py-2 border text-center">
                    {service.time} phút
                  </td>
                  <td className="px-4 py-2 border text-right">
                    {service.price}đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>
    </PageContainer>
  );
}
