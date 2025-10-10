'use client';

import { useWalletContext } from '@/context/wallet-context';
import { SCREENS, useScreenSize } from '@/lib/resolutionScreens';
import IdentIcon from './identicon';
import { formatAddress } from '@/lib/formaters';
import { Button } from '../ui/button';
import { Icons } from '../icons';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import WalletConnectors from './wallet-connectors';
import { WalletAccount } from './wallet-account';
import { useMediaQuery } from '@/hooks/use-media-query';
import Image from 'next/image';

export default function ConnectWalletButton() {
  const { setModalOpen, selectedAccount, modalOpen } = useWalletContext();
  const selectedAddress = selectedAccount?.[0]?.address;
  const screenSize = useScreenSize();
  // const isDesktop = useMediaQuery('(min-width: 768px)');

  const formattedAddress =
    screenSize === SCREENS.mobile
      ? formatAddress(selectedAddress, 2, 4, 9)
      : formatAddress(selectedAddress);

  function handleButtonClick() {
    console.log('Button clicked, current modalOpen:', modalOpen);
    setModalOpen(true);
  }

  if (screenSize === SCREENS.desktop) {
    return (
      <Popover open={modalOpen} onOpenChange={setModalOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn('flex shrink-0', {
              'border-primary-300 hover:bg-primary/10': selectedAddress !== undefined
            })}
            onClick={handleButtonClick}
            fullWidth={screenSize === SCREENS.mobile}
          >
            {selectedAddress ? (
              <>
                <IdentIcon address={selectedAddress} />
                {formattedAddress}
              </>
            ) : (
              <>
                CONNECT{' '}
                <Image
                  src="/images/mobile_connect.svg"
                  alt="mobile_connect"
                  width={24}
                  height={24}
                />
              </>
            )}
            <span className="sr-only">Toggle View Wallet</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="shadow-wallet mt-4 grid w-[518px] gap-6 rounded-lg p-6"
        >
          {selectedAddress ? (
            <WalletAccount
              onConnected={() => {
                setModalOpen(false);
              }}
              onClose={() => {
                setModalOpen(false);
              }}
            />
          ) : (
            <WalletConnectors
              onConnected={() => {
                setModalOpen(false);
              }}
              onClose={() => {
                setModalOpen(false);
              }}
            />
          )}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Button
      variant={selectedAddress ? 'outline' : 'default'}
      className={cn('flex shrink-0', {
        'text-foreground': selectedAddress !== undefined
      })}
      onClick={handleButtonClick}
      fullWidth={screenSize === SCREENS.mobile}
    >
      {selectedAddress ? (
        <>
          <IdentIcon address={selectedAddress} />
          {formattedAddress}
        </>
      ) : (
        <>
          CONNECT <Icons.wallet className="size-6" />
        </>
      )}
      <span className="sr-only">Toggle View Wallet</span>
    </Button>
  );
}
