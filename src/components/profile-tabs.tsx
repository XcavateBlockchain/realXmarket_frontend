'use client';

import { usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { TabNavItem } from '@/types';
import Image from 'next/image';

interface ProfileTabsProps {
  items: TabNavItem[];
}

export function ProfileTabs({ items }: ProfileTabsProps) {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();

  return (
    <div className="sticky top-[80px] z-10 w-full overflow-auto bg-white">
      <div className="flex w-full items-center gap-[47px] border-b border-primary-foreground px-2 lg:justify-between lg:gap-0">
        {items.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center justify-center gap-2 border-b-2 px-2 pb-2 text-[1rem]/[1.5rem] uppercase',
              pathname === item.href
                ? 'border-primary text-primary-foreground'
                : 'border-transparent text-caption'
            )}
          >
            <Image src={item.icon} alt={item.title} width={24} height={24} priority />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
