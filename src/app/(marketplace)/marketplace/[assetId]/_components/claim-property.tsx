'use client';

import { Button } from '@/components/ui/button';
import { useNodeContext } from '@/context';
import { useSendTransaction } from '@/hooks/use-send-txt';
// import { getCookieStorage } from '@/lib/cookie-storage';
// import { claimProperty } from '@/lib/extrinsic';
// import { STATE_STATUS } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ClaimProperty({ listingId }: { listingId: number }) {
  const { api } = useNodeContext();
  const { sendTransactionAsync, isPending, detailedStatus } = useSendTransaction();
  const router = useRouter();
  // const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);

  // async function onClaim() {
  //   setStatus(STATE_STATUS.LOADING);
  //   try {
  //     const address = await getCookieStorage('accountKey');
  //     if (!address) {
  //       toast.error('Please connect your wallet');
  //       return;
  //     }
  //     await claimProperty(address, listingId);
  //     setStatus(STATE_STATUS.SUCCESS);
  //     router.refresh();
  //   } catch (error: any) {
  //     console.error(error);
  //     setStatus(STATE_STATUS.ERROR);
  //     toast.error(error?.error ? error?.error?.message : error?.message);
  //   } finally {
  //     setStatus(STATE_STATUS.SUCCESS);
  //   }
  // }

  async function handleClaim() {
    if (!api) return;
    try {
      const extrinsic = api.tx.marketplace.claimPropertyToken(listingId);
      const receipt = await sendTransactionAsync({
        extrinsic: extrinsic as any,
        eventFilter: e => api.events.marketplace.PropertyTokenClaimed.is(e.event)
      });
      if (receipt.status !== 'success') {
        throw new Error(receipt.errorMessage);
      }
      toast.success('Transaction successful', {
        description: `TX Hash: ${receipt.transactionHash}`
      });
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }

  return (
    <Button disabled={isPending} onClick={handleClaim}>
      {isPending ? detailedStatus : 'Claim'}
    </Button>
  );
}
