import { cn } from '@/lib/utils';

import Link from 'next/link';
import PropertyCard from './property-card';
import { getCookieStorage } from '@/lib/cookie-storage';
import { fetchPropertiesWithFiles } from '@/lib/dynamo';
import { Button } from '@/components/ui/button';
import { IProperty } from '@/types';

export default async function Page({
  searchParams: { status }
}: {
  searchParams: { status: string };
}) {
  const types = ['all', 'listed', 'purchased'];

  const BASE_URL = '/developer/properties';
  const selected = status === undefined ? 'all' : status;

  const address = await getCookieStorage('accountKey');

  const properties: IProperty[] = await fetchPropertiesWithFiles(address as string);
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

        {properties.length >= 1 ? (
          <div className="grid w-full grid-cols-4 gap-6">
            {properties.map(property => {
              return <PropertyCard key={property.propertyId} property={property} />;
            })}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-6 py-20">
            <p>
              Looks like there's nothing here yet! Start exploring and adding content to fill
              this space with your own unique properties.
            </p>
            <Button variant={'outline'} asChild>
              <Link href={'/property/create'}>ADD PROPERTY</Link>
            </Button>
          </div>
        )}

        {/* <div className="grid w-full grid-cols-4 gap-6"> */}
        {/* {properties && properties.length >= 1 ? (
            properties.map(property => {
              return <PropertyCard key={property.propertyId} property={property} />;
            })
          ) : (
            <div className="flex flex-col items-center justify-center gap-6">
              <p>
                Looks like there's nothing here yet! Start exploring and adding content to fill
                this space with your own unique properties.
              </p>
              <Button asChild>
                <Link href={'/property/create'}>ADD PROPERTY</Link>
              </Button>
            </div>
          )} */}
        {/* </div> */}
      </div>
    </>
  );
}
