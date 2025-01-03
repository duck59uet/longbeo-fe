import { Wallet } from 'lucide-react';

export function BalanceInfo() {
  return (
    <div className="space-y-8 mt-4">
      <div className="flex items-center">
        <div className="ml-4 space-y-1 flex items-center">
          <Wallet className="mr-2"/>
          <p className="text-sm font-medium leading-none font-2xl">Đã nạp</p>
        </div>
        <div className="ml-auto font-medium">+$1,999.00</div>
      </div>
      <div className="flex items-center ">
        <div className="ml-4 space-y-1 flex items-center">
          <Wallet className="mr-2" />
          <p className="text-sm font-medium leading-none">Số dư</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1 flex items-center">
          <Wallet className="mr-2" />
          <p className="text-sm font-medium leading-none">Đã tiêu</p>
        </div>
        <div className="ml-auto font-medium">+$299.00</div>
      </div>
    </div>
  );
}
