'use client';
import { BuffHistory } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<BuffHistory>[] = [
  {
    accessorKey: 'order_link',
    header: 'Link đơn'
  },
  {
    accessorKey: 'service_name',
    header: 'Máy chủ'
  },
  {
    accessorKey: 'service_price',
    header: 'Giá'
  },
  {
    accessorKey: 'order_quantity',
    header: 'Số lượng'
  },
  {
    accessorKey: 'order_createdAt',
    header: 'Bắt đầu'
  },
  {
    accessorKey: 'order_amount',
    header: 'Số phút'
  },
  {
    accessorKey: 'order_price',
    header: 'Thành tiền'
  },
  {
    accessorKey: 'order_discount',
    header: 'Giảm giá'
  },
  {
    accessorKey: 'order_note',
    header: 'Ghi chú'
  }
];
