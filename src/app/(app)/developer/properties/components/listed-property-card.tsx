'use client';

import { Button } from '@/components/ui/button';
import { formatAPY, formatNumber, formatPrice } from '@/lib/utils';
import { IPropertyMetadata, STATE_STATUS } from '@/types';
import { listProperty } from '@/lib/extrinsic';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { ImageIcon, LoaderCircle, X } from 'lucide-react';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getCookieStorage } from '@/lib/cookie-storage';
import { useRouter } from 'next/navigation';
import ImageComponent from '@/components/image-component';
import { checkBlock } from '@/lib/queries';
import { reclaimUnsold, TransactionStatus } from '@/lib/submit-transaction';
import { useNodeContext } from '@/context';

export default function ListedPropertyCard({
  listingId,
  tokenRemaining: _tokenRemaining,
  listingExpiry,
  property,
  fileUrls
}: {
  fileUrls: string[];
  listingId: string;
  tokenRemaining: string;
  listingExpiry: string;
  property: IPropertyMetadata;
}) {
  const router = useRouter();
  const { api } = useNodeContext();
  const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);
  const [showListedModal, setShowListedModal] = useState(false);
  const [passed, setPassed] = useState<boolean>(false);

  const blockNumber = Number(listingExpiry.replace(/,/g, ''));

  useEffect(() => {
    async function check() {
      const isPassed = await checkBlock(blockNumber);
      setPassed(isPassed);
    }
    check();
  }, [blockNumber, setPassed]);

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
        property.financials.pricePerToken,
        property.financials.numberOfTokens,
        property
      );
      setShowListedModal(true);
      router.refresh();
      router.push('/developer/properties?status=listed');
    } catch (error: any) {
      setStatus(STATE_STATUS.ERROR);
      toast.error(error?.error ? error?.error?.message : error?.message);
    }
    setStatus(STATE_STATUS.SUCCESS);
  }

  async function onReclaim() {
    setStatus(STATE_STATUS.LOADING);
    try {
      const address = await getCookieStorage('accountKey');
      if (!address) {
        toast.error('Please connect your wallet');
        return;
      }

      const result = await reclaimUnsold(api!, Number(listingId), address, {
        waitForFinalization: true,
        timeout: 120000 // 2 minutes
      });

      switch (result.status) {
        case TransactionStatus.FINALIZED:
          toast.success('Property successfully reclaimed!');
          setStatus(STATE_STATUS.SUCCESS);
          router.refresh();
          break;
        case TransactionStatus.IN_BLOCK:
          toast.info('Transaction in progress...');
          break;
        case TransactionStatus.ERROR:
          setStatus(STATE_STATUS.ERROR);
          toast.error(`Transaction failed: ${result.error}`);
          break;
      }
    } catch (error: any) {
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
    <>
      <div className="relative flex w-[320px] flex-col gap-6 rounded-lg bg-white pb-6 shadow-property-card">
        {fileUrls && fileUrls.length >= 1 ? (
          <div className="relative">
            <div className="aspect-square h-[255px] w-full">
              <ImageComponent
                fill={true}
                src={fileUrls[0]}
                alt={property.propertyName}
                className="rounded-t-lg object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="flex h-[255px] w-full items-center justify-center rounded-t-lg bg-[#4E4E4E]/[0.10] text-primary/50">
            <ImageIcon size={130} />
          </div>
        )}

        <div className="absolute inset-4">
          <span className="items-center gap-1 rounded-lg bg-white px-2 py-[2px] text-[0.75rem] text-primary-200">
            {property.propertyType}
          </span>
        </div>

        {passed && (
          <div className="absolute right-4 top-4">
            <span className="items-center gap-1 rounded-lg bg-primary-300 px-2 py-[2px] text-[0.75rem] text-white">
              Expired
            </span>
          </div>
        )}

        <div className="relative flex flex-col gap-4 px-4">
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <dt>{property.propertyName}</dt>
              <dd className="">
                APY{' '}
                {formatAPY(
                  property.financials.estimatedRentalIncome || 0,
                  property.financials.propertyPrice
                )}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Tokens {formatNumber(property.financials.numberOfTokens)}</dt>
              <dd className="">Price {formatPrice(property.financials.propertyPrice)}</dd>
            </div>
          </div>

          <div className="flex w-full gap-2">
            {passed ? (
              <Button
                variant={'filled'}
                className=" bg-primary-200 hover:bg-primary-200/75"
                onClick={onReclaim}
                fullWidth
              >
                Reclaim
              </Button>
            ) : (
              <Button
                variant={'filled'}
                fullWidth
                // disabled={status === STATE_STATUS.LOADING}
                onClick={onListProperty}
              >
                {/* {status === STATE_STATUS.LOADING && (
                  <LoaderCircle size={16} className=" animate-spin" />
                )} */}
                De-List
              </Button>
            )}
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
            <div className="flex size-[140px] items-center justify-center rounded-full bg-white/[0.10]">
              <Image
                src={'/icons/tick.svg'}
                alt="success"
                width={115}
                height={115}
                priority
                className="pointer-events-none rounded-full"
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
