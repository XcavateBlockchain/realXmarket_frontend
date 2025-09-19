import { useQuery } from '@tanstack/react-query';
import {
  fetchPropertyOwnersViaListing,
  getAllSpvLawyerProposals,
  getOngoingLawyerVoting,
  getPropertyLawyerInfo,
  getUserLawyerVote
} from './queries';

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
    }
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
