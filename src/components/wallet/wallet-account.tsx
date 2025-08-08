import React, { useEffect, useRef } from 'react';

import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useWalletContext } from '@/context/wallet-context';
import { SCREENS, useScreenSize } from '@/lib/resolutionScreens';
import { getLocalStorageItem } from '@/lib/localstorage';
import type { WalletAccount, WalletInfo } from '@/types';
import { PREDEFINED_WALLETS } from '@/config/dotsama';
import { formatAddress } from '@/lib/formaters';
import { Icons } from '../icons';
import Image from 'next/image';
import { AccountOptions } from './wallet-connectors';
import { USDCIcon, USDTIcon } from '../coin';
import AssetSwitcher from '../asset-switcher';
import { useMediaQuery } from '@/hooks/use-media-query';
// import { DrawerContent, DrawerTrigger } from '../ui/drawer';
import { useBalance } from '@/hooks/use-balance';
import { formatNumber } from '@/lib/utils';

interface ISection {
  [key: number]: React.ReactNode;
}

type TConnectWallet = {
  onClose: () => void;
  onConnected: () => void;
};

export function WalletAccount({ onClose, onConnected }: TConnectWallet) {
  const router = useRouter();
  const { modalOpen, setModalOpen, accounts, selectAccount, selectedAccount } =
    useWalletContext();
  const screenSize = useScreenSize();
  const [index, setIndex] = React.useState<number>(0);
  const selectedAddress = selectedAccount?.[0]?.address;
  const walletAccounts: any = accounts;
  const [walletType, setWalletType] = React.useState<string>('');
  const walletKey = getLocalStorageItem('wallet-key');
  const hiddenTriggerRef = useRef<HTMLButtonElement | null>(null);

  const isDesktop = useMediaQuery('(min-width: 768px)');

  React.useEffect(() => {
    if (walletKey) {
      setWalletType(JSON.parse(walletKey));
    }
  }, [walletKey]);

  const onSelectAccount = async (account: WalletAccount) => {
    selectAccount(account.address);
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
        isSelected={selectedAddress!}
      />
    )
  };

  // Optional: autofocus the hidden trigger so Radix behaves correctly
  useEffect(() => {
    if (modalOpen && hiddenTriggerRef.current) {
      hiddenTriggerRef.current.focus();
    }
  }, [modalOpen, hiddenTriggerRef]);

  return <>{actions[index]}</>;
  // // if (isDesktop) {
  //   return (
  //     <Popover open={modalOpen} onOpenChange={setModalOpen}>

  //       <PopoverContent
  //         align="end"
  //         className="shadow-wallet mt-4 grid w-[518px] gap-6 rounded-lg p-6"
  //       >
  //         {actions[index]}
  //       </PopoverContent>
  //     </Popover>
  //   );
  // // }

  // return (
  //   <Sheet open={modalOpen} onOpenChange={setModalOpen}>
  //     <SheetContent side="bottom" className="grid w-full gap-6 p-6">
  //       {actions[index]}
  //     </SheetContent>
  //   </Sheet>
  // );
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
  const account = walletContext.selectedAccount?.[0];
  const { balance } = useBalance();

  return (
    <>
      <div className="flex w-full gap-2">
        <div className="flex w-full items-center justify-between">
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
          <AssetSwitcher />
        </div>
      </div>
      <div className="grid justify-items-start gap-2 rounded-lg border px-4 py-2">
        <dl className="flex w-full items-center justify-between">
          <dt className="flex items-center gap-1">
            <Image
              src="/images/avatar.png"
              width={26}
              height={24}
              alt="xcav"
              className="size-6"
            />{' '}
            XCAV
          </dt>
          <dd>{formatNumber(balance.XCAV)} XCAV</dd>
        </dl>
        <dl className="flex w-full items-center justify-between">
          <dt className="flex items-center gap-1">
            <USDCIcon className="size-6 rounded-full" /> USDC
          </dt>
          <dd>{formatNumber(balance.USDC)} USDC</dd>
        </dl>
        <dl className="flex w-full items-center justify-between">
          <dt className="flex items-center gap-1">
            <USDTIcon className=" size-6 rounded-full" /> USDT
          </dt>
          <dd>{formatNumber(balance.USDT)} USDT</dd>
        </dl>
      </div>
      <div className="flex w-full items-center justify-end gap-4 md:gap-2">
        <Button className="w-auto" onClick={() => setIndex(1)}>
          CHANGE ACCOUNT
        </Button>
        <Button
          className="w-auto"
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
