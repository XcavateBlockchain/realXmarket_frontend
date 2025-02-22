'use server';

import { unstable_noStore as noStore } from 'next/cache';

import { ApiPromise, HttpProvider } from '@polkadot/api';
import { getApi } from './polkadot';

const apiPRomise = getApi(new HttpProvider(process.env.NEXT_PUBLIC_RPC_HTTP));

// export async function getApi() {
//   const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_RPC_URL);
//   const api = await ApiPromise.create({ provider: wsProvider });
//   return api;
// }

export async function getNextListingId() {
  try {
    const api = await apiPRomise;
    const result = await api.query.nftMarketplace.nextListingId();
    const output = result.toHuman();
    return output;
  } catch (error) {
    return null;
  }
}
export async function checkIfWhiteListed(address: string) {
  try {
    const api = await apiPRomise;
    const result = await api.query.xcavateWhitelist.whitelistedAccounts(address);
    const output = result.toHuman();
    return output;
  } catch (error) {
    return null;
  }
}
export async function getTokenRemaining(itemId: number) {
  try {
    const api = await apiPRomise;
    const result = await api.query.nftMarketplace.listedToken(itemId);
    const output = result.toHuman();
    return output;
  } catch (error) {
    return null;
  }
}

export async function getItemMetadata(collectionId: number, itemId: number) {
  const api = await apiPRomise;

  const result = await api.query.nfts.itemMetadataOf(collectionId, itemId);
  const output = result.toHuman();
  return output as any; // output.data should contain the metadata
}

export async function getPropertyDetails(itemId: number) {
  noStore();
  try {
    const api = await apiPRomise;
    const result = await api.query.nftMarketplace.ongoingObjectListing(itemId);
    const output = result.toHuman();
    return output;
  } catch (error) {
    return null;
  }
}

interface Property {
  [key: string]: any;
  remainingTokens?: any;
}

export async function getActiveProperties() {
  try {
    const nextId = await getNextListingId();
    const listedIds = getIntegersLessThan(nextId);
    let data = [];
    for (const id of listedIds) {
      const property = (await getPropertyDetails(id)) as Property;
      if (property !== null) {
        const tokenRemaining = await getTokenRemaining(id);
        property['remainingTokens'] = tokenRemaining;
        data.push(property);
      }
    }
    return data;
  } catch (error) {
    return [];
  }
}

export async function getAllListingsByAddress(address: string) {
  const api = await apiPRomise;
  const data = await api.query.gameModule.listings.entries();

  const listingDataForAccount = data
    .filter(([key, exposure]) => {
      const listingData = exposure.toHuman() as { owner: string };
      return listingData.owner == address;
    })
    .map(([key, exposure]) => {
      let listingId = key.args[0].toHuman() as number;
      return { [listingId]: exposure.toHuman() };
    });

  return listingDataForAccount;
  // [{listingId: {owner, collectionId, itemId}}, ...]
}

export async function getAllOngoingListings() {
  const api = await apiPRomise;
  const data = await api.query.nftMarketplace.ongoingObjectListing.entries();

  return data.map(([key, exposure]) => {
    return { listingId: key.args[0].toHuman(), listingDetails: exposure.toHuman() };
  });
}

export async function getAllOngoingListingsWhereAddressIsDeveloper(address: string) {
  const api = await apiPRomise;
  const data = await api.query.nftMarketplace.ongoingObjectListing.entries();

  return data
    .filter(
      ([key, exposure]: [any, any]) => exposure.toHuman()['realEstateDeveloper'] == address
    )
    .map(([key, exposure]) => {
      return {
        listingId: key.args[0].toHuman() as any,
        listingDetails: exposure.toHuman() as any
      };
    });
}

export async function getAllTokenBuyers() {
  const api = await apiPRomise;
  const data = await api.query.nftMarketplace.tokenBuyer.entries();

  return data.map(([key, exposure]) => {
    return { listingId: key.args[0].toHuman(), owners: exposure.toHuman() };
  });
}

export async function getAllTokenBuyerForListing(listingId: number) {
  const api = await apiPRomise;
  const data = await api.query.nftMarketplace.tokenBuyer(listingId);

  return data.toHuman();
}

export async function getTokensAndListingsOwnedByAccount(address: string) {
  const api = await apiPRomise;
  const data = await api.query.nftMarketplace.tokenOwner.entries(address);

  return data.map(([key, exposure]) => {
    // console.log('KEY1', key.args[0].toHuman());
    // console.log('KEY2', key.args[1].toHuman());
    // console.log('EXPOSURE', exposure.toHuman());

    return {
      listingId: key.args[1].toHuman(),
      tokensOwned: exposure.toHuman()
    };
  });
}

export async function getOnGoingObjectListing(listingId: number) {
  const api = await apiPRomise;

  const result = await api.query.nftMarketplace.ongoingObjectListing(listingId);
  const output = result.toHuman();
  return output as any; // output.data should contain the metadata
}

function getIntegersLessThan(n: any) {
  return Array.from({ length: n }, (_, i) => i);
}

// export async function getListingById() {
//   const api = await apiPRomise
//   const data = await api.query.nftMarketplace.ongoingObjectListing.entries();

//   return data
//     .filter(([key, exposure]: [any, any]) => exposure.toHuman())
//     .map(([key, exposure]) => {

//       return {
//         listingId: key.args[0].toHuman() as any,
//         listingDetails: exposure.toHuman() as any
//       };
//     });
// }
