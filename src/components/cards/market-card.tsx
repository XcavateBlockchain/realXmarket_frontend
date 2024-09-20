import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '../icons';
import { FetchedProperty, Property } from '@/types';
import { properties } from '@/config/property';

export default function MarketCard({ ...data }: FetchedProperty) {
  const property = properties.find((property: Property) => property.id === data.itemId);
  if (!property) {
    return null;
  }
  return (
    <div className="relative flex w-full flex-col gap-6 rounded-lg bg-white pb-6 shadow-property-card">
      <Image
        src={property.property_image}
        alt={property.property_name}
        width={320}
        height={255}
        className="h-[255px] w-full rounded-t-lg"
        priority
      />

      <div className="absolute inset-4">
        <span className="items-center gap-1 rounded-lg bg-white px-2 py-[2px] text-[0.75rem] text-primary-200">
          {property.property_type}
        </span>
      </div>

      <Link href={`/marketplace/${property.id}`} className="relative flex flex-col gap-4 px-4">
        <div className="flex w-full items-center justify-between px-0">
          <div className="flex">
            <Image
              src={'/icons/pin_location.svg'}
              alt="loc"
              width={32}
              height={32}
              className="pointer-events-none"
            />
            <h3 className="text-md mt-1">
              {property.address_street} {property.address_town_city}
            </h3>
          </div>
          <Icons.heart className="size-8" />
        </div>
        <div className="w-full space-y-2">
    
          <div className="flex items-center justify-between">
            <dt className='font-bold text-black text-md'>{property.property_name}</dt>
            <dd className="">APY <span className='font-bold text-black text-md'>10%</span></dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className='text-md'>Token <span className='font-bold text-black'>{data.remainingTokens}</span></dt>
            <dd className="text-md">Price <span className='font-bold text-black'>£{data.tokenPrice}</span></dd>
          </div>
        </div>
      </Link>
    </div>
  );
}
