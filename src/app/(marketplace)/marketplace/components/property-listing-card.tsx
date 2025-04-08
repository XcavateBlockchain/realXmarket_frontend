import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { ImageIcon } from 'lucide-react';
import { formatAPY, formatNumber, formatPrice } from '@/lib/utils';
import ImageComponent from '@/components/image-component';
import PropertyListing from '@/types/PropertyListing';
import { useEffect, useState } from 'react';
import { generatePresignedUrl } from '@/lib/s3';

interface IPropertyListingProps {
  listing: PropertyListing;
}

export default function PropertyListingCard({ listing }: IPropertyListingProps) {
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  useEffect(() => {
    const fetchPresignedUrl = async () => {
      const files = JSON.parse(listing.files) as string[];
      if (files.length >= 1) {
        const fileUrls = await Promise.all(
          files
            .filter((fileKey: string) => fileKey.split('/')[2] === 'property_image')
            .map(async (fileKey: string) => await generatePresignedUrl(fileKey))
        );
        setImageUrl(fileUrls);
      }
    };

    fetchPresignedUrl();
  }, [listing.files]);

  return (
    <Link
      href={`/marketplace/${listing.nftItemId}`}
      className="relative flex w-full flex-col gap-6 rounded-lg bg-white pb-6 shadow-property-card transition-all duration-200 hover:translate-y-1"
    >
      {imageUrl.length >= 1 ? (
        <Link href={`/marketplace/${listing.nftItemId}`} className="relative">
          <div className="aspect-square h-[255px] w-full">
            <ImageComponent
              fill={true}
              src={imageUrl[0]}
              alt={listing.propertyName}
              // width={320}
              //   height={255}
              className="rounded-t-lg object-cover"
            />
          </div>
        </Link>
      ) : (
        // <Image
        //   src={metaData.fileUrls[0]}
        //   alt={metaData.property_name}
        //   width={320}
        //   height={255}
        //   className="h-[255px] w-full rounded-t-lg"
        //   priority
        // />
        <div className="flex h-[255px] w-full items-center justify-center rounded-t-lg bg-[#4E4E4E]/[0.10] text-primary/50">
          <ImageIcon size={130} />
        </div>
      )}

      <div className="absolute inset-4">
        <span className="items-center gap-1 rounded-lg bg-white px-2 py-[2px] text-[0.75rem] text-primary-200">
          {listing.propertyType}
        </span>
      </div>

      <div
        // href={`/marketplace/${listing.nftItemId}`}
        className="relative flex flex-col gap-4 px-4"
      >
        <div className="flex w-full items-center justify-between px-0">
          <div className="flex items-center justify-start">
            <ImageComponent
              src={'/icons/pin_location.svg'}
              alt="loc"
              width={32}
              height={32}
              // className="pointer-events-none"
            />
            <h3 className="text-md mt-1">
              <span className="capitalize">{listing.addressStreet}</span>
              {', '}
              <span className="capitalize">{listing.addressTownCity}</span>
            </h3>
          </div>
          <Icons.heart className="size-8" />
        </div>
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between font-sans text-[0.875rem]/[1.5rem]">
            <dt className=" font-bold">{listing.propertyName}</dt>
            <dd className="">
              APY{' '}
              <span className="font-bold">
                {formatAPY(listing.estimatedRentalIncome!, listing.propertyPrice)}
              </span>
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="font-sans text-[0.875rem]/[1.5rem]">
              Tokens <span className="font-bold">{listing.numberOfTokens}</span>
            </dt>
            <dd className="font-sans text-[0.875rem]/[1.5rem]">
              Price <span className="font-bold">{formatPrice(listing.pricePerToken)}</span>
            </dd>
          </div>
        </div>
      </div>
    </Link>
  );
}
