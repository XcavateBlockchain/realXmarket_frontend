'use client';

import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import MobileNav from './mobile-nav';
import { useWalletContext } from '@/context/wallet-context';
// import { ConnectButton } from '../connect';
import AuthMenu from './auth-menu';
// import { ConnectCredentialWallet } from './connect-credential-wallet';
import ConnectWalletButton from '../wallet/connect-wallet';

export default function NewSiteHeader() {
  const { selectedAccount } = useWalletContext();
  const isConnected = selectedAccount?.[0]?.address;

  return (
    <div className="fixed z-10 w-full border-b border-[#4E4E4E]/[0.10] bg-white">
      <div className="container mx-auto flex max-w-screen-2xl items-center justify-between p-4 lg:px-[107px]">
        <Link href={'/'}>
          <Image
            src={'/images/Real_Market_logo.svg'}
            alt="logo"
            width={191}
            height={48}
            className="h-10 w-[145px] md:h-[48px] md:w-[191px]"
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
          {/* <button className="flex items-center justify-center rounded-[24px] border border-primary-300 px-[26px] py-3 text-[14px] text-[14px]/[24px] font-bold font-bold text-primary">
            CONNECT{' '}
            <Image
              src="/images/mobile_connect.svg"
              alt="mobile_connect"
              width={24}
              height={24}
            />
          </button> */}
          {/* <ConnectButton />
          // {isConnected ? <AuthMenu /> : null} */}
          <ConnectWalletButton />
          {isConnected ? <AuthMenu /> : null}
        </div>
      </div>
    </div>
  );
}
