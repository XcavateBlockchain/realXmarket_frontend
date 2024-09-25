'use server';

import { unstable_noStore as noStore } from 'next/cache';

import { ApiPromise, WsProvider } from '@polkadot/api';

export async function getApi() {
  const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_RPC_URL);
  const api = await ApiPromise.create({ provider: wsProvider });
  return api;
}

export async function getNextListingId() {
  try {
    const api = await getApi();
    const result = await api.query.nftMarketplace.nextListingId();
    const output = result.toHuman();
    return output;
  } catch (error) {
    return null;
  }
}
export async function getTokenRemaining(itemId: number) {
  try {
    const api = await getApi();
    const result = await api.query.nftMarketplace.listedToken(itemId);
    const output = result.toHuman();
    return output;
  } catch (error) {
    return null;
  }
}

export async function getItemMetadata(collectionId: number, itemId: number) {
  const api = await getApi();

  const result = await api.query.nfts.itemMetadataOf(collectionId, itemId);
  const output = result.toHuman();
  return output; // output.data should contain the metadata
}

export async function getPropertyDetails(itemId: number) {
  noStore();
  try {
    const api = await getApi();
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
  const api = await getApi();
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
  const api = await getApi();
  const data = await api.query.nftMarketplace.ongoingObjectListing.entries();

  return data.map(([key, exposure]) => {
    return { listingId: key.args[0].toHuman(), listingDetails: exposure.toHuman() };
  });
}
// export async function getActiveProperties() {
// const api = await getApi();
// const nextId = (await api.query.nftMarketplace.nextListingId()).toHuman();
// const idsToCheck = getIntegersLessThan(nextId);
// let allData = [];
// for (const id of idsToCheck) {
//   const data = await api.query.nftMarketplace.ongoingObjectListing(id);
//   if (data.isSome) {
//     const tokenRemaining = await api.query.nftMarketplace.listedToken(id);
//     const property = data.unwrap().toHuman();
//     property['remainingTokens'] = tokenRemaining.toHuman();
//     allData.push(property);
//   }
// }

// return allData
// }

function getIntegersLessThan(n: any) {
  return Array.from({ length: n }, (_, i) => i);
}
