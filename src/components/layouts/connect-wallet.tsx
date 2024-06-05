'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { WalletIcon, WalletIconType } from '../wallet-icon';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogContent } from '../ui/alert-dialog';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Icons } from '../icons';
import { useSubstrateContext } from '@/context/polkadot-contex';

interface ISection {
  [key: number]: ReactNode;
}

type PopoverProps = {
  setIndex: Dispatch<SetStateAction<number>>;
};

interface SelectAccountProps {
  close: () => void;
}

export function ConnectWalletAction({ setIndex }: PopoverProps) {
  return (
    <>
      <div className="flex w-full gap-2">
        <div className="flex items-center justify-between">
          <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold text-[#4E4E4E]">
            Connect wallet
          </h1>
        </div>
      </div>
      <div className="grid gap-4">
        <WalletButton
          icon="talismanWallet"
          name="Talisman"
          isRecommended
          onClick={() => setIndex(2)}
        />
        <WalletButton icon="subWallet" name="Subwallet" onClick={() => setIndex(2)} />
      </div>
      <div className="flex items-center justify-center">
        <Link href={'#'} className="text-[1rem]/[1.5rem] underline-offset-4 hover:underline">
          What is a wallet?
        </Link>
      </div>
    </>
  );
}
export function SelectAccountAction({ close }: SelectAccountProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { handleConnect } = useSubstrateContext();

  function handleClose() {
    handleConnect();
    setIsDialogOpen(false);
    close();
  }

  return (
    <>
      <>
        <div className="flex w-full gap-2">
          <div className="flex items-center justify-between">
            <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold text-[#4E4E4E]">
              Select account
            </h1>
          </div>
        </div>
        <div className="grid gap-4">
          <SelectAccountButton
            icon="account"
            name="Victor"
            address="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            isRecommended
            onClick={handleClose}
          />
          <SelectAccountButton
            icon="account"
            name="Victor 2"
            address="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          />
        </div>
      </>
      {/* <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex size-[140px] items-center justify-center rounded-full bg-primary-300/[0.10] text-primary-300" />

            <h1 className="font-heading text-[1rem]/[1.5rem] font-medium">
              Wallet connected successfully
            </h1>
            <p className="text-center text-[1rem]/[1.5rem] font-light">
              Welcome on board to Xcavate, this wallet would be used to store your transferable
              tokens and make payment of any purchase using the Xcavate Dapp.
            </p>
          </div>
          <div className="flex items-end justify-end">
            <Button size={'lg'} onClick={handleClose}>
              Done
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}

export function ConnectWallet() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [index, setIndex] = useState(1);

  function close() {
    setShowDropdown(false);
  }

  const actions: ISection = {
    1: <ConnectWalletAction setIndex={setIndex} />,
    2: <SelectAccountAction close={close} />
  };

  return (
    <>
      <Popover open={showDropdown} onOpenChange={setShowDropdown}>
        <PopoverTrigger asChild>
          <Button className="hidden shrink-0 md:flex">
            Connect <Icons.wallet className="size-6" />
            <span className="sr-only">Toggle Connect Wallet</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="shadow-wallet mt-4 grid w-[518px] gap-6 rounded-lg p-6"
        >
          {actions[index]}
        </PopoverContent>
      </Popover>
    </>
  );
}

interface WalletButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  icon: WalletIconType;
  address?: string;
  isRecommended?: boolean;
}

export function WalletButton({ name, icon, isRecommended, ...props }: WalletButtonProps) {
  const Icon = WalletIcon[icon];
  return (
    <button
      className="flex w-full items-center justify-between rounded-lg border border-primary-foreground px-4 py-2 transition-colors duration-300 hover:border-primary-foreground"
      {...props}
    >
      <div className="flex items-center gap-2">
        <Icon className="size-[48px]" />
        <span className="text-[ 1.125rem]/[1.5rem] font-mona">{name}</span>
      </div>
      {isRecommended ? (
        <span className="text-[1ren]/[1.5rem] px-2 text-center text-primary">Recommended</span>
      ) : null}
    </button>
  );
}

export function SelectAccountButton({
  name,
  icon,
  address,
  isRecommended,
  ...props
}: WalletButtonProps) {
  const Icon = WalletIcon[icon];
  return (
    <button
      className={cn(
        'flex w-full items-center justify-between rounded-lg border px-4 py-2 transition-colors duration-300 hover:border-primary-foreground',
        isRecommended ? 'border-foreground' : 'border-transparent'
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Icon className="size-[48px] fill-primary-300" />
        <div className="flex flex-col items-start gap-1">
          <span className="font-mona text-[1.125rem]/[1.5rem]">{name}</span>
          <span className="max-w-28 truncate font-mona text-[1.125rem]/[1.5rem]">
            {address}
          </span>
        </div>
      </div>
    </button>
  );
}
