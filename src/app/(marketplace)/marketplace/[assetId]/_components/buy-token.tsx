'use client';

import { Property } from '@/types';
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
  property: FetchedProperty;
  data: Property;
}) {
  const [openDialog, setIsDialogOpen] = useState(false);
  const [index, setIndex] = useState(1);
  const [amount, setAmount] = useState(0);

  function closeModal() {
    setIsDialogOpen(false);
  }

  const actions: ISection = {
    1: (
      <SelectAmount
        setAmount={setAmount}
        amount={amount}
        tokens={tokens}
        property={property}
        close={close}
        setIndex={setIndex}
      />
    ),
    2: <PurchaseSummary amount={amount} property={property} listingId={listingId} />
  };

  return (
    <AlertDialog open={openDialog} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button>BUY</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-lg p-6">
        <div className="flex w-full items-center justify-between">
          <h1>Are you absolutely sure?</h1>
          <Button variant={'text'} size={'icon'} onClick={close}>
            <Icons.close className="size-6" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Image
            src={data.property_image}
            alt={data.property_name}
            width={100}
            height={100}
            priority
          />
          <div className="flex flex-col gap-2">
            <p className="text-[14px]/[24px]">Gade Homes</p>
            <h1 className="font-mona text-[16px]/[24px] font-medium">{data.property_name}</h1>
            <div className="flex items-center gap-1">
              <Image
                src={'/icons/pin_location.svg'}
                alt="loc"
                width={24}
                height={24}
                className="pointer-events-none"
              />
              <h3 className="font-mona  text-[14px]/[24px] font-semibold">
                {data.address_street} {data.address_town_city}
              </h3>
            </div>
          </div>
        </div>
        {actions[index]}
      </AlertDialogContent>
    </AlertDialog>
  );
}

type AmountProps = {
  amount: number;
  tokens: any;
  property: FetchedProperty;
  close: () => void;
  setIndex: Dispatch<SetStateAction<number>>;
  setAmount: Dispatch<SetStateAction<number>>;
};

function SelectAmount({ amount, setIndex, tokens, property, setAmount }: AmountProps) {
  return (
    <>
      <div className="w-full space-y-4 divide-y-2">
        <div className="flex items-center justify-between text-[16px]/[24px]">
          <span className="font-mona font-medium text-[#4E4E4E]">Number of tokens :</span>
          <span>10</span>
        </div>
        <div className="flex items-start justify-between pt-4 text-[16px]/[24px]">
          <span className="font-mona font-medium text-[#4E4E4E]">Cost :</span>
          <div className="flex flex-col items-end gap-1 text-right">
            <span>£{property.tokenPrice}</span>
            <span>24,000.00 USDT</span>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="flex justify-between">
          <span>Tokens available:</span> <span>{tokens}</span>
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
            <Button type="button" variant={'outline'} size={'md'}>
              Cancel
            </Button>
            <Button
              size={'md'}
              type="submit"
              onClick={() => setIndex(2)}
              disabled={amount === 0}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

type SummaryProps = {
  amount: number;
  property: FetchedProperty;
  listingId: number;
};

function PurchaseSummary({ listingId, amount, property }: SummaryProps) {
  const router = useRouter();
  const { address } = useSubstrateContext();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        // const address = '5Di7RnyX8TXwM9C9RCVHWTuXemwmRiJLiX3wapYgN588qB2E';
        await buyNft(address, listingId, amount);
        console.log(amount);
        // router.push('/portfolio');
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <>
      <div className="flex flex-col gap-4  rounded-lg border px-2 py-4">
        <div className="flex w-full items-center justify-between border-b pb-4">
          <span>Number of tokens</span> <span>{amount}</span>
        </div>
        <div className="flex items-start justify-between border pb-4 text-[16px]/[24px]">
          <span className="font-mona font-medium text-[#4E4E4E]">Cost :</span>
          <div className="flex flex-col items-end gap-1 text-right">
            <span>£{property.tokenPrice}</span>
            <span>24,000.00 USDT</span>
          </div>
        </div>
        <div className="flex w-full items-center justify-between rounded-lg bg-[#3B4F74]/[0.10] p-2">
          <span>To Pay:</span> <span>{Number(property.tokenPrice) * amount}</span>
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
