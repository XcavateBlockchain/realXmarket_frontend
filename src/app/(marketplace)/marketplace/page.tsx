import MarketCard from '@/components/cards/market-card';
import {
  checkBlock,
  getActiveProperties,
  getAllOngoingListings,
  getAllOngoingListingsWhereAddressIsDeveloper,
  getAllTokenBuyerForListing,
  getAllTokenBuyers,
  getItemMetadata,
  getTokenRemaining,
  getTokensAndListingsOwnedByAccount
} from '@/lib/queries';

import { FetchedProperty, Listing, Property } from '@/types';
import FilterTabs from './filter-tabs';
import { hexToString } from '@/lib/utils';
import { getCookieStorage } from '@/lib/cookie-storage';
import { Shell } from '@/components/shell';
import { generatePresignedUrl } from '@/lib/s3';

export const maxDuration = 300;
export default async function Marketplace() {
  const address = await getCookieStorage('accountKey');
  // const data = await getAllOngoingListings();
  // console.log('ALL ONGOING LISTINGS', data);

  const activeListingsWhereAccountIsDeveloper =
    await getAllOngoingListingsWhereAddressIsDeveloper(
      '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty'
    );
  // console.log('activeListingsWhereAccountIsDeveloper', activeListingsWhereAccountIsDeveloper);

  // const allTokenBuyers = await getAllTokenBuyers();
  // console.log('ALL TOKEN BUYERS', allTokenBuyers);

  // const listing9Buyers = await getAllTokenBuyerForListing(9);
  // console.log('TOKEN BUYERS FOR LISTING 9', listing9Buyers);

  // const tokensOwnedByBob = await getTokensAndListingsOwnedByAccount(
  //   '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty'
  // ); // Bob account

  // console.log('TOKENS OWNED BY BOB ACCOUNT', tokensOwnedByBob);
  // const properties = (await getActiveProperties()) as FetchedProperty[];

  // console.log(properties);

  // async function FetchMetaData() {
  //   activeListingsWhereAccountIsDeveloper.map(async listing => {
  //     // const details  = JSON.parse(listing.listingDetails);

  //     if (listing.listingDetails && typeof listing.listingDetails === 'object') {
  //       const metaData = await getItemMetadata(
  //         listing.listingDetails.collectionId,
  //         listing.listingDetails.itemId
  //       );
  //       console.log(hexToString(metaData.data));
  //     }
  //   });
  // }

  // console.log(await FetchMetaData());

  async function FetchMetaData() {
    const results = await Promise.all(
      activeListingsWhereAccountIsDeveloper.map(async listing => {
        if (listing.listingDetails && typeof listing.listingDetails === 'object') {
          const metaData = await getItemMetadata(
            listing.listingDetails.collectionId,
            listing.listingDetails.itemId
          );
          const tokenRemaining = await getTokenRemaining(listing.listingId);
          // const metadata = hexToString(metaData.data);
          const metadata = metaData.data.startsWith('0x')
            ? hexToString(metaData.data)
            : metaData.data;
          return { listing, tokenRemaining, metadata };
        }
      })
    );
    return results;
  }

  // console.log(await FetchMetaData());

  const listings: Listing[] = (await FetchMetaData()).filter(
    (item): item is Listing => item !== undefined
  );

  //   console.log(listings);

  return (
    <Shell variant={'basic'} className="gap-10 pb-32">
      <FilterTabs />
      <div className="flex flex-col gap-6 px-4 md:px-[50px]">
        <div className="flex items-end justify-end">
          <span className="flex items-center gap-2 font-sans text-[1rem]">
            Sort: Recommended
            <SortIcon />
          </span>
        </div>

        {listings && listings.length >= 1 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {listings.map(async listing => {
              const data = JSON.parse(listing.metadata);
              const fileUrls = await Promise.all(
                data.files
                  .filter((fileKey: string) => fileKey.split('/')[2] == 'property_image')
                  .map(async (fileKey: string) => await generatePresignedUrl(fileKey))
              );
              // const expired = ['112,508', '112,161', '112,434', '101,264'];
              const blockNumber = Number(
                listing.listing.listingDetails.listingExpiry.replace(/,/g, '')
              );

              const isPassed = await checkBlock(blockNumber);
              // expired.includes(listing.listing.listingDetails.listingExpiry
              if (isPassed) {
                return null;
              }
              return (
                <MarketCard
                  key={listing.listing.listingId}
                  //   price={listing.listing.listingDetails.tokenPrice}
                  id={listing.listing.listingId}
                  fileUrls={fileUrls}
                  details={listing.listing.listingDetails}
                  tokenRemaining={listing.tokenRemaining}
                  metaData={data}
                />
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </Shell>
  );
}

const SortIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="11"
    viewBox="0 0 21 11"
    fill="none"
  >
    <path
      opacity="0.8"
      d="M17.25 5.55078C17.25 5.74969 17.171 5.94046 17.0303 6.08111C16.8897 6.22176 16.6989 6.30078 16.5 6.30078H4.5C4.30109 6.30078 4.11032 6.22176 3.96967 6.08111C3.82902 5.94046 3.75 5.74969 3.75 5.55078C3.75 5.35187 3.82902 5.1611 3.96967 5.02045C4.11032 4.8798 4.30109 4.80078 4.5 4.80078H16.5C16.6989 4.80078 16.8897 4.8798 17.0303 5.02045C17.171 5.1611 17.25 5.35187 17.25 5.55078ZM20.25 0.300781H0.75C0.551088 0.300781 0.360322 0.379799 0.21967 0.520451C0.0790176 0.661104 0 0.851869 0 1.05078C0 1.24969 0.0790176 1.44046 0.21967 1.58111C0.360322 1.72176 0.551088 1.80078 0.75 1.80078H20.25C20.4489 1.80078 20.6397 1.72176 20.7803 1.58111C20.921 1.44046 21 1.24969 21 1.05078C21 0.851869 20.921 0.661104 20.7803 0.520451C20.6397 0.379799 20.4489 0.300781 20.25 0.300781ZM12.75 9.30078H8.25C8.05109 9.30078 7.86032 9.3798 7.71967 9.52045C7.57902 9.6611 7.5 9.85187 7.5 10.0508C7.5 10.2497 7.57902 10.4405 7.71967 10.5811C7.86032 10.7218 8.05109 10.8008 8.25 10.8008H12.75C12.9489 10.8008 13.1397 10.7218 13.2803 10.5811C13.421 10.4405 13.5 10.2497 13.5 10.0508C13.5 9.85187 13.421 9.6611 13.2803 9.52045C13.1397 9.3798 12.9489 9.30078 12.75 9.30078Z"
      fill="#4E4E4E"
    />
  </svg>
);
