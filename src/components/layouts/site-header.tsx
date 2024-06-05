'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import MobileNav from './mobile-nav';
import { ConnectWallet } from './connect-wallet';
import ConnectedWalletDropDown from './connected-wallet';
import { useSubstrateContext } from '@/context/polkadot-contex';

export function SiteHeader() {
  const { isConnected } = useSubstrateContext();
  return (
    <header className="fixed z-10 w-full bg-transparent backdrop-blur-[12px] backdrop-filter">
      <div className="container mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 md:px-[100px]">
        <Link href={'/'}>
          <Image src={'/images/logo.svg'} alt="logo" width={133} height={48} priority />
        </Link>

        <nav className="hidden items-center md:flex md:gap-5 lg:gap-10">
          {siteConfig.mainNav.map((nav: any) => (
            <Link
              key={nav.title}
              href={nav.href}
              className="text-[1rem]/[1.5rem] text-primary-foreground transition-colors duration-300 hover:text-primary-300"
            >
              {nav.title}
            </Link>
          ))}
        </nav>
        <MobileNav />
        {isConnected ? <ConnectedWalletDropDown /> : <ConnectWallet />}
      </div>
    </header>
  );
}
