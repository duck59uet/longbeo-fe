'use client';
import { TopupHistory } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<TopupHistory>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'createdAt',
    header: 'Thời gian'
  },
  {
    accessorKey: 'payment_method',
    header: 'Loại'
  },
  {
    accessorKey: 'payment_code',
    header: 'Mã giao dịch'
  },
  {
    accessorKey: 'amount',
    header: 'Thực nhận'
  },
  {
    accessorKey: 'sender',
    header: 'Người gửi'
  },
  {
    accessorKey: 'content',
    header: 'Nội dung'
  }
];
