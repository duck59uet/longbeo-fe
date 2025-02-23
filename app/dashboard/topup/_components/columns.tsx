'use client';
import { TopupHistory } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export function getColumns(locale: 'en' | 'vi'): ColumnDef<TopupHistory>[] {
  return [
    {
      accessorKey: 'createdAt',
      header: locale === 'en' ? 'Time' : 'Thời gian'
    },
    {
      accessorKey: 'amount',
      header: locale === 'en' ? 'Amount' : 'Thực nhận',
      cell: ({ getValue }) => {
        const rawAmount = Number(getValue());
        if (locale === 'en') {
          const converted = rawAmount / 26000;
          return `${converted.toFixed(2)} $`;
        } else {
          return `${rawAmount} đ`;
        }
      }
    },
    {
      accessorKey: 'sender',
      header: locale === 'en' ? 'Sender' : 'Người gửi'
    }
  ];
}
