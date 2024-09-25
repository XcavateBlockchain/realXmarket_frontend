import { cn } from '@/lib/utils';

import Link from 'next/link';
import PropertyCard from './property-card';
import { getCookieStorage } from '@/lib/cookie-storage';
import { fetchPropertiesWithFiles } from '@/lib/dynamo';

export default async function Page({
  searchParams: { status }
}: {
  searchParams: { status: string };
}) {
  const types = ['minted', 'listed', 'purchased'];

  const BASE_URL = '/developer/properties';
  const selected = status === undefined ? 'minted' : status;

  const address = await getCookieStorage('accountKey');

  const properties = await fetchPropertiesWithFiles(address as string);
  console.log(properties);
  return (
    <>
      <div className="w-full space-y-10">
        <div className="flex w-full items-start gap-6 border-b border-primary-foreground/[0.10] px-2">
          {types.map((type: string) => {
            const active = selected === type;
            return (
              <Link
                key={type}
                href={`${BASE_URL}?status=${type}`}
                className={cn(
                  'flex items-center justify-center px-2 pb-2 text-[1rem]/[1.5rem] uppercase',
                  active ? 'text-primary' : 'text-caption'
                )}
              >
                {type}
              </Link>
            );
          })}
        </div>

        <div className="grid w-full gap-5">
          <PropertyCard />
        </div>
      </div>
    </>
  );
}
