'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { useNodeContext } from '@/context';
import { useSendTransaction } from '@/hooks/use-send-txt';
import { toast } from 'sonner';

export function FinalizeSPVLawyer({ listingId }: { listingId: number }) {
  const { api } = useNodeContext();
  const { sendTransactionAsync, isPending, detailedStatus } = useSendTransaction();

  async function handleFinalizeSPVLawyer() {
    if (!api) return;
    try {
      const extrinsic = api.tx.marketplace.finalizeSpvLawyer(listingId);
      const receipt = await sendTransactionAsync({
        extrinsic: extrinsic as any,
        eventFilter: e => api.events.marketplace.SpvLawyerVoteFinalized.is(e.event)
      });

      if (receipt.status == 'success') {
        throw new Error(receipt.errorMessage);
      }
      toast.success('Transaction successful', {
        description: `TX Hash: ${receipt.transactionHash}`
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
  return (
    <Button disabled={isPending} onClick={handleFinalizeSPVLawyer}>
      {isPending ? detailedStatus : 'Finalize'}
    </Button>
  );
}
