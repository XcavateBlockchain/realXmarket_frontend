'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { useNodeContext } from '@/context';
import { useSendTransaction } from '@/hooks/use-send-txt';
import { toast } from 'sonner';

export function FinalizeSPVLawyer({ listingId }: { listingId: number }) {
  const { api } = useNodeContext();
  const { sendTransactionAsync, isPending } = useSendTransaction();

  async function handleFinalizeSPVLawyer() {
    if (!api) return;
    try {
      const extrinsic = api.tx.marketplace.finalizeSpvLawyer(listingId);
      const receipt = await sendTransactionAsync({
        extrinsic: extrinsic as any
      });

      console.log(receipt.errorMessage);
      console.log(receipt.events);
      console.log(receipt.blockHash);
      console.log(receipt.status);
      if (receipt.status === 'success') {
        toast.success('Transaction successful');
      } else {
        toast.error(receipt.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button disabled={isPending} onClick={handleFinalizeSPVLawyer}>
      Finalize
    </Button>
  );
}
