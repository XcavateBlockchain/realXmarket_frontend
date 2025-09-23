import {
  getAllProperty,
  getAllSpvLawyerProposals,
  getItemMetadata,
  getOnGoingObjectListing,
  getPropertyLawyerByAddress,
  getProposedLawyer,
  getSpvLawyerProposal
} from '@/lib/queries';
import { cn, hexToString } from '@/lib/utils';
import Link from 'next/link';
import LawyerCard from './components/lawyer-card';
import { generatePresignedUrl } from '@/lib/s3';
import { getCookieStorage } from '@/lib/cookie-storage';
import { IComponent } from '@/types';
import PropertyUnderInstruction from './components/property-under-instruction';

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
  property?: any;
  proposedLawyer?: any;
  spvLawyerProposal?: any;
};

export default async function Properties({ searchParams }: PageProps) {
  const address = await getCookieStorage('accountKey');
  const query = searchParams.status === undefined ? 'Newly listed' : searchParams.status;

  const getAllTokes = await getAllProperty();
  const getUserSpvLawyerProposals = await getAllSpvLawyerProposals(address!);
  const getPropertyUnderInstruction = await getPropertyLawyerByAddress(address!);

  const getListings = await Promise.all(
    (getUserSpvLawyerProposals ?? []).map(async (item: any) => {
      if (item && item.assetId != null) {
        const listing = await getOnGoingObjectListing(Number(item.assetId));
        // console.log('getOnGoingObjectListing result for assetId', item.assetId, ':', listing);
        return listing;
      }
      return null;
    })
  );

  const getPropertyUnderInstructionListings = await Promise.all(
    (getPropertyUnderInstruction ?? []).map(async (item: any) => {
      const listing = await getOnGoingObjectListing(Number(item.listingId));
      return { listing, property: item.property };
    })
  );

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
    if (!getListings || getListings.length === 0) {
      return [];
    }

    const results = await Promise.all(
      getListings.filter(Boolean).map(async (listing: any) => {
        try {
          // listing may be null or undefined, so check for required fields
          if (!listing.collectionId || !listing.itemId) {
            return { listing, metadata: null, fileUrls: [] };
          }

          const metaData = await getItemMetadata(
            Number(listing.collectionId),
            Number(listing.itemId)
          );

          const metadata =
            metaData.data &&
            typeof metaData.data === 'string' &&
            metaData.data.startsWith('0x')
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
                    .filter((fileKey: string) => {
                      const parts = fileKey.split('/');
                      return parts.length > 2 && parts[2] === 'property_image';
                    })
                    .map(async (fileKey: string) => await generatePresignedUrl(fileKey))
                );
              }
            }
          } catch (error) {
            // Error generating file URLs, continue with empty array
          }

          // Use the full listing object, not just assetId, for consistency with PropertyWithMetadata
          return { listing, metadata, fileUrls };
        } catch (error) {
          return { listing, metadata: null, fileUrls: [] };
        }
      })
    );
    return results;
  }

  async function FetchPropertyUnderInstructionMetaData(): Promise<PropertyWithMetadata[]> {
    if (
      !getPropertyUnderInstructionListings ||
      getPropertyUnderInstructionListings.length === 0
    ) {
      return [];
    }

    const results = await Promise.all(
      getPropertyUnderInstructionListings.filter(Boolean).map(async (listing: any) => {
        try {
          const typedListing = listing.listing as PropertyListing;
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

          return { listing: typedListing, property: listing.property, metadata, fileUrls };
        } catch (error) {
          return { listing: listing as PropertyListing, metadata: null, fileUrls: [] };
        }
      })
    );
    return results;
  }

  // Fetch metadata for all properties
  const propertiesWithMetadata = await FetchMetaData();
  const userSpvLawyerProposalsWithMetadata = await FetchUserSpvLawyerProposalsMetaData();
  const propertiesWithUnderInstructionMetaData = await FetchPropertyUnderInstructionMetaData();

  const propertiesWithMetaData = await Promise.all(
    propertiesWithMetadata.map(async property => {
      try {
        const proposedLawyer = await getProposedLawyer(Number(property.listing.itemId));
        const spvLawyerProposal = await getSpvLawyerProposal(Number(property.listing.itemId));

        return {
          ...property,
          proposedLawyer,
          spvLawyerProposal
        };
      } catch (error) {
        console.error(
          `Error fetching lawyer data for property ${property.listing.itemId}:`,
          error
        );
        return {
          ...property,
          proposedLawyer: null,
          spvLawyerProposal: null
        };
      }
    })
  );

  // Fetch lawyer data for all properties in parallel
  const propertiesWithLawyerData = await Promise.all(
    userSpvLawyerProposalsWithMetadata.map(async property => {
      try {
        const proposedLawyer = await getProposedLawyer(Number(property.listing.itemId));
        const spvLawyerProposal = await getSpvLawyerProposal(Number(property.listing.itemId));

        return {
          ...property,
          proposedLawyer,
          spvLawyerProposal
        };
      } catch (error) {
        console.error(
          `Error fetching lawyer data for property ${property.listing.itemId}:`,
          error
        );
        return {
          ...property,
          proposedLawyer: null,
          spvLawyerProposal: null
        };
      }
    })
  );

  const queries: IComponent = {
    'Newly listed': <DisplayProperties propertiesWithMetadata={propertiesWithMetaData} />,
    claimed: (
      <DisplayUserSpvLawyerProposals
        userSpvLawyerProposalsWithMetadata={propertiesWithLawyerData}
      />
    ),
    'Under Instruction': (
      <DisplayPropertiesUnderInstruction
        address={address!}
        propertiesWithUnderInstructionMetaData={propertiesWithUnderInstructionMetaData}
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

          if (property.spvLawyerProposal!) return null;

          return (
            <LawyerCard
              key={index}
              id={property.listing.itemId as any}
              metaData={data as any}
              fileUrls={property.fileUrls || []}
              proposedLawyer={property.proposedLawyer}
              spvLawyerProposal={property.spvLawyerProposal}
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
  if (userSpvLawyerProposalsWithMetadata.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No properties found.</p>
      </div>
    );
  }

  const filteredProperties = userSpvLawyerProposalsWithMetadata.filter(property => {
    if ('spvCreated' in property.listing) {
      return property.listing.spvCreated === true;
    }
    return true;
  });

  // console.log('Filtered properties:', filteredProperties);

  if (filteredProperties.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No SPV properties found.</p>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-4 gap-6">
      {userSpvLawyerProposalsWithMetadata.map((property, index) => {
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
            proposedLawyer={property.proposedLawyer}
            spvLawyerProposal={property.spvLawyerProposal}
          />
        );
      })}
    </div>
  );
}

function DisplayPropertiesUnderInstruction({
  address,
  propertiesWithUnderInstructionMetaData
}: {
  address: string;
  propertiesWithUnderInstructionMetaData: PropertyWithMetadata[];
}) {
  if (propertiesWithUnderInstructionMetaData.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No properties found.</p>
      </div>
    );
  }
  return (
    <div className="grid w-full grid-cols-4 gap-6">
      {propertiesWithUnderInstructionMetaData.map((property, index) => {
        const data =
          property.metadata && typeof property.metadata === 'string'
            ? JSON.parse(property.metadata)
            : null;

        return (
          <PropertyUnderInstruction
            key={index}
            id={property.listing.itemId as any}
            metaData={data as any}
            fileUrls={property.fileUrls || []}
            property={property.property}
            address={address}
          />
        );
      })}
    </div>
  );
}
