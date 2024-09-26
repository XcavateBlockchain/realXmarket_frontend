'use client';

import { Button } from '@/components/ui/button';
import { formatNumber, formatPrice } from '@/lib/utils';
import { IProperty, STATE_STATUS } from '@/types';
import { listProperty } from '@/lib/extrinsic';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { ImageIcon, LoaderCircle } from 'lucide-react';
import Image from 'next/image';

import { useState } from 'react';
import { toast } from 'sonner';
import { getCookieStorage } from '@/lib/cookie-storage';
import { useRouter } from 'next/navigation';

export default function PropertyCard({ property }: { property: IProperty }) {
  const router = useRouter();
  const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);
  const [showListedModal, setShowListedModal] = useState(false);

  async function onListProperty() {
    setStatus(STATE_STATUS.LOADING);
    try {
      const address = await getCookieStorage('accountKey');
      if (!address) {
        toast.error('Please connect your wallet');
        return;
      }
      await listProperty(
        address,
        1,
        'London',
        property.price_per_token,
        property.number_of_tokens,
        property
      );
      setShowListedModal(true);
      router.push('/developer/properties?status=listed');
    } catch (error: any) {
      setStatus(STATE_STATUS.ERROR);
      toast.error(error?.error ? error?.error?.message : error?.message);
    }
    setStatus(STATE_STATUS.SUCCESS);
  }

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
            <Button
              variant={'filled'}
              fullWidth
              disabled={status === STATE_STATUS.LOADING}
              onClick={onListProperty}
            >
              {status === STATE_STATUS.LOADING && (
                <LoaderCircle size={16} className=" animate-spin" />
              )}
              List
            </Button>
            <Button variant={'outline'} fullWidth>
              Details
            </Button>
          </div>
        </div>
      </div>
      <AlertDialog open={showListedModal} onOpenChange={setShowListedModal}>
        <AlertDialogHeader className=" sr-only">
          <AlertDialogTitle>Listed modal</AlertDialogTitle>
          <AlertDialogDescription>Listing created</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogContent className="flex max-w-[518px] flex-col items-center gap-10 p-6">
          <div className="flex flex-col items-center space-y-4 p-4 py-1 md:p-5">
            <div className=" bg-white/[#4E4E4E]/[0.10] flex size-[140px] items-center justify-center rounded-full">
              <Image
                src={'/icons/tick.svg'}
                alt="success"
                width={115}
                height={115}
                priority
                className=" 5pointer-events-none rounded-full"
              />
            </div>
            <h1 className="text-center text-xl font-bold text-black">
              Property Successfully Listed!
            </h1>
            <p className="text-center">
              Investors can now view and purchase tokens. You will receive notifications for
              any updates and transactions related to this property.
            </p>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button variant={'outline'} onClick={() => setShowListedModal(false)}>
              Back
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
