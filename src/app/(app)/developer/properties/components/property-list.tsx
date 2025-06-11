import { Button } from '@/components/ui/button';
import { IProperty, Listing } from '@/types';
import Link from 'next/link';
import PropertyCard from './property-card';
import ListedPropertyCard from './listed-property-card';
import { generatePresignedUrl } from '@/lib/s3';

export function ViewAllPropertiesCreated({ properties }: { properties: IProperty[] }) {
  if (properties.length <= 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-6 py-20">
        <p>
          Looks like there&apos;s nothing here yet! Start exploring and adding content to fill
          this space with your own unique properties.
        </p>
        <Button variant={'outline'} asChild>
          <Link href={'/property/create'}>ADD PROPERTY</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-4 gap-6">
      {properties.map((property, index) => {
        return <PropertyCard key={index} property={property} />;
      })}
    </div>
  );
}
export function ViewAllListedPropertiesCreated({ listings }: { listings: Listing[] }) {
  if (listings.length <= 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-6 py-20">
        <p>
          Looks like there&apos;s nothing here yet! Start exploring and adding content to fill
          this space with your own unique properties.
        </p>
        <Button variant={'outline'} asChild>
          <Link href={'/property/create'}>ADD PROPERTY</Link>
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
        return (
          <ListedPropertyCard
            key={listing.listing.listingId}
            fileUrls={fileUrls}
            listingId={listing.listing.listingId}
            listingExpiry={listing.listing.listingDetails.listingExpiry}
            tokenRemaining={listing.tokenRemaining}
            property={data}
          />
        );
      })}
    </div>
  );
}
