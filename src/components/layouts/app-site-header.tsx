'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import MobileNav from './mobile-nav';
import { ConnectWallet } from './connect-wallet';
import ConnectedWalletDropDown from './connected-wallet';
import { useSubstrateContext } from '@/context/polkadot-contex';
import React from 'react';
import { cn } from '@/lib/utils';
import { ConnectCredentialWallet } from './connect-credential-wallet';
import { useWalletContext } from '@/context/wallet-context';
import ConnectWalletButton from '../wallet/connect-wallet';
import { useRouter } from 'next/navigation';

export function AppSiteHeader() {

  const router = useRouter()
  const { selectedAccount } = useWalletContext();
  const isConnected = selectedAccount?.[0]?.address;

  const [isScrolled, setIsScrolled] = React.useState(false);

  // change background color on scroll
  React.useEffect(() => {
    const changeBgColor = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener('scroll', changeBgColor);
    return () => window.removeEventListener('scroll', changeBgColor);
  }, [isScrolled]);

  // React.useEffect(() => {

  // })

  return (
    <header className="fixed z-10 w-full bg-transparent backdrop-blur-[12px]">
      <div className="container mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 md:px-[50px]">
        <Link href={'/'}>
          <Image
            src={'/images/company_logo.png'}
            alt="logo"
            width={200}
            height={56}
            priority
          />
        </Link>

        <nav className="lg::gap-5 hidden items-center lg:flex lg:gap-10">
          {siteConfig.mainNav.map((nav: any) => (
            <Link
              key={nav.title}
              href={nav.href}
              className={cn(
                'text-[1rem]/[1.5rem] transition-colors duration-300 hover:text-primary-300',
                isScrolled ? 'text-black' : 'text-white'
              )}
            >
              {nav.title}
            </Link>
          ))}
        </nav>
        <MobileNav />
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <ConnectWalletButton />
          {isConnected ? <ConnectCredentialWallet /> : null}
        </div>
      </div>
    </header>
  );
}
