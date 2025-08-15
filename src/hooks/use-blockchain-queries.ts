'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getNextListingId,
  checkIfWhiteListed,
  getTokenRemaining,
  getItemMetadata,
  getPropertyDetails,
  getActiveProperties,
  getAllListingsByAddress,
  getAllOngoingListings,
  getAllOngoingListingsWhereAddressIsDeveloper,
  getAllTokenBuyers,
  getAllTokenBuyerForListing,
  getTokensAndListingsOwnedByAccount,
  getOnGoingObjectListing,
  checkBlock
} from '@/lib/queries';

// Query keys for React Query
export const blockchainQueryKeys = {
  nextListingId: ['blockchain', 'nextListingId'] as const,
  whitelistStatus: (address: string) => ['blockchain', 'whitelist', address] as const,
  tokenRemaining: (itemId: number) => ['blockchain', 'tokenRemaining', itemId] as const,
  itemMetadata: (collectionId: number, itemId: number) =>
    ['blockchain', 'itemMetadata', collectionId, itemId] as const,
  propertyDetails: (itemId: number) => ['blockchain', 'propertyDetails', itemId] as const,
  activeProperties: ['blockchain', 'activeProperties'] as const,
  listingsByAddress: (address: string) =>
    ['blockchain', 'listingsByAddress', address] as const,
  ongoingListings: ['blockchain', 'ongoingListings'] as const,
  developerListings: (address: string) =>
    ['blockchain', 'developerListings', address] as const,
  tokenBuyers: ['blockchain', 'tokenBuyers'] as const,
  tokenBuyerForListing: (listingId: number) =>
    ['blockchain', 'tokenBuyerForListing', listingId] as const,
  tokensAndListingsOwned: (address: string) =>
    ['blockchain', 'tokensAndListingsOwned', address] as const,
  ongoingObjectListing: (listingId: number) =>
    ['blockchain', 'ongoingObjectListing', listingId] as const,
  blockCheck: (targetBlock: number) => ['blockchain', 'blockCheck', targetBlock] as const
};

// Hook for getting next listing ID
export function useNextListingId() {
  return useQuery({
    queryKey: blockchainQueryKeys.nextListingId,
    queryFn: getNextListingId,
    staleTime: 30000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Hook for checking whitelist status
export function useWhitelistStatus(address: string) {
  return useQuery({
    queryKey: blockchainQueryKeys.whitelistStatus(address),
    queryFn: () => checkIfWhiteListed(address),
    enabled: !!address,
    staleTime: 60000, // 1 minute
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Hook for getting token remaining
export function useTokenRemaining(itemId: number) {
  return useQuery({
    queryKey: blockchainQueryKeys.tokenRemaining(itemId),
    queryFn: () => getTokenRemaining(itemId),
    enabled: itemId !== undefined && itemId !== null,
    staleTime: 30000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Hook for getting item metadata
export function useItemMetadata(collectionId: number, itemId: number) {
  return useQuery({
    queryKey: blockchainQueryKeys.itemMetadata(collectionId, itemId),
    queryFn: () => getItemMetadata(collectionId, itemId),
    enabled: collectionId !== undefined && itemId !== undefined,
    staleTime: 60000, // 1 minute
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Hook for getting property details
export function usePropertyDetails(itemId: number) {
  return useQuery({
    queryKey: blockchainQueryKeys.propertyDetails(itemId),
    queryFn: () => getPropertyDetails(itemId),
    enabled: itemId !== undefined && itemId !== null,
    staleTime: 30000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Hook for getting active properties
export function useActiveProperties() {
  return useQuery({
    queryKey: blockchainQueryKeys.activeProperties,
    queryFn: getActiveProperties,
    staleTime: 60000, // 1 minute
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Hook for getting listings by address
export function useListingsByAddress(address: string) {
  return useQuery({
    queryKey: blockchainQueryKeys.listingsByAddress(address),
    queryFn: () => getAllListingsByAddress(address),
    enabled: !!address,
    staleTime: 60000, // 1 minute
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Hook for getting all ongoing listings
export function useOngoingListings() {
  return useQuery({
    queryKey: blockchainQueryKeys.ongoingListings,
    queryFn: getAllOngoingListings,
    staleTime: 60000, // 1 minute
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Hook for getting developer listings
export function useDeveloperListings(address: string) {
  return useQuery({
    queryKey: blockchainQueryKeys.developerListings(address),
    queryFn: () => getAllOngoingListingsWhereAddressIsDeveloper(address),
    enabled: !!address,
    staleTime: 60000, // 1 minute
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Hook for getting all token buyers
export function useTokenBuyers() {
  return useQuery({
    queryKey: blockchainQueryKeys.tokenBuyers,
    queryFn: getAllTokenBuyers,
    staleTime: 60000, // 1 minute
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Hook for getting token buyers for a specific listing
export function useTokenBuyerForListing(listingId: number) {
  return useQuery({
    queryKey: blockchainQueryKeys.tokenBuyerForListing(listingId),
    queryFn: () => getAllTokenBuyerForListing(listingId),
    enabled: listingId !== undefined && listingId !== null,
    staleTime: 30000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Hook for getting tokens and listings owned by account
export function useTokensAndListingsOwned(address: string) {
  return useQuery({
    queryKey: blockchainQueryKeys.tokensAndListingsOwned(address),
    queryFn: () => getTokensAndListingsOwnedByAccount(address),
    enabled: !!address,
    staleTime: 60000, // 1 minute
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Hook for getting ongoing object listing
export function useOngoingObjectListing(listingId: number) {
  return useQuery({
    queryKey: blockchainQueryKeys.ongoingObjectListing(listingId),
    queryFn: () => getOnGoingObjectListing(listingId),
    enabled: listingId !== undefined && listingId !== null,
    staleTime: 30000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Hook for checking block
export function useBlockCheck(targetBlock: number) {
  return useQuery({
    queryKey: blockchainQueryKeys.blockCheck(targetBlock),
    queryFn: () => checkBlock(targetBlock),
    enabled: targetBlock !== undefined && targetBlock !== null,
    staleTime: 10000, // 10 seconds for block checks
    gcTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}

// Utility hook for invalidating queries
export function useInvalidateBlockchainQueries() {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ['blockchain'] });
  };

  const invalidateByKey = (queryKey: string[]) => {
    queryClient.invalidateQueries({ queryKey });
  };

  return { invalidateAll, invalidateByKey };
}
