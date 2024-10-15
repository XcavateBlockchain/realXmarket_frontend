import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '../icons';
import { IProperty, ListingDetails } from '@/types';
import { ImageIcon } from 'lucide-react';
import { formatAPY, formatNumber, formatPrice } from '@/lib/utils';
import ImageComponent from '../image-component';

export default function MarketCard({
  id,
  details,
  fileUrls,
  tokenRemaining,
  metaData
}: {
  id: string;
  fileUrls: string[];
  details: ListingDetails;
  tokenRemaining: any;
  metaData: IProperty;
}) {
  return (
    <div className="relative flex w-full flex-col gap-6 rounded-lg bg-white pb-6 shadow-property-card transition-all duration-200 hover:translate-y-1">
      {metaData.fileUrls.length >= 1 ? (
        <Link href={`/marketplace/${id}`} className="relative">
          <div className="aspect-square h-[255px]">
            <ImageComponent
              fill={true}
              src={fileUrls[0]}
              alt={metaData.property_name}
              // width={320}
              //   height={255}
              className="rounded-t-lg object-cover"
            />
          </div>
        </Link>
      ) : (
        // <Image
        //   src={metaData.fileUrls[0]}
        //   alt={metaData.property_name}
        //   width={320}
        //   height={255}
        //   className="h-[255px] w-full rounded-t-lg"
        //   priority
        // />
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
          <div className="flex items-center justify-between font-sans text-[0.875rem]/[1.5rem]">
            <dt className=" font-bold">{metaData.property_name}</dt>
            <dd className="">
              APY{' '}
              <span className="font-bold">
                {formatAPY(metaData.estimated_rental_income, metaData.property_price)}
              </span>
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="font-sans text-[0.875rem]/[1.5rem]">
              Token <span className="font-bold">{tokenRemaining}</span>
            </dt>
            <dd className="font-sans text-[0.875rem]/[1.5rem]">
              Price <span className="font-bold">{formatPrice(metaData.property_price)}</span>
            </dd>
          </div>
        </div>
      </Link>
    </div>
  );
}
