'use client';

import { useState } from 'react';
import { Icons } from '@/components/icons';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { useSendTransaction } from '@/hooks/use-send-txt';
import { useNodeContext } from '@/context';
import Form, { useZodForm } from '@/components/ui/form';
import { z } from 'zod';
import SelectInput from '@/components/select-input';
import { cn } from '@/lib/utils';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';

export default function LegalClaimProperty({
  price,
  listingId
}: {
  price: number;
  listingId: number;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const actions: any = {
    1: <ClaimPropertySuccess />,
    0: <SelectRole listingId={listingId} setIndex={setIndex} price={price} />
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="h-[48px] w-[153px] px-[55px] py-3">Claim</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[518px] p-6">
        <Button
          variant="outline"
          size="icon"
          className=" absolute right-6 top-6"
          onClick={() => setOpen(false)}
        >
          <Icons.close className="size-[16px]" />
        </Button>
        {actions[index]}
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ClaimPropertySuccess() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex size-[100px] items-center  justify-center rounded-full border border-primary">
          <Image
            src="/icons/verify_your_identity.svg"
            alt="verify_your_identity"
            width={100}
            height={100}
          />
        </div>
        <span className="text-[18px]/[24px] font-bold">Claim Submitted</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <p className="font-sans text-[14px]/[24px]">
          Your property token has been created, and the information you supplied is now under
          review by our compliance team. You can view it anytime in your Draft. Once it passes
          review, it will move to your Approved section, where you can list it on the
          RealXMarket for investors.
        </p>
        <div className="w-full rounded-lg bg-primary/10 px-2 py-2.5 text-left font-sans text-[12px]/[16px] text-primary">
          Once the majority of token holders approve your terms, the property will be placed
          under your instruction.
        </div>
        <div className="w-full space-y-2.5">
          <Button variant={'filled'} fullWidth>
            View Draft
          </Button>
          <Button variant={'outline'} fullWidth>
            Cancel Clam
          </Button>
        </div>
      </div>
    </>
  );
}

function SelectRole({
  listingId,
  price,
  setIndex
}: {
  price: number;
  listingId: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { api } = useNodeContext();
  const [selectedValue, setSelectedValue] = useState('0');
  const [cost, setCost] = useState(0);
  const { sendTransactionAsync, isPending, detailedStatus } = useSendTransaction();

  async function handleSubmit() {
    try {
      if (!api || !api.registry.chainSS58) return;
      //   const parsePrice = parseUnits(String(500));
      const extrinsic = api.tx.marketplace.lawyerClaimProperty(
        listingId,
        Number(selectedValue),
        Number(cost)
      );
      const receipt = await sendTransactionAsync({
        extrinsic: extrinsic as any
      });
      if (receipt.status !== 'success') {
        throw new Error(receipt.errorMessage);
      }
      setIndex(1);
      toast.success('Transaction successful', {
        description: `TX Hash: ${receipt.transactionHash}`
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-center">Select Role</AlertDialogTitle>
        <AlertDialogDescription className="sr-only">
          <p>Legal Claim Property</p>
        </AlertDialogDescription>
      </AlertDialogHeader>

      <RadioGroup className="gap-2" value={selectedValue} onValueChange={setSelectedValue}>
        <div className=" flex w-full flex-col gap-[18px] rounded-lg px-2 py-3 shadow-property-card">
          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="developer-lawyer"
              className="cursor-pointer text-[16px] font-semibold"
            >
              Developer Lawyer
            </label>
            <RadioGroupItem value="0" id="developer-lawyer" className="size-[16px]" />
          </div>
          <hr className="border-[#717171]/[0.1]" />

          {selectedValue === '0' && (
            <div className="flex w-full items-center gap-1 rounded-lg border border-caption bg-white px-2 py-[6px]">
              <NumericFormat
                thousandSeparator=","
                allowNegative={false}
                max={Number(price) * 0.01}
                placeholder="0.00"
                className={cn(
                  'flex w-full border-caption  bg-background text-sm outline-none placeholder:text-muted-foreground  focus:outline-none focus:ring-0'
                )}
                value={cost}
                onChange={e => setCost(Number(e.target.value))}
              />
              <span className="flex w-[154px] items-end justify-end text-[12px]/[100%]  text-[#4E4E4E]/50">
                MAX {Number(price) * 0.01} USDT
              </span>
            </div>
          )}
        </div>
        <div className=" flex w-full flex-col gap-[18px] rounded-lg px-2 py-3 shadow-property-card">
          <div className="flex w-full items-center justify-between">
            <label htmlFor="spv-lawyer" className="cursor-pointer text-[16px] font-semibold">
              SPV Lawyer
            </label>
            <RadioGroupItem value="1" id="spv-lawyer" className="size-[16px]" />
          </div>
          <hr className="border-[#717171]/[0.1]" />
          <p className="text-[14px] text-[#717171]">
            Appointed by Xcavate platform (or by investors collectively) to represent investor
            interests. Ensures investor funds remain secure.
          </p>
          {selectedValue === '1' && (
            <>
              <div className="flex w-full items-center gap-1 rounded-lg border border-caption bg-white px-2 py-[6px]">
                <NumericFormat
                  thousandSeparator=","
                  allowNegative={false}
                  max={Number(price) * 0.01}
                  placeholder="0.00"
                  className={cn(
                    'flex w-full border-caption  bg-background text-sm outline-none placeholder:text-muted-foreground  focus:outline-none focus:ring-0'
                  )}
                  value={cost}
                  onChange={e => setCost(Number(e.target.value))}
                />
                <span className="flex w-[154px] items-end justify-end text-[12px]/[100%]  text-[#4E4E4E]/50">
                  MAX {Number(price) * 0.01} USDT
                </span>
              </div>
            </>
          )}
        </div>
      </RadioGroup>
      <Button variant={'outline'} fullWidth disabled={isPending} onClick={handleSubmit}>
        {isPending ? detailedStatus : 'Claim & Submit Terms'}
      </Button>
    </>
  );
}
