'use client';

import { Button } from '@/components/ui/button';
import { getCookieStorage } from '@/lib/cookie-storage';
import { claimProperty } from '@/lib/extrinsic';
import { STATE_STATUS } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ClaimProperty({ listingId }: { listingId: number }) {
  const router = useRouter();
  const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);

  async function onClaim() {
    setStatus(STATE_STATUS.LOADING);
    try {
      const address = await getCookieStorage('accountKey');
      if (!address) {
        toast.error('Please connect your wallet');
        return;
      }
      await claimProperty(address, listingId);
      setStatus(STATE_STATUS.SUCCESS);
      router.refresh();
    } catch (error: any) {
      console.error(error);
      setStatus(STATE_STATUS.ERROR);
      toast.error(error?.error ? error?.error?.message : error?.message);
    } finally {
      setStatus(STATE_STATUS.SUCCESS);
    }
  }

  return (
    <Button disabled={status === STATE_STATUS.LOADING} onClick={onClaim}>
      {status === STATE_STATUS.LOADING ? 'Processing' : 'Claim'}
    </Button>
  );
}
