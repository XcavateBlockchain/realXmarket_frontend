'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import MobileNav from './mobile-nav';
import { ConnectCredentialWallet } from './connect-credential-wallet';
import ConnectWalletButton from '../wallet/connect-wallet';
import { useWalletContext } from '@/context/wallet-context';
import { cn } from '@/lib/utils';
import AuthMenu from './auth-menu';
import { ConnectButton } from '../connect';
import { useXcavateContext } from '@/providers/xcavate-provider';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { selectedAccount } = useWalletContext();
  const isConnected = selectedAccount?.[0]?.address;
  // const { isConnected } = useXcavateContext();

  // change background color on scroll
  useEffect(() => {
    const changeBgColor = () => {
      window.scrollY > 400 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener('scroll', changeBgColor);
    return () => window.removeEventListener('scroll', changeBgColor);
  }, [isScrolled]);

  return (
    <header
      className={cn(
        'fixed z-10 w-full border-b border-[#4E4E4E]/[0.10] bg-transparent backdrop-blur-md',
        {
          'bg-white': isScrolled
        }
      )}
    >
      <div className="container mx-auto flex max-w-screen-2xl items-center justify-between p-4 md:px-10 lg:px-[100px]">
        <Link href={'/'}>
          <Image
            src={'/images/Real_Market_logo.svg'}
            alt="logo"
            width={200}
            height={56}
            className="h-10 w-[145px] md:h-[56px] md:w-[200px]"
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
              className="font-sans text-[1rem]/[1.5rem] text-primary-foreground transition-colors duration-300 hover:text-primary-300"
            >
              {nav.title}
            </Link>
          ))}
        </nav>
        <MobileNav />
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <ConnectWalletButton />
          {/* <ConnectButton /> */}
          {isConnected ? <AuthMenu /> : null}
        </div>
      </div>
    </header>
  );
}
