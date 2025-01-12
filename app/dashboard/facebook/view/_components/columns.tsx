'use client';
import { BuffHistory } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<BuffHistory>[] = [
  {
    accessorKey: 'orderLink',
    header: 'Link đơn'
  },
  {
    accessorKey: 'serviceName',
    header: 'Máy chủ'
  },
  {
    accessorKey: 'servicePrice',
    header: 'Giá'
  },
  {
    accessorKey: 'orderQuantity',
    header: 'Số lượng'
  },
  {
    accessorKey: 'createdAt',
    header: 'Bắt đầu'
  },
  {
    accessorKey: 'orderAmount',
    header: 'Số phút'
  },
  {
    accessorKey: 'orderPrice',
    header: 'Thành tiền'
  },
  {
    accessorKey: 'orderNote',
    header: 'Ghi chú'
  }
];
