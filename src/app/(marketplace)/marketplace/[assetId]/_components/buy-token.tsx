'use client';

import { IProperty, ListingDetails, Property } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import { z } from 'zod';
import Form, { useZodForm } from '@/components/ui/form';
import { buyNft } from '@/lib/extrinsic';
import { Dispatch, ReactNode, SetStateAction, useState, useTransition } from 'react';
import { useSubstrateContext } from '@/context/polkadot-contex';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type AmountProps = {
  amount: number;
  tokens: any;
  data: ListingDetails;
  property: IProperty;
  close: () => void;
  setIndex: Dispatch<SetStateAction<number>>;
  setAmount: Dispatch<SetStateAction<number>>;
};

function SelectAmount({
  amount,
  setIndex,
  data,
  close,
  tokens,
  property,
  setAmount
}: AmountProps) {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-bold">Buy Tokens</h1>
        <Button variant={'text'} size={'icon'} onClick={close}>
          <Icons.close className="size-6" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Image
          src={property.fileUrls[0]}
          alt={property.property_name}
          width={100}
          height={100}
          priority
        />
        <div className="flex flex-col gap-2">
          <p className="text-[14px]/[24px]">Gade Homes</p>
          <h1 className="font-mona text-[16px]/[24px] font-medium">{property.property_name}</h1>
          <div className="flex items-center gap-1">
            <Image
              src={'/icons/pin_location.svg'}
              alt="loc"
              width={24}
              height={24}
              className="pointer-events-none"
            />
            <h3 className="font-mona  text-[14px]/[24px] font-semibold">
              {property.address_street} {property.address_town_city}
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full space-y-4 divide-y-2">
        <div className="flex items-center justify-between text-[16px]/[24px]">
          <span className="font-mona font-medium text-[#4E4E4E]">Price per Tokens :</span>
          <span className="font-bold">£2000</span>
        </div>
        <div className="flex flex-col rounded-sm bg-gray-100 p-2">
          <div className="flex justify-between">
            <span>Pay with:</span>
            <span className="font-bold">£{data.tokenPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Balance</span>
            <span className="font-bold">£{data.tokenPrice}</span>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="flex justify-between">
          <span>Tokens left:</span> <span className="text-[#78B36E]">{tokens} of 100</span>
        </div>

        <div className="space-y-5">
          <div className="flex w-full items-center justify-between rounded border px-2 py-4 text-[30px]/[40px] font-bold">
            <input
              id="amount"
              type="number"
              name="amount"
              className="border-none focus:outline-none"
              placeholder="0"
              value={amount}
              onChange={(e: any) => setAmount(e.target.value)}
            />
            <div
              role="button"
              className="text-[16px]/[24px] text-primary-400"
              onClick={() => setAmount(Number(tokens))}
            >
              max
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <Button type="button" variant={'outline'} size={'md'} onClick={close}>
              Cancel
            </Button>
            <Button
              size={'md'}
              type="submit"
              onClick={() => setIndex(2)}
              className="px-4 text-white"
              // disabled={amount === 0}
            >
              Buy
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

type SummaryProps = {
  amount: number;
  data: ListingDetails;
  property: IProperty;
  listingId: number;
  close: () => void;
  setIndex: Dispatch<SetStateAction<number>>;
};

function PurchaseSummary({
  listingId,
  close,
  data,
  amount,
  property,
  setIndex
}: SummaryProps) {
  const { address } = useSubstrateContext();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        // const address = '5Di7RnyX8TXwM9C9RCVHWTuXemwmRiJLiX3wapYgN588qB2E';
        await buyNft(address, listingId, amount);
        // console.log(amount);
        setIndex(3);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const totalPrice = Number(amount) * Number(data.tokenPrice);
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1>Are you absolutely sure?</h1>
        <Button variant={'text'} size={'icon'} onClick={close}>
          <Icons.close className="size-6" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Image
          src={property.fileUrls[0]}
          alt={property.property_name}
          width={100}
          height={100}
          priority
        />
        <div className="flex flex-col gap-2">
          <p className="text-[14px]/[24px]">Gade Homes</p>
          <h1 className="font-mona text-[16px]/[24px] font-medium">{property.property_name}</h1>
          <div className="flex items-center gap-1">
            <Image
              src={'/icons/pin_location.svg'}
              alt="loc"
              width={24}
              height={24}
              className="pointer-events-none"
            />
            <h3 className="font-mona  text-[14px]/[24px] font-semibold">
              {property.address_street} {property.address_town_city}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4  rounded-lg border px-2 py-4">
        <div className="flex w-full items-center justify-between border-b pb-4">
          <span>Number of tokens</span> <span>{amount}</span>
        </div>
        <div className="flex items-start justify-between border-b pb-4 text-[16px]/[24px]">
          <span className="font-mona font-medium text-[#4E4E4E]">Cost :</span>
          <div className="flex flex-col items-end gap-1 text-right">
            <span>£{data.tokenPrice}</span>
            <span>24,000.00 USDT</span>
          </div>
        </div>
        <div className="flex w-full items-center justify-between rounded-lg bg-[#3B4F74]/[0.10] p-2">
          <span>To Pay:</span> <span>{totalPrice}</span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          size={'md'}
          className="text-white disabled:bg-caption"
          type="submit"
          onClick={onSubmit}
          disabled={isPending}
        >
          Continue
        </Button>
      </div>
    </>
  );
}

function SuccessModal({ close }: { close: () => void }) {
  return (
    <>
      <div className="flex flex-col items-center space-y-4 p-4 py-1 md:p-5">
        <div className="mb-3 h-28 w-28 overflow-hidden rounded-full bg-white/[0.86]">
          <Image
            src={'/icons/tick.svg'}
            alt="success"
            width={112}
            height={112}
            priority
            className=" pointer-events-none rounded-full"
          />
        </div>
        <h1 className="text-center text-xl font-bold text-black">Successful</h1>
        <p className="text-center">
          Congratulations! Your NFT purchase was successful. You now own a fraction of Plot -
          Plea Wharf. Please note it might take a few minutes to reflect in your profile.
        </p>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant={'outline'} onClick={close}>
          Back
        </Button>
        <Button asChild>
          <Link href="/profile">Portfolio</Link>
        </Button>
      </div>
    </>
  );
}

interface FetchedProperty {
  [key: string]: any;
}

interface ISection {
  [key: number]: ReactNode;
}

export default function BuyToken({
  listingId,
  tokens,
  property,
  data
}: {
  listingId: number;
  tokens: any;
  property: IProperty;
  data: ListingDetails;
}) {
  const router = useRouter();
  const [openDialog, setIsDialogOpen] = useState(false);
  const [index, setIndex] = useState(1);
  const [amount, setAmount] = useState(0);

  function closeModal() {
    setIndex(1);
    setAmount(0);
    router.refresh();
    setIsDialogOpen(false);
  }

  const actions: ISection = {
    1: (
      <SelectAmount
        setAmount={setAmount}
        data={data}
        amount={amount}
        tokens={tokens}
        property={property}
        close={closeModal}
        setIndex={setIndex}
      />
    ),
    2: (
      <PurchaseSummary
        data={data}
        close={closeModal}
        amount={amount}
        property={property}
        setIndex={setIndex}
        listingId={listingId}
      />
    ),
    3: <SuccessModal close={closeModal} />
  };

  return (
    <AlertDialog open={openDialog} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button className="h-[48px] w-[153px] px-[55px] py-3">BUY</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-lg p-6">{actions[index]}</AlertDialogContent>
    </AlertDialog>
  );
}
