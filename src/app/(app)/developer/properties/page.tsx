import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Page({
  searchParams: { status }
}: {
  searchParams: { status: string };
}) {
  const types = ['minted', 'listed', 'purchased'];

  const BASE_URL = '/profile/properties';
  const selected = status === undefined ? 'minted' : status;
  return (
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
              <Button variant={'filled'} fullWidth>
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
  );
}
