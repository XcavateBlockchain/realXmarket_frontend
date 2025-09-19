import { getAllProperty, getAllSpvLawyerProposals, getItemMetadata } from '@/lib/queries';
import { cn, hexToString } from '@/lib/utils';
import Link from 'next/link';
import LawyerCard from './components/lawyer-card';
import { generatePresignedUrl } from '@/lib/s3';
import { getCookieStorage } from '@/lib/cookie-storage';
import { IComponent } from '@/types';

type PageProps = {
  searchParams: { status: string };
};

type PropertyListing = {
  collectionId: string | number;
  itemId: string | number;
  region: string | number;
  location: string;
  price: string | number;
  tokenAmount: string | number;
  spvCreated: boolean;
  finalized: boolean;
};

type PropertyWithMetadata = {
  listing: PropertyListing;
  metadata: string | null;
  fileUrls?: string[];
};

export default async function Properties({ searchParams }: PageProps) {
  const address = await getCookieStorage('accountKey');
  const query = searchParams.status === undefined ? 'Newly listed' : searchParams.status;

  const getAllTokes = await getAllProperty();
  const getUserSpvLawyerProposals = await getAllSpvLawyerProposals(address!);

  console.log(getUserSpvLawyerProposals);

  async function FetchMetaData(): Promise<PropertyWithMetadata[]> {
    if (!getAllTokes || getAllTokes.length === 0) {
      return [];
    }

    const results = await Promise.all(
      getAllTokes.filter(Boolean).map(async (listing: any) => {
        try {
          const typedListing = listing as PropertyListing;
          const metaData = await getItemMetadata(
            Number(typedListing.collectionId),
            Number(typedListing.itemId)
          );

          const metadata = metaData.data.startsWith('0x')
            ? hexToString(metaData.data)
            : metaData.data;

          // Parse metadata and generate file URLs
          let fileUrls: string[] = [];
          try {
            if (metadata && typeof metadata === 'string') {
              const data = JSON.parse(metadata);
              if (data.files && Array.isArray(data.files)) {
                fileUrls = await Promise.all(
                  data.files
                    .filter((fileKey: string) => fileKey.split('/')[2] === 'property_image')
                    .map(async (fileKey: string) => await generatePresignedUrl(fileKey))
                );
              }
            }
          } catch (error) {
            // Error generating file URLs, continue with empty array
          }

          return { listing: typedListing, metadata, fileUrls };
        } catch (error) {
          return { listing: listing as PropertyListing, metadata: null, fileUrls: [] };
        }
      })
    );
    return results;
  }

  async function FetchUserSpvLawyerProposalsMetaData(): Promise<PropertyWithMetadata[]> {
    if (!getUserSpvLawyerProposals || getUserSpvLawyerProposals.length === 0) {
      return [];
    }

    const results = await Promise.all(
      getUserSpvLawyerProposals.filter(Boolean).map(async (listing: any) => {
        try {
          const metaData = await getItemMetadata(
            Number(listing.assetId),
            Number(listing.assetId)
          );

          const metadata = metaData.data.startsWith('0x')
            ? hexToString(metaData.data)
            : metaData.data;

          // Parse metadata and generate file URLs
          let fileUrls: string[] = [];
          try {
            if (metadata && typeof metadata === 'string') {
              const data = JSON.parse(metadata);
              if (data.files && Array.isArray(data.files)) {
                fileUrls = await Promise.all(
                  data.files
                    .filter((fileKey: string) => fileKey.split('/')[2] === 'property_image')
                    .map(async (fileKey: string) => await generatePresignedUrl(fileKey))
                );
              }
            }
          } catch (error) {
            // Error generating file URLs, continue with empty array
          }

          return { listing: listing.assetId, metadata, fileUrls };
        } catch (error) {
          return { listing: listing.assetId, metadata: null, fileUrls: [] };
        }
      })
    );
    return results;
  }

  // Fetch metadata for all properties
  const propertiesWithMetadata = await FetchMetaData();
  const userSpvLawyerProposalsWithMetadata = await FetchUserSpvLawyerProposalsMetaData();

  console.log(userSpvLawyerProposalsWithMetadata);

  const queries: IComponent = {
    'Newly listed': <DisplayProperties propertiesWithMetadata={propertiesWithMetadata} />,
    claimed: (
      <DisplayUserSpvLawyerProposals
        userSpvLawyerProposalsWithMetadata={userSpvLawyerProposalsWithMetadata}
      />
    )
  };

  return (
    <>
      <div className="w-full space-y-10">
        <div className="flex w-full items-start gap-2.5">
          {['Newly listed', 'claimed', 'Under Instruction'].map((type: string) => {
            const active = query === type;
            return (
              <Link
                key={type}
                href={`/lawyer?status=${type}`}
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

        {/* Display properties */}
        {queries[query]}
      </div>
    </>
  );
}

function DisplayProperties({
  propertiesWithMetadata
}: {
  propertiesWithMetadata: PropertyWithMetadata[];
}) {
  if (propertiesWithMetadata.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No properties found.</p>
      </div>
    );
  }
  return (
    <div className="grid w-full grid-cols-4 gap-6">
      {propertiesWithMetadata
        .filter(property => property.listing.spvCreated === true)
        .map((property, index) => {
          const data =
            property.metadata && typeof property.metadata === 'string'
              ? JSON.parse(property.metadata)
              : null;

          return (
            <LawyerCard
              key={index}
              id={property.listing.itemId as any}
              metaData={data as any}
              fileUrls={property.fileUrls || []}
            />
          );
        })}
    </div>
  );
}

function DisplayUserSpvLawyerProposals({
  userSpvLawyerProposalsWithMetadata
}: {
  userSpvLawyerProposalsWithMetadata: PropertyWithMetadata[];
}) {
  return <DisplayProperties propertiesWithMetadata={userSpvLawyerProposalsWithMetadata} />;
}
