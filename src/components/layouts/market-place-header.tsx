'use client';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import MobileNav from './mobile-nav';
import { useWalletContext } from '@/context/wallet-context';
import ConnectWalletButton from '../wallet/connect-wallet';
import AuthMenu from './auth-menu';
export function MarketPlaceHeader() {
  const { selectedAccount } = useWalletContext();
  const isConnected = selectedAccount?.[0]?.address;
  return (
    <header className="fixed z-10 w-full bg-transparent backdrop-blur-[12px] backdrop-filter">
      <div className="container mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 md:px-[50px]">
        <Link href={'/'}>
          <Image
            src={'/images/Real_Market_logo.svg'}
            alt="logo"
            width={200}
            height={56}
            priority
          />
        </Link>

        <nav className="hidden items-center md:flex md:gap-5 lg:gap-10">
          {siteConfig.mainNav.map((nav: any) => (
            <Link
              key={nav.title}
              href={nav.href}
              target={nav.href.startsWith('https') ? '_blank' : ''}
              rel={nav.href.startsWith('https') ? 'noreferrer' : ''}
              className="text-[1rem]/[1.5rem] text-primary-foreground transition-colors duration-300 hover:text-primary-300"
            >
              {nav.title}
            </Link>
          ))}
        </nav>
        <MobileNav />
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <ConnectWalletButton />
          {isConnected ? <AuthMenu /> : null}
        </div>
      </div>
    </header>
  );
}
