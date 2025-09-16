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
    const result = await api.query.marketplace.nextListingId();
    const output = result.toHuman();
    return output;
  } catch (error) {
    return null;
  }
}
export async function checkIfWhiteListed(address: string) {
  try {
    const api = await apiPRomise;
    // Query all account roles for the given address
    const result = await api.query.xcavateWhitelist.accountRoles.entries();
    const output = result
      .filter(([key, value]) => key.args[0].toString() === address)
      .map(([key, value]) => ({
        role: key.args[1].toHuman(),
        value: value.toHuman()
      }));
    console.log('output', output);
    return output;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getTokenRemaining(itemId: number) {
  try {
    const api = await apiPRomise;
    const result = await api.query.marketplace.listedToken(itemId);
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
    const result = await api.query.marketplace.ongoingObjectListing(itemId);
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
  try {
    const api = await apiPRomise;
    const data = await api.query.marketplace.ongoingObjectListing.entries();

    return data
      .map(([key, exposure]) => {
        try {
          return {
            listingId: key.args[0].toHuman(),
            listingDetails: exposure.toHuman()
          };
        } catch (error) {
          console.warn('Error processing listing data:', error);
          return null;
        }
      })
      .filter(Boolean); // Remove null entries
  } catch (error) {
    console.error('Error fetching ongoing listings:', error);
    throw new Error(
      `Failed to fetch ongoing listings: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function getAllOngoingListingsWhereAddressIsDeveloper(address: string) {
  try {
    const api = await apiPRomise;
    const data = await api.query.marketplace.ongoingObjectListing.entries();

    return data
      .filter(([key, exposure]: [any, any]) => {
        try {
          const humanData = exposure.toHuman();
          return humanData && humanData['realEstateDeveloper'] === address;
        } catch (error) {
          console.warn('Error processing exposure data:', error);
          return false;
        }
      })
      .map(([key, exposure]) => {
        try {
          return {
            listingId: key.args[0].toHuman() as any,
            listingDetails: exposure.toHuman() as any
          };
        } catch (error) {
          console.warn('Error processing listing data:', error);
          return null;
        }
      })
      .filter(Boolean); // Remove null entries
  } catch (error) {
    // console.error('Error fetching developer listings:', error);
    // throw new Error(
    //   `Failed to fetch listings for developer ${address}: ${error instanceof Error ? error.message : 'Unknown error'}`
    // );
  }
}

export async function getAllTokenBuyers() {
  const api = await apiPRomise;
  const data = await api.query.marketplace.tokenBuyer.entries();

  return data.map(([key, exposure]) => {
    return { listingId: key.args[0].toHuman(), owners: exposure.toHuman() };
  });
}

export async function getAllTokenBuyerForListing(listingId: number) {
  const api = await apiPRomise;
  const data = await api.query.marketplace.tokenBuyer(listingId);

  return data.toHuman();
}

export async function getTokensAndListingsOwnedByAccount(address: string) {
  const api = await apiPRomise;
  const data = await api.query.marketplace.tokenOwner.entries(address);

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

  const result = await api.query.marketplace.ongoingObjectListing(listingId);
  const output = result.toHuman();
  return output as any; // output.data should contain the metadata
}

function getIntegersLessThan(n: any) {
  return Array.from({ length: n }, (_, i) => i);
}

// export async function getListingById() {
//   const api = await apiPRomise
//   const data = await api.query.marketplace.ongoingObjectListing.entries();

//   return data
//     .filter(([key, exposure]: [any, any]) => exposure.toHuman())
//     .map(([key, exposure]) => {

//       return {
//         listingId: key.args[0].toHuman() as any,
//         listingDetails: exposure.toHuman() as any
//       };
//     });
// }
export async function checkBlock(targetBlock: number) {
  const api = await apiPRomise;

  const header = await api.rpc.chain.getHeader();
  const currentBlock = header.number.toNumber();

  if (currentBlock >= targetBlock) {
    return true;
  }

  return false;
}

export async function getAllAssets() {
  try {
    const api = await apiPRomise;
    const data = await api.query.realEstateAsset.propertyAssetInfo.entries();

    return data
      .map(([key, exposure]) => {
        try {
          return {
            listingId: key.args[0].toHuman(),
            propertyInfo: exposure.toHuman()
          };
        } catch (error) {
          console.warn('Error processing asset data:', error);
          return null;
        }
      })
      .filter(Boolean); // Remove null entries
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw new Error(
      `Failed to fetch assets: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function getAllProperties() {
  try {
    const api = await apiPRomise;
    const data = await api.query.realEstateAsset.propertyAssetInfo.entries();

    return data
      .map(([key, exposure]) => {
        try {
          return {
            propertyId: key.args[0].toHuman(),
            propertyInfo: exposure.toHuman()
          };
        } catch (error) {
          console.warn('Error processing listing data:', error);
          return null;
        }
      })
      .filter(Boolean); // Remove null entries
  } catch (error) {
    console.error('Error fetching ongoing listings:', error);
    throw new Error(
      `Failed to fetch ongoing listings: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function getPropertyById(itemId: number) {
  try {
    const api = await apiPRomise;
    const result = await api.query.realEstateAsset.propertyAssetInfo(itemId);
    const output = result.toHuman();
    return output;
  } catch (error) {
    return null;
  }
}

export async function getPropertyOwners(itemId: number) {
  try {
    const api = await apiPRomise;
    const result = await api.query.realEstateAsset.propertyOwner(itemId);
    const output = result.toHuman();
    return output;
  } catch (error) {
    return null;
  }
}

export async function getTokenOwnerByListingId(address: string, listingId: number) {
  try {
    const api = await apiPRomise;
    const result = await api.query.realEstateAsset.propertyOwnerToken(listingId, address);
    const output = result.toHuman();
    return output;
  } catch (error) {
    return null;
  }
}

export async function getTokensAndPropertyClaimed() {
  const api = await apiPRomise;
  const data = await api.query.realEstateAsset.propertyOwner.entries();

  return data.map(([key, exposure]) => {
    return {
      listingId: key.args[0].toHuman(),
      address: exposure.toHuman()
    };
  });
}

export async function getTokensAndPropertyOwnedByAccount(address: string) {
  const propertyClaimed: any = await getTokensAndPropertyClaimed();
  const propertyOwned = propertyClaimed.map((item: any) => {
    return item.address.includes(address) ? item : null;
  });

  // {
  //   listingId: item.listingId,
  //   address: item.address.includes(address)
  // };
  return propertyOwned;
}

export async function getAllProperty() {
  try {
    const api = await apiPRomise;
    const result = await api.query.realEstateAsset.propertyAssetInfo.entries();

    return result.map(([_key, exposure]) => {
      return exposure.toHuman();
    });
  } catch (error) {
    return null;
  }
}
