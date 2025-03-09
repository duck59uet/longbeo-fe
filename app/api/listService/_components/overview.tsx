'use client';

import PageContainer from '@/components/layout/page-container';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAvailableTime } from '@/services/serviceTime';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Service {
  id: number;
  time: string;
  // Thuộc tính tiếng Việt
  serviceName?: string;
  categoryName?: string;
  price?: number;
  // Thuộc tính tiếng Anh
  name?: string;
  categoryEnName?: string;
  rate?: number;
}

export default function ServiceTable() {
  const [services, setServices] = useState<Service[]>([]);
  const [locale, setLocale] = useState<'en' | 'vi'>('vi');

  // Đồng bộ locale từ sessionStorage
  useEffect(() => {
    const storedLocale = sessionStorage.getItem('locale');
    if (storedLocale === 'en' || storedLocale === 'vi') {
      setLocale(storedLocale);
    } else {
      sessionStorage.setItem('locale', 'vi');
      setLocale('vi');
    }
  }, []);

  // Đối tượng chứa các bản dịch cho tiêu đề và thông báo
  const translations = {
    vi: {
      id: 'ID',
      category: 'Tên dịch vụ',
      channel: 'Kênh',
      time: 'Thời gian',
      price: 'Giá',
      minutes: 'phút',
      invalidData: 'Dữ liệu không hợp lệ',
      loadError: 'Không thể tải dữ liệu'
    },
    en: {
      id: 'ID',
      category: 'Category',
      channel: 'Name',
      time: 'Time',
      price: 'Rate',
      minutes: 'minutes',
      invalidData: 'Invalid data',
      loadError: 'Unable to load data'
    }
  }[locale];

  function sortServices(data: Service[]): Service[] {
    if (locale === 'vi') {
      return data.sort((a, b) => {
        const categoryA = a.categoryName || '';
        const categoryB = b.categoryName || '';
        if (categoryA.localeCompare(categoryB) !== 0) {
          return categoryA.localeCompare(categoryB);
        }
        const serviceNameA = a.serviceName || '';
        const serviceNameB = b.serviceName || '';
        if (serviceNameA.localeCompare(serviceNameB) !== 0) {
          return serviceNameA.localeCompare(serviceNameB);
        }
        return Number(a.time) - Number(b.time);
      });
    } else {
      return data.sort((a, b) => {
        const categoryA = a.categoryEnName || '';
        const categoryB = b.categoryEnName || '';
        if (categoryA.localeCompare(categoryB) !== 0) {
          return categoryA.localeCompare(categoryB);
        }
        const nameA = a.name || '';
        const nameB = b.name || '';
        if (nameA.localeCompare(nameB) !== 0) {
          return nameA.localeCompare(nameB);
        }
        return Number(a.time) - Number(b.time);
      });
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAvailableTime();
        if (result.ErrorCode === 'SUCCESSFUL') {
          const data = sortServices(result.Data);
          setServices(data);
        } else {
          throw new Error(translations.invalidData);
        }
      } catch (error) {
        toast.error(translations.loadError);
      }
    }
    fetchData();
  }, [translations, locale]);

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <ScrollArea className="grid h-[calc(80vh-220px)] rounded-md border md:h-[calc(90dvh-240px)]">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2 border">{translations.id}</th>
                <th className="px-4 py-2 border">{translations.category}</th>
                <th className="px-4 py-2 border">{translations.channel}</th>
                <th className="px-4 py-2 border">{translations.time}</th>
                <th className="px-4 py-2 border">{translations.price}</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">{service.id}</td>
                  <td className="px-4 py-2 border">
                    {locale === 'vi' ? service.categoryName : service.categoryEnName}
                  </td>
                  <td className="px-4 py-2 border">
                    {locale === 'vi' ? service.serviceName : service.name}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {service.time} {translations.minutes}
                  </td>
                  <td className="px-4 py-2 border text-right">
                    {locale === 'vi' ? service.price : service.rate}
                    {locale === 'vi' ? 'đ' : '$'}
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
