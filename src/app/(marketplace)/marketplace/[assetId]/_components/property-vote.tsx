'use client';

import * as React from 'react';

import { Progress } from '@/components/ui/progress';
import { useNodeContext } from '@/context';
import { useSendTransaction } from '@/hooks/use-send-txt';
import { toast } from 'sonner';
import { calcCurvePercent, convertBlocksToTime } from '@/lib/utils';
import {
  useGetLawyerVotes,
  useGetPropertyLawyerInfo,
  useGetPropertyOwnersViaListing,
  useGetUserLawyerVoteForListing
} from '@/lib/system-queries';
import Skeleton from '@/components/skelton';

export function PropertyVote({ listingId }: { listingId: number }) {
  const { api } = useNodeContext();
  const { sendTransactionAsync, isPending } = useSendTransaction();
  const { data: lawyerVotes, isLoading, refetch } = useGetLawyerVotes(listingId);
  const {
    data: userLawyerVote,
    isLoading: isUserLawyerVoteLoading,
    refetch: refetchUserLawyerVote
  } = useGetUserLawyerVoteForListing(listingId);
  const {
    data: propertyOwners,
    isLoading: isPropertyOwnersLoading,
    refetch: refetchPropertyOwners
  } = useGetPropertyOwnersViaListing(listingId);

  function voteProgress(yesVotingPower = 0, noVotingPower = 0, maxVote = 100) {
    const totalVote = yesVotingPower + noVotingPower;
    const percent = calcCurvePercent(totalVote, maxVote);
    const yesPercent = calcCurvePercent(yesVotingPower, maxVote);
    const noPercent = calcCurvePercent(noVotingPower, maxVote);
    return {
      totalVote,
      percent,
      yesPercent,
      noPercent
    };
  }

  const voteData = React.useMemo(() => {
    if (!lawyerVotes) return null;
    return voteProgress(
      Number(lawyerVotes.yesVotingPower) ?? 0,
      Number(lawyerVotes.noVotingPower) ?? 0,
      100
    );
  }, [lawyerVotes]);

  async function handleSPVLawyerVoting(vote: number) {
    if (!api) return;
    try {
      const extrinsic = api.tx.marketplace.voteOnSpvLawyer(listingId, vote);
      const receipt = await sendTransactionAsync({
        extrinsic: extrinsic as any
      });
      console.log(receipt.errorMessage);
      console.log(receipt.events);
      console.log(receipt.blockHash);
      console.log(receipt.status);
      // if (!receipt.)
      // if (receipt.dispatchError)
      if (receipt.status === 'success') {
        toast.success('Transaction successful');
        refetch();
        refetchUserLawyerVote();
        refetchPropertyOwners();
      } else {
        toast.error(receipt.errorMessage);
      }
    } catch (error: any) {
      toast.error(error?.error ? error?.error?.message : error?.message);
    }
  }

  if (lawyerVotes === null) return null;

  return (
    <div className="w-full space-y-2.5">
      {isLoading ? (
        <Skeleton className="h-3 w-full rounded-[20px]" />
      ) : (
        <Progress value={voteData?.percent} className="h-3 w-full" />
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center font-sans text-[14px]/[100%] font-normal text-caption">
          {isUserLawyerVoteLoading || isPropertyOwnersLoading ? (
            <Skeleton className="h-3 w-16" />
          ) : (
            <span>
              {userLawyerVote ? userLawyerVote.length : 0} of{' '}
              {propertyOwners ? propertyOwners.length : 0}
            </span>
          )}
          <span>Investors have voted</span>
        </div>
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2.5">
            {isLoading ? (
              <Skeleton className="h-[18px] w-[86px]" />
            ) : (
              <span className="text-[14px]/[100%] text-[#78B36E]">
                Approve {voteData?.yesPercent}%
              </span>
            )}
            <button
              className="rounded bg-[#78B36E] px-2 py-1 font-sans text-[14px]/[100%] font-bold text-white disabled:bg-[#78B36E]/50 disabled:text-white/50"
              onClick={() => handleSPVLawyerVoting(0)}
              disabled={isPending || voteData?.percent === 100}
            >
              Accept
            </button>
          </div>
          <div className="flex items-center gap-2.5">
            {isLoading ? (
              <Skeleton className="h-[18px] w-[86px]" />
            ) : (
              <span className="text-[14px]/[100%] text-[#FF3B30]">
                Reject {voteData?.noPercent}%
              </span>
            )}
            <button
              className="rounded bg-[#FF3B30] px-2 py-1 font-sans text-[14px]/[100%] font-bold text-white disabled:bg-[#FF3B30]/50 disabled:text-white/50"
              onClick={() => handleSPVLawyerVoting(1)}
              disabled={isPending || voteData?.percent === 100}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
