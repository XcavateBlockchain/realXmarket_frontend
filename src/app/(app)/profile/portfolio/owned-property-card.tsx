'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { IProperty, ListingDetails, STATE_STATUS } from '@/types';
import { Check, ImageIcon, LoaderCircle, X } from 'lucide-react';
import { formatAPY, formatPrice, truncate } from '@/lib/utils';
import ImageComponent from '@/components/image-component';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { checkBlock } from '@/lib/queries';
import { reclaimUnsold, requestRefund, TransactionStatus } from '@/lib/submit-transaction';
import { getCookieStorage } from '@/lib/cookie-storage';
import { toast } from 'sonner';
import { useNodeContext } from '@/context';
import { useRouter } from 'next/navigation';

export default function OwnedPropertyCard({
  id,
  fileUrls,
  tokenRemaining,
  metaData,
  details,
  price
}: {
  id: string;
  fileUrls: string[];
  details: ListingDetails;
  tokenRemaining: any;
  metaData: IProperty;
  price?: any;
}) {
  const { api } = useNodeContext();
  const router = useRouter();

  const [passed, setPassed] = useState<boolean>(false);
  const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);
  const [trasaction, setTransaction] = useState<TransactionStatus>();

  const blockNumber = Number(details.listingExpiry.replace(/,/g, ''));

  useEffect(() => {
    async function check() {
      const isPassed = await checkBlock(blockNumber);
      setPassed(isPassed);
    }
    check();
  }, [blockNumber, setPassed]);

  async function onReclaim() {
    setStatus(STATE_STATUS.LOADING);
    try {
      const address = await getCookieStorage('accountKey');
      if (!address) {
        toast.error('Please connect your wallet');
        return;
      }

      const result = await requestRefund(api!, Number(details.itemId), address, {
        waitForFinalization: true,
        timeout: 120000 // 2 minutes
      });

      switch (result.status) {
        case TransactionStatus.FINALIZED:
          setTransaction(result.status);
          //   setStatus(STATE_STATUS.SUCCESS);
          toast.success('Property successfully reclaimed!');
          router.refresh();
          break;
        case TransactionStatus.IN_BLOCK:
          setTransaction(result.status);
          toast.info('Transaction in progress...');
          break;
        case TransactionStatus.ERROR:
          setTransaction(result.status);
          setStatus(STATE_STATUS.ERROR);
          toast.error(`Transaction failed: ${result.error}`);
          break;
      }
    } catch (error: any) {
      console.error('Unexpected error:', error);
      toast.error(error?.message || 'Failed to reclaim property');
    } finally {
      setStatus(STATE_STATUS.SUCCESS);
    }
  }

  if (status === STATE_STATUS.LOADING) {
    return (
      <div className="relative flex w-full flex-col items-center justify-center rounded-lg bg-white p-6 shadow-property-card">
        <div className="p-8 text-center">
          {/* Close Button */}
          <Button
            variant="text"
            size="icon"
            className="absolute right-4 top-4 rounded-full border border-black hover:bg-gray-100"
            // onClick={() => setIsModalOpen(false)}
          >
            <X className="size-4" />
          </Button>

          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            {status !== STATE_STATUS.LOADING && (
              <div className="flex size-16 items-center justify-center rounded-full bg-[#4E4E4E]/[0.10]">
                <Image
                  src={'/icons/tick.svg'}
                  alt="success"
                  width={64}
                  height={64}
                  priority
                  className="pointer-events-none size-16 rounded-full"
                />
              </div>
            )}
            {status === STATE_STATUS.LOADING && (
              <LoaderCircle className="size-16 animate-spin text-primary" />
            )}

            {/* <div className="flex size-16 items-center justify-center rounded-full border-2 border-green-600 bg-green-500">
              <Check className="size-8  text-white" />
            </div> */}
          </div>

          {/* Success Message */}
          <h2 className="mb-2 font-mona text-[18px]/[24px] font-semibold text-foreground">
            {status === STATE_STATUS.LOADING ? 'In Progress' : 'Loading'}
          </h2>
          <p className="text-sm text-gray-600">{'Processing your request please hold on'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col gap-6 rounded-lg bg-white pb-6 shadow-property-card transition-all duration-200 hover:translate-y-1">
      {metaData.fileUrls?.length >= 1 ? (
        <Link href={`/marketplace/${id}`} className="relative">
          <div className="aspect-square h-[255px] w-full">
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

      {passed && (
        <div className=" absolute left-[50px] top-[50px]">
          <span className="absolute rotate-[-30.6deg] text-[60px] font-bold text-primary-400">
            Expired
          </span>
        </div>
      )}

      <div className="relative flex flex-col gap-4 px-4">
        <div className="flex w-full items-center justify-between px-0">
          <div className="flex items-center justify-start">
            <Image
              src={'/icons/pin_location.svg'}
              alt="loc"
              width={32}
              height={32}
              // className="pointer-events-none"
            />
            <h3 className="text-md mt-1">
              <span className="capitalize">{metaData.address_street}</span>
              {', '}
              <span className="capitalize">{metaData.address_town_city}</span>
            </h3>
          </div>
          <Icons.heart className="size-8" />
        </div>
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between font-sans text-[0.875rem]/[1.5rem]">
            <dt className=" font-bold">{truncate(metaData.property_name, 20)}</dt>
            <dd className="">
              APY{' '}
              <span className="font-bold">
                {formatAPY(metaData.estimated_rental_income, metaData.property_price)}
              </span>
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="font-sans text-[0.875rem]/[1.5rem]">
              Tokens <span className="font-bold">{tokenRemaining}</span>
            </dt>
            <dd className="font-sans text-[0.875rem]/[1.5rem]">
              Price{' '}
              <span className="font-bold">
                {price ? formatPrice(price) : formatPrice(metaData.property_price)}
              </span>
            </dd>
          </div>
        </div>
        <div className="flex w-full gap-2">
          {passed && (
            <Button variant={'filled'} fullWidth onClick={onReclaim} onAuxClick={onReclaim}>
              Reclaim
            </Button>
          )}

          <Button variant={'outline'} asChild fullWidth>
            <Link href={`/marketplace/${id}`}>VIEW</Link>
          </Button>
        </div>
      </div>
      {/* 
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="relative w-full max-w-sm rounded-3xl border-2 border-black bg-white">
          <div className="p-8 text-center">
         
            <Button
              variant="text"
              size="icon"
              className="absolute right-4 top-4 rounded-full border border-black hover:bg-gray-100"
            //   onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

        
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-600 bg-green-500">
                <Check className="h-8 w-8 stroke-[3] text-white" />
              </div>
            </div>

          
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Finalized</h2>
            <p className="text-sm text-gray-600">You can close this window now</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
