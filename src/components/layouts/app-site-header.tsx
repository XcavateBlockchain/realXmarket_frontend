'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import MobileNav from './mobile-nav';
import React from 'react';
import { cn } from '@/lib/utils';
import { useWalletContext } from '@/context/wallet-context';
import ConnectWalletButton from '../wallet/connect-wallet';
import { useRouter } from 'next/navigation';
import AuthMenu from './auth-menu';

type HeaderProps = {
  open: boolean;
  // address: string | undefined;
};

export function AppSiteHeader({ open = false }: HeaderProps) {
  const router = useRouter();
  const { setModalOpen, selectedAccount, showCredentialDialog } = useWalletContext();
  const isConnected = selectedAccount?.[0]?.address;
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showVerifyModal, setShowVerifyModal] = React.useState(!showCredentialDialog);
  // const [walletModal, showModal] = React.useState(open);

  // React.useEffect(() => {
  //   if (open) {
  //     setModalOpen(open);
  //   }
  // }, [open]);

  // change background color on scroll
  React.useEffect(() => {
    const changeBgColor = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener('scroll', changeBgColor);
    return () => window.removeEventListener('scroll', changeBgColor);
  }, [isScrolled]);

  React.useEffect(() => {
    setShowVerifyModal(!showCredentialDialog);
  }, [showCredentialDialog]);

  React.useEffect(() => {
    if (showVerifyModal === false) {
      router.push('/');
      router.refresh();
    }
  }, [showVerifyModal]);

  return (
    <header
      className={cn('fixed z-10 w-full bg-transparent', {
        'bg-white': isScrolled
      })}
    >
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
              target={nav.href.startsWith('https') ? '_blank' : ''}
              rel={nav.href.startsWith('https') ? 'noreferrer' : ''}
              className={cn(
                'text-[1rem]/[1.5rem] text-black transition-colors duration-300 hover:text-primary-300'
              )}
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
