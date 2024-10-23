import React, { use } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui/button';
import { Icons, IconType } from '../icons';
import Link from 'next/link';
import { getCookieStorage } from '@/lib/cookie-storage';
import { useWalletContext } from '@/context/wallet-context';

export default function AuthMenu() {
  const { investorType } = useWalletContext();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="filled" size={'icon'}>
          <Icons.user className="size-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="shadow-wallet mt-5 grid w-[253px] gap-6 rounded-lg p-6"
      >
        <MenuLinks
          icon="user"
          href={investorType ? `/${investorType}` : '/profile'}
          title="Profile"
        />
        <MenuLinks icon="settingsIcon" href="/" title="Settings" />
        <MenuLinks icon="learnICon" href="/" title="Learn" />
        <MenuLinks icon="helpIcon" href="/" title="Help center" />
        <MenuLinks icon="infoIcon" href="/" title="Support" />
      </PopoverContent>
    </Popover>
  );
}

function MenuLinks({ title, href, icon }: { title: string; href: string; icon: IconType }) {
  const Icon = Icons[icon];
  return (
    <Link
      href={href}
      className="ga-2 group flex w-full items-center transition-colors duration-200 hover:text-primary-300"
    >
      <Icon className="size-6" />
      <span className="text-[0.875rem]/[1.5rem] text-[#717171] group-hover:text-primary-300">
        {title}
      </span>
    </Link>
  );
}
