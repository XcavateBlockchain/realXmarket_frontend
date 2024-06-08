import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '../icons';

export default function PropertyCard() {
  return (
    <div className="relative flex w-full flex-col gap-6 rounded-lg bg-white pb-6 shadow-property-card">
      <Image
        src={'/images/property_one.png'}
        alt=""
        width={320}
        height={255}
        className="w-full rounded-t-lg"
        priority
      />

      <div className="absolute inset-4">
        <span className="items-center gap-1 rounded-lg bg-white px-2 py-[2px] text-[0.75rem] text-primary-200">
          Apartment/Flat
        </span>
      </div>

      <Link href={'/marketplace/1'} className="relative flex flex-col gap-4 px-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-1">
            <Image
              src={'/icons/pin_location.svg'}
              alt="loc"
              width={24}
              height={24}
              className="pointer-events-none"
            />
            <h3 className="text-[0.875rem]/[1.5rem]">Hertford, Hertfordshire UK</h3>
          </div>
          <Icons.heart className="size-6" />
        </div>
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <dt>Plot 1 - Lea Wharf</dt>
            <dd className="">APY 10%</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Token 100</dt>
            <dd className="">Price £250,000</dd>
          </div>
        </div>
      </Link>
    </div>
  );
}
