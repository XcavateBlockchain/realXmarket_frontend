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
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-1">
            <Image
              src={'/icons/pin_location.svg'}
              alt="loc"
              width={24}
              height={24}
              className="pointer-events-none"
            />
            <h3 className="text-[0.875rem]/[1.5rem]">
              {property.address_street} {property.address_town_city}
            </h3>
          </div>
          <Icons.heart className="size-6" />
        </div>
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <dt>{property.property_name}</dt>
            <dd className="">APY 10%</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Token {data.remainingTokens}</dt>
            <dd className="">Price {property.property_type}</dd>
          </div>
        </div>
      </Link>
    </div>
  );
}
