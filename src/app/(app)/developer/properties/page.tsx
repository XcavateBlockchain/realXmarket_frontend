'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Page({
  searchParams: { status }
}: {
  searchParams: { status: string };
}) {
  const types = ['minted', 'listed', 'purchased'];

  const BASE_URL = '/developer/properties';
  const selected = status === undefined ? 'minted' : status;
  const [listModal, setListModal] = useState(false);
  const ListModal = () => {
    return (
      <div className="backdrop-brightness-10 fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-md md:inset-0">
        <div className="relative flex h-auto w-full justify-center p-4">
          <div className="relative h-auto w-1/4 px-4 rounded-lg bg-white shadow">
            <div className="flex items-center justify-between rounded-t px-5 md:py-5">
              <button
                onClick={() => setListModal(false)}
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
                    stroke-width="2"
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
              <h1 className="text-center text-md font-bold text-black">
                Plot 1 - Plea Wharf has been listed on the marketplace
              </h1>
              <p className="text-center text-sm">
                Others will be able tom see this property in the marketplace.
              </p>
              <button className="mt-4 gradient-button w-[200px] rounded-2xl border bg-gradient-to-r px-4 py-3 text-center text-sm uppercase text-black shadow-md focus:ring-4">
                <a href="/">DONE</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
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
          <div className="relative flex w-[320px] flex-col gap-6 rounded-lg bg-white pb-6 shadow-property-card">
            <Image
              src={'/images/property_one.png'}
              alt=""
              width={320}
              height={255}
              priority
              className="rounded-t-lg"
            />
            <div className="absolute inset-4">
              <span className="items-center gap-1 rounded-lg bg-white px-2 py-[2px] text-[0.75rem] text-primary-200">
                Apartment/Flat
              </span>
            </div>

            <div className="relative flex flex-col gap-4 px-4">
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
        </div>
      </div>
      {listModal && <ListModal />}
    </>
  );
}
