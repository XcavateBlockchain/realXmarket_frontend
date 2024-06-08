'use client';

import { usePathname } from 'next/navigation';

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
  // const segment = useSelectedLayoutSegment();

  return (
    <div className="sticky top-[80px] z-10 w-full overflow-auto bg-white">
      <div className="flex w-full items-center gap-[47px] border-b border-primary-foreground/[0.10] px-2 lg:justify-between lg:gap-0">
        {items.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center justify-center gap-2 border-b-2 px-2 pb-2 text-[0.75rem]/[1.5rem] uppercase transition-all duration-300 lg:text-[1rem]/[1.5rem]',
              pathname === item.href
                ? 'border-primary text-primary hover:text-primary/80'
                : 'border-transparent text-caption hover:text-primary'
            )}
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={24}
              height={24}
              className="pointer-events-none"
              priority
            />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
