import { Button } from '@/components/ui/button';
import { IProperty, Listing } from '@/types';
import Link from 'next/link';
import PropertyCard from './property-card';
import ListedPropertyCard from './listed-property-card';

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
      {properties.map(property => {
        return <PropertyCard key={property.propertyId} property={property} />;
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
      {listings.map(listing => {
        const data = JSON.parse(listing.metadata);
        return (
          <ListedPropertyCard
            key={listing.listing.listingId}
            listingId={listing.listing.listingId}
            tokenRemaining={listing.tokenRemaining}
            property={data}
          />
        );
      })}
    </div>
  );
}
