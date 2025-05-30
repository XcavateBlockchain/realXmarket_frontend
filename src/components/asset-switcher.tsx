'use client';

import { useId } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { paymentAsset } from '@/hooks/use-payment-asset';
import { Icons } from './icons';
import { useWalletContext } from '@/context/wallet-context';

export default function AssetSwitcher() {
  const id = useId();
  const { asset, onChangeAsset } = useWalletContext();

  return (
    <div className="*:not-first:mt-2">
      <Select
        defaultValue={asset}
        onValueChange={value => onChangeAsset(value as 'usdt' | 'usdc')}
      >
        <SelectTrigger
          id={id}
          className="h-auto rounded border-none bg-primary/[0.12] px-1.5 py-1 ps-2 text-left [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
        >
          <SelectValue placeholder="Choose a plan" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          <SelectAssetItem {...paymentAsset.usdt} />
          <SelectAssetItem {...paymentAsset.usdc} />
        </SelectContent>
      </Select>
    </div>
  );
}

interface PaymentAssetProps {
  id: string;
  name: string;
  symbol: string;
  icon: string;
}

function SelectAssetItem({ ...asset }: PaymentAssetProps) {
  const Icon = Icons[asset.icon as keyof typeof Icons];
  return (
    <SelectItem value={asset.name} className="flex items-center gap-2">
      <span className="flex items-center gap-2">
        <Icon className="size-4 rounded-full" />
        <span className="mt-0.5 block text-[14px]/[24px] text-muted-foreground">
          {asset.symbol}
        </span>
      </span>
    </SelectItem>
  );
}
