import { cn, hexToString } from '@/lib/utils';

import Link from 'next/link';
import PropertyCard from './components/property-card';
import { getCookieStorage } from '@/lib/cookie-storage';
import { fetchPropertiesWithFiles } from '@/lib/dynamo';
import { Button } from '@/components/ui/button';
import { IComponent, IProperty, Listing } from '@/types';
import {
  getAllOngoingListingsWhereAddressIsDeveloper,
  getItemMetadata,
  getTokenRemaining
} from '@/lib/queries';
import {
  ViewAllListedPropertiesCreated,
  ViewAllPropertiesCreated
} from './components/property-list';

export default async function Page({
  searchParams: { status }
}: {
  searchParams: { status: string };
}) {
  const query = status === undefined ? 'all' : status;

  const address = await getCookieStorage('accountKey');

  const properties: IProperty[] = await fetchPropertiesWithFiles(address as string);

  console.log(properties)

  const accountDetails = await getAllOngoingListingsWhereAddressIsDeveloper(address as string);
  async function fetchListedIProperties() {
    const results = await Promise.all(
      accountDetails.map(async listing => {
        if (listing.listingDetails && typeof listing.listingDetails === 'object') {
          const metaData = await getItemMetadata(
            listing.listingDetails.collectionId,
            listing.listingDetails.itemId
          );
          const tokenRemaining = await getTokenRemaining(listing.listingId);
          // const metadata = hexToString(metaData.data);
          const metadata = metaData.data.startsWith('0x')
            ? hexToString(metaData.data)
            : metaData.data;
          return { listing, tokenRemaining, metadata };
        }
      })
    );
    return results;
  }

  const listings: Listing[] = (await fetchListedIProperties()).filter(
    (item): item is Listing => item !== undefined
  );

  const queries: IComponent = {
    all: <ViewAllPropertiesCreated properties={properties} />,
    listed: <ViewAllListedPropertiesCreated listings={listings} />
  };

  return (
    <>
      <div className="w-full space-y-10">
        <div className="flex w-full items-start gap-6 border-b border-primary-foreground/[0.10] px-2">
          {['all', 'listed', 'purchased'].map((type: string) => {
            const active = query === type;
            return (
              <Link
                key={type}
                href={`/developer/properties?status=${type}`}
                className={cn(
                  'flex items-center justify-center px-2 pb-2 text-[1rem]/[1.5rem] uppercase transition-colors duration-200 ease-in hover:text-primary',
                  active ? 'text-primary' : 'text-caption'
                )}
              >
                {type}
              </Link>
            );
          })}
        </div>
        {queries[query]}
      </div>
    </>
  );
}
