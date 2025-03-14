'use client';
import { Order } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'order_id',
    header: 'Mã đơn hàng'
  },
  {
    accessorKey: 'order_link',
    header: 'Đường link'
  },
  {
    accessorKey: 'order_createdAt',
    header: 'Thời gian tạo'
  },
  {
    accessorKey: 'order_quantity',
    header: 'Số lượng'
  },
  {
    accessorKey: 'order_amount',
    header: 'Số phút'
  },
  {
    accessorKey: 'order_price',
    header: 'Giá tiền'
  },
  {
    accessorKey: 'order_discount',
    header: 'Giảm giá'
  },
  {
    accessorKey: 'order_start_count',
    header: 'Số mắt bắt đầu'
  },
  {
    accessorKey: 'order_status',
    header: 'Trạng thái'
  },
];
