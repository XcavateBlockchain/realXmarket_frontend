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
import { parseUnits } from '@/lib/formaters';

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
    0: <SelectRole listingId={listingId} setIndex={setIndex} />
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="h-[48px] w-[153px] px-[55px] py-3">Claim</Button>
      </AlertDialogTrigger>
      {actions[index]}
    </AlertDialog>
  );
}

function ClaimPropertySuccess() {
  return (
    <AlertDialogContent className="max-w-[518px] p-6">
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
    </AlertDialogContent>
  );
}

function SelectRole({
  listingId,
  setIndex
}: {
  listingId: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { api } = useNodeContext();
  const [selectedValue, setSelectedValue] = useState('0');
  const { sendTransactionAsync, isPending } = useSendTransaction();

  async function handleSubmit() {
    try {
      if (!api || !api.registry.chainSS58) return;
      //   const parsePrice = parseUnits(String(500));
      const extrinsic = api.tx.marketplace.lawyerClaimProperty(
        listingId,
        Number(selectedValue),
        500
      );
      const receipt = await sendTransactionAsync({
        extrinsic: extrinsic as any
      });
      if (receipt.status === 'success') {
        console.log('Transaction successful:', receipt.transactionHash);
      } else {
        console.log('Transaction failed:', receipt.errorMessage);
      }
    } catch (error) {
      console.log('Transaction failed:', error);
    }
  }

  return (
    <AlertDialogContent className="p-6">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-center">Select Role</AlertDialogTitle>
        <AlertDialogDescription className="sr-only">
          <p>Legal Claim Property</p>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <RadioGroup className="gap-2" value={selectedValue} onValueChange={setSelectedValue}>
        <div className="flex w-full items-center justify-between rounded-lg bg-[#F5F5F5] px-2 py-[18px]">
          <label
            htmlFor="developer-lawyer"
            className="cursor-pointer text-[16px] font-semibold"
          >
            Developer Lawyer
          </label>
          <RadioGroupItem value="0" id="developer-lawyer" className="size-[16px]" />
        </div>
        <div className="flex w-full flex-col gap-[18px] rounded-lg px-2 py-3 shadow-property-card">
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
          <div className="flex items-center justify-between rounded-lg bg-[#4E4E4E]/[0.1] px-2.5 py-2">
            <div className="flex items-center">
              <Icons.copy className="size-5" /> SPV_Agreement_terms_v1.pdf
            </div>{' '}
            <button className="text-primary">Upload</button>
          </div>
        </div>
      </RadioGroup>
      <Button variant={'outline'} fullWidth onClick={handleSubmit} disabled={isPending}>
        Claim & Submit Terms
      </Button>
    </AlertDialogContent>
  );
}
