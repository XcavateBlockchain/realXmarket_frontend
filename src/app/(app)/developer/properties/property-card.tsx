'use client';
import { Button } from '@/components/ui/button';
import { formatNumber, formatPrice } from '@/lib/utils';
import { IProperty } from '@/types';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';

import { useState } from 'react';

export default function PropertyCard({ property }: { property: IProperty }) {
  const [listModal, setListModal] = useState(false);
  return (
    <>
      <div className="relative flex w-[320px] flex-col gap-6 rounded-lg bg-white pb-6 shadow-property-card">
        {property.fileUrls.length >= 1 ? (
          <Image
            src={property.fileUrls[0]}
            alt={property.property_name}
            width={320}
            height={255}
            priority
            className="rounded-t-lg"
          />
        ) : (
          <div className="flex h-[255px] w-full items-center justify-center rounded-t-lg bg-[#4E4E4E]/[0.10] text-primary/50">
            <ImageIcon size={130} />
          </div>
        )}

        <div className="absolute inset-4">
          <span className="items-center gap-1 rounded-lg bg-white px-2 py-[2px] text-[0.75rem] text-primary-200">
            Apartment/Flat
          </span>
        </div>

        <div className="relative flex flex-col gap-4 px-4">
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <dt>{property.property_name}</dt>
              <dd className="">APY 10%</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Token {formatNumber(property.number_of_tokens)}</dt>
              <dd className="">Price {formatPrice(property.property_price)}</dd>
            </div>
          </div>

          <div className="flex w-full gap-2">
            <Button onClick={() => setListModal(true)} variant={'filled'} fullWidth>
              List
            </Button>
            <Button variant={'outline'} fullWidth>
              Details
            </Button>
          </div>
        </div>
      </div>
      {listModal && <ListModal onClick={() => setListModal(false)} />}
    </>
  );
}

const ListModal = ({ onClick }: { onClick: any }) => {
  return (
    <div className="backdrop-brightness-10 fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-md md:inset-0">
      <div className="relative flex h-auto w-full justify-center p-4">
        <div className="relative h-auto w-1/4 rounded-lg bg-white px-4 shadow">
          <div className="flex items-center justify-between rounded-t px-5 md:py-5">
            <button
              onClick={onClick}
              type="button"
              className="ms-auto inline-flex h-6 w-6 items-center justify-center rounded-md border bg-transparent text-sm text-gray-400"
            >
              <svg
                className="h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="flex flex-col items-center space-y-4 p-4 py-1 md:p-5">
            <div className="mb-3 h-28 w-28 overflow-hidden rounded-full bg-green-300">
              <img src="" />
            </div>
            <h1 className="text-md text-center font-bold text-black">
              Plot 1 - Plea Wharf has been listed on the marketplace
            </h1>
            <p className="text-center text-sm">
              Others will be able tom see this property in the marketplace.
            </p>
            <button className="gradient-button mt-4 w-[200px] rounded-2xl border bg-gradient-to-r px-4 py-3 text-center text-sm uppercase text-black shadow-md focus:ring-4">
              <a href="/">DONE</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
