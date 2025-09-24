import { useQuery } from '@tanstack/react-query';
import {
  fetchPropertyOwnersViaListing,
  getAllSpvLawyerProposals,
  getOngoingLawyerVoting,
  getPropertyLawyerInfo,
  getProposedLawyer,
  getSpvLawyerProposal,
  getUserLawyerVote
} from './queries';
import { blocksLeftToTime } from './utils';
import { ApiPromise } from '@polkadot/api';

export function useGetLawyerVotes(id: number) {
  return useQuery({
    queryKey: ['ongoing_votes', id],
    queryFn: async () => {
      return await getOngoingLawyerVoting(id);
    }
  });
}

export function useGetUserLawyerVoteForListing(id: number) {
  return useQuery({
    queryKey: ['user_lawyer_vote_for_listing', id],
    queryFn: async () => {
      return await getUserLawyerVote(id);
    }
  });
}

export function useGetPropertyOwnersViaListing(id: number) {
  return useQuery({
    queryKey: ['property_owners_via_listing', id],
    queryFn: async () => {
      return await fetchPropertyOwnersViaListing(id);
    }
  });
}

export function useGetPropertyLawyerInfo(id: number) {
  return useQuery({
    queryKey: ['property_lawyer_info', id],
    queryFn: async () => {
      return await getPropertyLawyerInfo(id);
    },
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });
}

export function useGetAllSpvLawyerProposals(address: string) {
  return useQuery({
    queryKey: ['all_spv_lawyer_proposals', address],
    queryFn: async () => {
      return await getAllSpvLawyerProposals(address);
    }
  });
}

export function useFetchSpvLawyerProposal(listingId: number) {
  return useQuery({
    queryKey: ['spv_lawyer_proposal', listingId],
    queryFn: async () => {
      return await getSpvLawyerProposal(listingId);
    },
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });
}

export function useFetchProposedDeveloperLawyerProposal(listingId: number) {
  return useQuery({
    queryKey: ['proposed_developer_lawyer_proposal', listingId],
    queryFn: async () => {
      return await getProposedLawyer(listingId);
    },
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });
}

export function useFetchBlocksLeftToTime(api: ApiPromise | null, targetBlock: number) {
  return useQuery({
    queryKey: ['blocks_left_to_time', targetBlock],
    queryFn: async () => {
      if (!api) return '0s';
      const header = await api.rpc.chain.getHeader();
      const currentBlock = header.number.toNumber();
      return blocksLeftToTime(currentBlock, targetBlock);
    }
  });
}
