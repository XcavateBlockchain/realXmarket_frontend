'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Icons } from '../icons';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { ConnectWalletAction, SelectAccountAction } from './connect-wallet';
import { ReactNode, useState } from 'react';
import { ConnectedWalletDetails } from './connected-wallet';
import { useSubstrateContext } from '@/context/polkadot-contex';

interface ISection {
  [key: number]: ReactNode;
}

export default function MobileNav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showWalletAction, setShowWalletAction] = useState(false);
  const [index, setIndex] = useState(1);

  const { isConnected } = useSubstrateContext();

  function close() {
    setShowWalletAction(false);
  }

  const actions: ISection = {
    1: <ConnectWalletAction setIndex={setIndex} />,
    2: <SelectAccountAction close={close} />
  };

  return (
    <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 border-none md:hidden">
          <Icons.menu className="size-8" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full">
        <div className="grid gap-6">
          <Link href={'/'} className="flex">
          <Image src={'/images/company_logo.png'} alt="logo" width={200} height={56} priority />
          </Link>
          {isConnected ? <ConnectedWalletDetails /> : null}

          <nav className="grid gap-6 font-mona text-[1.125rem]/[1.5rem] font-semibold uppercase">
            {siteConfig.mainNav.map((nav: any) => (
              <Link
                key={nav.title}
                href={nav.href}
                className="flex w-full items-center justify-between py-2"
              >
                {nav.title}

                <Icons.arrowRight className="size-6" />
              </Link>
            ))}
          </nav>
        </div>
        {!isConnected ? (
          <div className="absolute bottom-20 left-0 mt-auto w-full px-4">
            <Sheet open={showWalletAction} onOpenChange={setShowWalletAction}>
              <SheetTrigger asChild>
                <Button fullWidth>
                  Connect <Icons.wallet className="size-6" />
                  <span className="sr-only">Toggle Connect Wallet</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={'bottom'} className="grid w-full gap-6">
                {actions[index]}
              </SheetContent>
            </Sheet>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
