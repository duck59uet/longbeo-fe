'use client';
import { TopupHistory } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<TopupHistory>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Thời gian'
  },
  {
    accessorKey: 'amount',
    header: 'Thực nhận'
  },
  {
    accessorKey: 'sender',
    header: 'Người gửi'
  },
];
