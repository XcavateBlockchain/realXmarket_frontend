import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

import { useNodeContext } from '@/context';
import { useOpenSelectContext, useWalletContext } from '@/context/wallet-context';
import { Button } from '@/components/ui/button';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { WalletIcon, WalletIconType } from '../wallet-icon';
import { Icons } from '../icons';
import { cn } from '@/lib/utils';
import { getWalletBySource, getWallets } from './wallets';
import { getFormattedBalance } from '@/lib/formaters';
import { Wallet, WalletAccount } from '@/types';
import Skeleton from '../skelton';
import IdentIcon from './identicon';
import { ScrollArea } from '../ui/scroll-area';

interface ISection {
  [key: number]: React.ReactNode;
}

type TConnectWallet = {
  onClose: () => void;
  onConnected: () => void;
};
type TSelectAccount = {
  isSelected?: boolean;
  accounts: WalletAccount[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  onClick: (account: WalletAccount) => void;
};

export default function WalletConnectors({ onClose, onConnected }: TConnectWallet) {
  const router = useRouter();
  const openSelectWalletContext = useOpenSelectContext();
  const walletContext = useWalletContext();
  const currentAddress = walletContext.selectedAccount?.[0]?.address;
  //   const currentBalance = walletContext.balance;
  const { api } = useNodeContext();
  const [index, setIndex] = React.useState<number>(0);
  const [walletAccounts, setWalletAccounts] = React.useState<WalletAccount[]>([]);

  const dotsamaWallets = getWallets();

  React.useEffect(() => {
    if (currentAddress) {
      getFormattedBalance(currentAddress || '', api).then(balance => {
        walletContext.setBalance(balance);
      });
    }
  }, [currentAddress]);

  const onSelectAccount = async (account: WalletAccount) => {
    walletContext.selectAccount(account.address);
    onConnected();
    setIndex(0);
    onClose();
    router.refresh();
  };

  const onSelectWallet = React.useCallback(
    async (walletKey: any, walletType: 'substrate' | 'evm' = 'substrate') => {
      if (api === null || !api?.registry?.chainSS58) {
        toast.error('Node is not connected');
        return;
      }
      if (walletType === 'substrate') {
        setWalletAccounts([]);
        walletContext.selectAccount('');
        // @ts-ignore
        walletContext.setWallet(getWalletBySource(walletKey), walletType);

        const accounts = await getWalletBySource(walletKey)?.getAccounts(
          api.registry.chainSS58
        );

        if (accounts && accounts?.length >= 1) {
          setWalletAccounts(accounts);
          openSelectWalletContext.close();
          // } else if (accounts && accounts?.length == 1) {
          //   onSelectAccount(accounts[0]);
          //   openSelectWalletContext.close();
        } else {
          openSelectWalletContext.close();
        }

        if (!accounts?.length) {
          toast.warning('No active accounts', {
            description: 'no-accounts'
          });
        }
      } else {
        console.log('EVM is not supported yet');
        onClose();
      }
    },
    [openSelectWalletContext, walletContext, api]
  );

  const onClickDotsamaWallet = React.useCallback(
    (wallet: Wallet) => {
      return async () => {
        if (wallet.installed) {
          onSelectWallet(wallet.extensionName);
          // router.refresh();
          // onClose();
        }
      };
    },
    [onSelectWallet]
  );

  function WalletOptions() {
    return (
      <>
        <div className="flex w-full gap-2">
          <div className="flex items-center justify-between">
            <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold text-[#4E4E4E]">
              Connect wallet
            </h1>
          </div>
        </div>
        {!api ? (
          <div className="flex w-full flex-col gap-6">
            <Skeleton className="h-[58px]" />
            <Skeleton className="h-[58px]" />
            <Skeleton className="h-[58px]" />
          </div>
        ) : (
          <div className="grid gap-4">
            {dotsamaWallets.map((wallet, i) => (
              <button
                key={i}
                className="flex w-full items-center justify-between rounded-lg border border-primary-foreground px-4 py-2 transition-colors duration-300 hover:border-primary-foreground"
                onClick={onClickDotsamaWallet(wallet)}
              >
                <div className="flex items-center gap-2">
                  <Image src={wallet.logo?.src} alt="" width={48} height={48} priority />
                  <span className="text-[ 1.125rem]/[1.5rem] font-mona">{wallet.title}</span>
                </div>
                {wallet.installed ? null : (
                  <Link
                    href={wallet.installUrl}
                    target="__blank"
                    className="rounded-lg bg-primary px-2 text-center text-[0.75rem]/[1.5rem] font-light text-white"
                    onClick={() => onClose()}
                  >
                    Install
                  </Link>
                )}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center justify-center">
          <Link href={'#'} className="text-[1rem]/[1.5rem] underline-offset-4 hover:underline">
            What is a wallet?
          </Link>
        </div>
      </>
    );
  }

  useEffect(() => {
    if (walletAccounts.length >= 1) setIndex(1);
  }, [walletAccounts, setIndex]);

  const actions: ISection = {
    0: <WalletOptions />,
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
        <Button className="hidden shrink-0 md:flex">
          CONNECT <Icons.wallet className="size-6" />
          <span className="sr-only">Toggle Connect Wallet</span>
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

export function AccountOptions({ isSelected, accounts, onClick }: TSelectAccount) {
  return (
    <>
      <div className="flex w-full gap-2">
        <div className="flex items-center justify-between">
          <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold text-[#4E4E4E]">
            Select account
          </h1>
        </div>
      </div>

      <AnimatePresence>
        {accounts.length >= 1 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.1 }}
            className="flex flex-col gap-2.5 transition"
          >
            <ScrollArea className={cn('w-full', accounts.length > 3 ? 'h-[400px]' : '')}>
              <div className="mr-4 grid gap-4">
                {accounts.map(account => (
                  <button
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg border px-4 py-2 transition-colors duration-300 hover:border-primary-foreground',
                      isSelected ? 'border-foreground' : 'border-transparent'
                    )}
                    onClick={() => onClick(account)}
                  >
                    <div className="flex items-center gap-2">
                      <IdentIcon size={48} address={account.address} />

                      <div className="flex flex-col items-start gap-1">
                        <span className="font-mona text-[1.125rem]/[1.5rem]">
                          {account.name}
                        </span>
                        <span className="max-w-28 truncate font-mona text-[1.125rem]/[1.5rem]">
                          {account.address}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
