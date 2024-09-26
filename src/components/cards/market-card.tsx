import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '../icons';
import { FetchedProperty, IProperty, ListingDetails } from '@/types';
import { properties } from '@/config/property';
import { ImageIcon } from 'lucide-react';
import { formatNumber, formatPrice } from '@/lib/utils';

export default function MarketCard({
  id,
  details,
  tokenRemaining,
  metaData
}: {
  id: string;
  details: ListingDetails;
  tokenRemaining: any;
  metaData: IProperty;
}) {
  // const property = properties.find((property: Property) => property.id === data.itemId);
  // if (!property) {
  //   return null;
  // }
  const ARI = metaData.estimated_rental_income * 12;
  const APY = ARI / metaData.property_price;
  return (
    <div className="relative flex w-full flex-col gap-6 rounded-lg bg-white pb-6 shadow-property-card">
      {metaData.fileUrls.length >= 1 ? (
        <Image
          src={metaData.fileUrls[0]}
          alt={metaData.property_name}
          width={320}
          height={255}
          className="h-[255px] w-full rounded-t-lg"
          priority
        />
      ) : (
        <div className="flex h-[255px] w-full items-center justify-center rounded-t-lg bg-[#4E4E4E]/[0.10] text-primary/50">
          <ImageIcon size={130} />
        </div>
      )}

      <div className="absolute inset-4">
        <span className="items-center gap-1 rounded-lg bg-white px-2 py-[2px] text-[0.75rem] text-primary-200">
          {metaData.property_type}
        </span>
      </div>

      <Link href={`/marketplace/${id}`} className="relative flex flex-col gap-4 px-4">
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
              {metaData.address_street} {metaData.address_town_city}
            </h3>
          </div>
          <Icons.heart className="size-8" />
        </div>
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <dt className="text-md font-bold text-black">{metaData.property_name}</dt>
            <dd className="">
              APY{' '}
              <span className="text-md font-bold text-black">
                {parseInt(`${APY}`).toFixed(1)}%
              </span>
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-md">
              Token <span className="font-bold text-black">{tokenRemaining}</span>
            </dt>
            <dd className="text-md">
              Price{' '}
              <span className="font-bold text-black">
                {formatPrice(metaData.property_price)}
              </span>
            </dd>
          </div>
        </div>
      </Link>
    </div>
  );
}
