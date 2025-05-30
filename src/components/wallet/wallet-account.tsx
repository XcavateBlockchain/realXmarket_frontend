import React, { useContext, useEffect, useState } from 'react';

import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useWalletContext } from '@/context/wallet-context';
import { SCREENS, useScreenSize } from '@/lib/resolutionScreens';
import { getLocalStorageItem } from '@/lib/localstorage';
import type { WalletAccount, WalletInfo } from '@/types';
import { PREDEFINED_WALLETS } from '@/config/dotsama';
import { formatAddress, getAssetBalances, getFormattedBalance } from '@/lib/formaters';
import IdentIcon from './identicon';
import { Icons } from '../icons';
import Image from 'next/image';
import { AccountOptions } from './wallet-connectors';
import { NodeContext } from '@/context';
import { USDCIcon, USDTIcon } from '../coin';

interface ISection {
  [key: number]: React.ReactNode;
}

type TConnectWallet = {
  onClose: () => void;
  onConnected: () => void;
};

export function WalletAccount({ onClose, onConnected }: TConnectWallet) {
  const router = useRouter();
  const walletContext = useWalletContext();
  const screenSize = useScreenSize();
  const [index, setIndex] = React.useState<number>(0);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address;
  const walletAccounts: any = walletContext.accounts;
  const [walletType, setWalletType] = React.useState<string>('');
  const walletKey = getLocalStorageItem('wallet-key');

  React.useEffect(() => {
    if (walletKey) {
      setWalletType(JSON.parse(walletKey));
    }
  });

  const onSelectAccount = async (account: WalletAccount) => {
    walletContext.selectAccount(account.address);
    onConnected();
    setIndex(0);
    onClose();
    router.refresh();
  };

  const wallet = PREDEFINED_WALLETS.find(wallet => wallet.extensionName === walletType);

  const formattedAddress =
    screenSize === SCREENS.mobile
      ? formatAddress(selectedAddress, 2, 4, 9)
      : formatAddress(selectedAddress);

  const actions: ISection = {
    0: (
      <AccountDetails
        formattedAddress={formattedAddress}
        walletInfo={wallet}
        onClick={onClose}
        setIndex={setIndex}
      />
    ),

    1: (
      <AccountOptions
        accounts={walletAccounts}
        setIndex={setIndex}
        onClick={onSelectAccount}
      />
    )
  };

  return (
    <>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          size={'md'}
          className="hidden shrink-0 text-foreground md:flex"
        >
          {selectedAddress ? <IdentIcon address={selectedAddress} /> : null}
          {formattedAddress}
          <span className="sr-only">Toggle View Wallet</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="shadow-wallet mt-4 grid w-[518px] gap-6 rounded-lg p-6"
      >
        {actions[index]}
      </PopoverContent>
    </>
  );
}

type TAccount = {
  formattedAddress: string;
  walletInfo?: WalletInfo;
  onClick: () => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

export function AccountDetails({ formattedAddress, walletInfo, onClick, setIndex }: TAccount) {
  const router = useRouter();
  const walletContext = useWalletContext();
  const { api } = useContext(NodeContext);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address;
  const account = walletContext.selectedAccount?.[0];
  const [balance, setBalance] = useState<string | null>(null);
  const [otherBalance, setOtherBalance] = useState<any | null>(null);

  useEffect(() => {
    if (selectedAddress) {
      getFormattedBalance(selectedAddress, api).then(balance => {
        if (balance) {
          setBalance(balance);
        }
      });
    }
  }, [selectedAddress, api]);

  useEffect(() => {
    if (selectedAddress) {
      getAssetBalances(selectedAddress, api).then(balance => {
        if (balance) {
          setOtherBalance(balance);
        }
      });
    }
  }, [selectedAddress, api]);

  return (
    <>
      <div className="flex w-full gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold text-[#4E4E4E]">
              Summary
            </h1>
            <div className="flex gap-2">
              {walletInfo ? (
                <Image
                  src={walletInfo.logo.src}
                  alt={walletInfo.title}
                  width={24}
                  height={24}
                  className="rounded-full border"
                />
              ) : null}
              <span>
                {account?.name} ({formattedAddress})
              </span>{' '}
              <Icons.copy className="size-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid justify-items-start gap-2 rounded-lg border px-4 py-2">
        <dl className="flex w-full items-center justify-between">
          <dt>XCAV</dt>
          <dd>{balance}</dd>
        </dl>
        <dl className="flex w-full items-center justify-between">
          <dt className="flex items-center gap-1">
            <USDCIcon className="size-6 rounded-full" /> USDC
          </dt>
          <dd>{otherBalance?.usdcBalance}</dd>
        </dl>
        <dl className="flex w-full items-center justify-between">
          <dt className="flex items-center gap-1">
            <USDTIcon className=" size-6 rounded-full" /> USDT
          </dt>
          <dd>{otherBalance?.usdtBalance}</dd>
        </dl>
      </div>
      <div className="flex w-full items-center gap-4 md:justify-end md:gap-2">
        <Button className="w-full md:w-auto" onClick={() => setIndex(1)}>
          CHANGE ACCOUNT
        </Button>
        <Button
          className="w-full md:w-auto"
          variant={'outline'}
          onClick={async () => {
            await walletContext.disconnectWallet();
            router.refresh();
            onClick();
          }}
        >
          DISCONNECT
        </Button>
      </div>
    </>
  );
}
