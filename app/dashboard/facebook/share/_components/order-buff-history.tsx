'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { BuffHistory } from '@/constants/data';
import { columns } from './columns';

export default function BuffOrderHistoryTable({
  data,
  totalData
}: {
  data: BuffHistory[];
  totalData: number;
}) {

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
