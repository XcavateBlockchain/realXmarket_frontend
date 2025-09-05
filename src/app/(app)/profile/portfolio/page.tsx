import { Button } from '@/components/ui/button';
import { getCookieStorage } from '@/lib/cookie-storage';
import {
  getItemMetadata,
  getOnGoingObjectListing,
  getTokenOwnerByListingId,
  getTokensAndListingsOwnedByAccount,
  getTokensAndPropertyOwnedByAccount
} from '@/lib/queries';
import { generatePresignedUrl } from '@/lib/s3';
import { cn, hexToString } from '@/lib/utils';
import { IComponent, ListingInfo, TokenOwnership } from '@/types';
import Link from 'next/link';
import OwnedPropertyCard from './owned-property-card';

type PageProps = {
  searchParams: { status: string };
};

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams.status === undefined ? 'properties' : searchParams.status;

  const address = await getCookieStorage('accountKey');

  const tokensOwned: any = await getTokensAndListingsOwnedByAccount(address as string);

  const tokensAndPropertyOwned: any = await getTokensAndPropertyOwnedByAccount(
    address as string
  );

  const getListings = await Promise.all(
    (tokensOwned ?? [])
      .filter((item: TokenOwnership | null | undefined) => item && item.listingId != null)
      .map(async (item: TokenOwnership) => {
        return await getOnGoingObjectListing(Number(item.listingId));
      })
  );

  const getClaimedListings = await Promise.all(
    (tokensAndPropertyOwned ?? [])
      .filter((item: any) => item && item.listingId != null)
      .map(async (item: any) => {
        return await getOnGoingObjectListing(Number(item.listingId));
      })
  );

  async function FetchMetaData() {
    const results = await Promise.all(
      getListings.filter(Boolean).map(async listing => {
        const metaData = await getItemMetadata(listing.collectionId, listing.itemId);
        const tokenRemaining = tokensOwned.find(
          (item: any) => item.listingId === listing.listingId
        );
        const metadata = metaData.data.startsWith('0x')
          ? hexToString(metaData.data)
          : metaData.data;
        return { listing, tokenRemaining, metadata };
      })
    );
    return results;
  }

  async function FetchMetaDataClaimed() {
    const results = await Promise.all(
      getClaimedListings.filter(Boolean).map(async listing => {
        const metaData = await getItemMetadata(listing.collectionId, listing.itemId);
        const tokenRemaining = tokensOwned.find(
          (item: any) => item.listingId === listing.listingId
        );
        const metadata = metaData.data.startsWith('0x')
          ? hexToString(metaData.data)
          : metaData.data;
        return { listing, tokenRemaining, metadata };
      })
    );
    return results;
  }

  const listings: ListingInfo[] = (await FetchMetaData()).filter(
    (item): item is ListingInfo => item !== undefined
  );

  const listingsClaimed: ListingInfo[] = (await FetchMetaDataClaimed()).filter(
    (item): item is ListingInfo => item !== undefined
  );

  const queries: IComponent = {
    properties: <ViewAllPropertiesOwned listings={listings} />,
    claimed: (
      <ViewAllPropertiesClaimed
        listings={listingsClaimed}
        tokensOwned={tokensOwned}
        address={address as string}
      />
    )
  };

  return (
    <>
      <div className="w-full space-y-10">
        <div className="flex w-full items-start gap-2.5">
          {['properties', 'claimed', 'token listed'].map((type: string) => {
            const active = query === type;
            return (
              <Link
                key={type}
                href={`/profile/portfolio?status=${type}`}
                className={cn(
                  'rounded-[40px] border border-[#EEEEEE] px-4 py-2 font-sans text-[18px]/[100%] font-medium capitalize text-foreground',
                  {
                    'bg-primary text-white': active
                  }
                )}
              >
                {type}
              </Link>
            );
          })}
        </div>
        {queries[query]}
      </div>
    </>
  );
}

function ViewAllPropertiesOwned({ listings }: { listings: ListingInfo[] }) {
  if (listings.length <= 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-6 py-20">
        <p>
          Looks like there&apos;s nothing here yet! Start exploring and adding content to fill
          this space with your own unique properties.
        </p>
        <Button variant={'outline'} asChild>
          <Link href={'/marketplace'}>Explore</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-4 gap-6">
      {listings.map(async listing => {
        const data = JSON.parse(listing.metadata);
        const fileUrls = await Promise.all(
          data.files
            .filter((fileKey: string) => fileKey.split('/')[2] == 'property_image')
            .map(async (fileKey: string) => await generatePresignedUrl(fileKey))
        );
        // const tokenRemaining = tokensOwned[index] as TokenOwnership;
        const tokenRemaining = listing.tokenRemaining as TokenOwnership;

        return (
          <OwnedPropertyCard
            key={listing.listing.assetId}
            id={listing.listing.assetId}
            fileUrls={fileUrls}
            details={listing.listing}
            tokenRemaining={tokenRemaining?.tokensOwned?.tokenAmount}
            metaData={data}
            // price={parseInt(tokenRemaining.tokensOwned.paidFunds.replace(/,/g, ''), 10)}
          />
        );
      })}
    </div>
  );
}

function ViewAllPropertiesClaimed({
  listings,
  address
}: {
  address: string;
  listings: ListingInfo[];
  tokensOwned: any;
}) {
  if (listings.length <= 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-6 py-20">
        <p>
          Looks like there&apos;s nothing here yet! Start exploring and adding content to fill
          this space with your own unique properties.
        </p>
        <Button variant={'outline'} asChild>
          <Link href={'/marketplace'}>Explore</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-4 gap-6">
      {listings.map(async listing => {
        const data = JSON.parse(listing.metadata);
        const fileUrls = await Promise.all(
          data.files
            .filter((fileKey: string) => fileKey.split('/')[2] == 'property_image')
            .map(async (fileKey: string) => await generatePresignedUrl(fileKey))
        );

        const tokenOwner = await getTokenOwnerByListingId(
          address as string,
          Number(listing.listing.assetId)
        );

        return (
          <OwnedPropertyCard
            key={listing.listing.assetId}
            id={listing.listing.assetId}
            fileUrls={fileUrls}
            details={listing.listing}
            tokenRemaining={tokenOwner}
            metaData={data}
            // price={parseInt(tokenRemaining.tokensOwned.paidFunds.replace(/,/g, ''), 10)}
          />
        );
      })}
    </div>
  );
}

// async function FetchMetaData() {
//     const results = await Promise.all(
//       getListings.map(async (listing): Promise<{ listing: Listing; tokenRemaining: any; metadata: string } | undefined> => {
//         try {
//           const metaData = await getItemMetadata(
//             listing.listingDetails.collectionId,
//             listing.listingDetails.itemId
//           );
//           const tokenRemaining = tokensOwned.find(
//             (item: TokenOwnership) => item.listingId === listing.listingId
//           );
//           const metadata = metaData.data.startsWith('0x')
//             ? hexToString(metaData.data)
//             : metaData.data;
//           return { listing, tokenRemaining, metadata };
//         } catch (error) {
//           console.error(`Error fetching metadata for listingId ${listing.listingId}:`, error);
//           return undefined; // Return undefined in case of an error
//         }
//       })
//     );
//     return results.filter((result): result is { listing: Listing; tokenRemaining: any; metadata: string } => result !== undefined);
//   }
