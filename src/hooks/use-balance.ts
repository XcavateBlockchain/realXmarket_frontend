import { useNodeContext } from '@/context';
import { useWalletContext } from '@/context/wallet-context';
import { getFormattedAssetBalance } from '@/lib/formaters';
import { useXcavateContext } from '@/providers/xcavate-provider';
import { useEffect, useState } from 'react';

type Balance = {
  XCAV: string | number;
  USDC: string | number;
  USDT: string | number;
};

export function useBalance() {
  const { api } = useNodeContext();
  // const { selectedAccount } = useWalletContext();
  // const selectedAddress = selectedAccount?.[0]?.address;
  const { activeAccount } = useXcavateContext();
  const selectedAddress = activeAccount?.address;

  const [balance, setBalance] = useState<Balance>({ XCAV: 0, USDC: 0, USDT: 0 });

  useEffect(() => {
    async function accountBalance() {
      const XCAV = await getFormattedAssetBalance({ api, address: selectedAddress! });
      const USDC = await getFormattedAssetBalance({
        api,
        address: selectedAddress!,
        asset: process.env.NEXT_PUBLIC_USDC_PAYMENT_TOKEN
      });
      const USDT = await getFormattedAssetBalance({
        api,
        address: selectedAddress!,
        asset: process.env.NEXT_PUBLIC_USDT_PAYMENT_TOKEN
      });

      setBalance({ XCAV, USDC, USDT });
    }
    accountBalance();
  }, [api, selectedAddress]);
  return { balance };
}
