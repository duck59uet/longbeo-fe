'use client';

import { BuffHistory } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export function getColumns(locale: 'en' | 'vi'): ColumnDef<BuffHistory>[] {
  return [
    {
      accessorKey: 'order_link',
      header: locale === 'en' ? 'Order Link' : 'Link đơn',
    },
    {
      accessorKey: 'service_name',
      header: locale === 'en' ? 'Server' : 'Máy chủ',
    },
    {
      accessorKey: 'service_price',
      header: locale === 'en' ? 'Price' : 'Giá',
    },
    {
      accessorKey: 'order_quantity',
      header: locale === 'en' ? 'Quantity' : 'Số lượng',
    },
    {
      accessorKey: 'order_createdAt',
      header: locale === 'en' ? 'Start Time' : 'Bắt đầu',
    },
    {
      accessorKey: 'order_amount',
      header: locale === 'en' ? 'Minutes' : 'Số phút',
    },
    {
      accessorKey: 'order_price',
      header: locale === 'en' ? 'Total' : 'Thành tiền',
    },
    {
      accessorKey: 'order_discount',
      header: locale === 'en' ? 'Discount' : 'Giảm giá',
    },
    {
      accessorKey: 'order_note',
      header: locale === 'en' ? 'Note' : 'Ghi chú',
    },
  ];
}
