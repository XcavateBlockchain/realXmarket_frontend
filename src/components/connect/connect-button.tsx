'use client';

import React from 'react';

import { Icons } from '@/components/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useMediaQuery } from '@/hooks/use-media-query';
import { formatAddress } from '@/lib/utils';
// import Identicon from '@polkadot/react-identicon';
import { useXcavateContext } from '@/providers/xcavate-provider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { AccountOptions } from './account-options';
import IdentIcon from './identicon';

interface ISection {
  [key: number]: React.ReactNode;
}

export function ConnectButton() {
  const [index, setIndex] = React.useState<number>(0);
  const { setOpen, isConnected, balance, activeAccount, disconnect } = useXcavateContext();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const formattedAddress = isDesktop
    ? formatAddress(activeAccount?.address!)
    : formatAddress(activeAccount?.address!, 3);

  const actions: ISection = {
    0: (
      <AccountDetails
        name={activeAccount?.name}
        formattedAddress={formattedAddress}
        balance={balance}
        disconnect={disconnect}
        setIndex={setIndex}
      />
    ),
    1: <AccountOptions />
  };

  function toggleModal() {
    setOpen(prevState => !prevState);
  }

  return (
    <Popover>
      {isConnected ? (
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            size={'md'}
            className="hidden shrink-0 text-foreground md:flex"
          >
            {activeAccount?.address ? <IdentIcon address={activeAccount?.address} /> : null}
            {formattedAddress}
            <span className="sr-only">Toggle View Wallet</span>
          </Button>
        </PopoverTrigger>
      ) : (
        <Button type="button" onClick={toggleModal}>
          SIGN IN <Icons.wallet className="size-6" />
        </Button>
      )}
      <PopoverContent
        align="end"
        className="shadow-wallet mt-4 grid w-[518px] gap-6 rounded-lg p-6"
      >
        {actions[index]}
      </PopoverContent>
    </Popover>
  );
}

type TAccount = {
  name: any;
  formattedAddress: string;
  balance: string | null;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  disconnect: () => void;
};

export function AccountDetails({
  formattedAddress,
  name,
  balance,
  setIndex,
  disconnect
}: TAccount) {
  const router = useRouter();
  return (
    <>
      <div className="flex w-full gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold text-[#4E4E4E]">
              Summary
            </h1>
            <div className="flex gap-2">
              <Image
                src={'/images/realXmarket_logo.svg'}
                alt={'logo'}
                width={24}
                height={24}
                className="size-6 rounded-full border p-0.5"
              />
              <span>
                {name} {formattedAddress}
              </span>{' '}
              <Icons.copy className="size-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid justify-items-start gap-2 rounded-lg border px-4 py-2">
        <dl className="flex w-full items-center justify-between">
          <dt>XCAV tokens</dt>
          <dd>{balance}</dd>
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
            disconnect();
            router.refresh();
          }}
        >
          DISCONNECT
        </Button>
      </div>
    </>
  );
}
