'use client';

import ImageComponent from '@/components/image-component';
import { IProperty } from '@/types';
import { truncate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useGetPropertyOwnersViaListing } from '@/lib/system-queries';
import Skeleton from '@/components/skelton';

export default function PropertyUnderInstruction({
  metaData,
  id,
  fileUrls,
  property,
  address
}: {
  id: string;
  fileUrls: string[];
  metaData: IProperty;
  property: any;
  address: string;
}) {
  const {
    data: propertyOwners,
    isLoading: isPropertyOwnersLoading,
    refetch: refetchPropertyOwners
  } = useGetPropertyOwnersViaListing(Number(id));
  return (
    <Link
      href={`/marketplace/${id}`}
      className="relative flex w-full flex-col gap-6 rounded-lg bg-white pb-4 shadow-property-card transition-all duration-200 hover:translate-y-1"
    >
      {fileUrls && fileUrls.length >= 1 ? (
        <Link href={`/marketplace/${id}`} className="relative">
          <div className="aspect-square h-[255px] w-full">
            <ImageComponent
              fill={true}
              src={fileUrls[0]}
              alt={metaData.property_name}
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
          {metaData.property_type}
        </span>
      </div>

      <Link href={`/marketplace/${id}`} className="relative flex flex-col gap-4 px-4">
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between font-sans text-[0.875rem]/[1.5rem]">
            <span className=" font-bold">{truncate(metaData.property_name, 26)}</span>
          </div>
          <div className="flex w-full items-center justify-between">
            {isPropertyOwnersLoading ? (
              <Skeleton className="h-[24px] w-[86px]" />
            ) : (
              <span className="text-[14px]/[24px]">Investors {propertyOwners?.length}</span>
            )}
            <span className="text-[14px]/[24px]">
              Role{' '}
              <span className="ml-2 rounded-lg bg-primary/10 px-[6px] py-[3px] text-primary">
                {property.spvLawyer !== null && property.spvLawyer === address
                  ? 'SPV Lawyer'
                  : 'Developer Lawyer'}
              </span>
            </span>
          </div>
        </div>
      </Link>
    </Link>
  );
}
