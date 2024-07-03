'use client';

import { ApiPromise, WsProvider } from '@polkadot/api';

export async function getApi() {
  const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_RPC_URL);
  const api = await ApiPromise.create({ provider: wsProvider });
  return api;
}

export async function getItemMetadata(collectionId: number, itemId: number) {
  const api = await getApi();

  const result = await api.query.nfts.itemMetadataOf(collectionId, itemId);
  const output = result.toHuman();
  return output; // output.data should contain the metadata
}

export async function getProjectDetails(itemId: number) {
  const api = await getApi();

  const result = await api.query.nftMarketplace.ongoingObjectListing(itemId);
  const output = result.toHuman();
  return output;
}
