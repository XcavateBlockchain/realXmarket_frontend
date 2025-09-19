import Link from 'next/link';
import { IProperty } from '@/types';
import { ImageIcon } from 'lucide-react';
import { formatAPY, truncate } from '@/lib/utils';
import ImageComponent from '@/components/image-component';

export default function LawyerCard({
  id,
  fileUrls,
  metaData
}: {
  id: string;
  fileUrls: string[];
  metaData: IProperty;
}) {
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
            <dt className=" font-bold">{truncate(metaData.property_name, 26)}</dt>
            <dd className="">
              APY{' '}
              <span className="font-bold">
                {formatAPY(metaData.estimated_rental_income, metaData.property_price)}
              </span>
            </dd>
          </div>
          <div className="flex items-center justify-between text-[14px]/[24px]">
            <dt>Developer lawyer</dt>
            <dd>Assigned</dd>
          </div>
          <div className="flex items-center justify-between text-[14px]/[24px]">
            <dt>SPV lawyer</dt>
            <dd>Assigned</dd>
          </div>
        </div>
      </Link>
    </Link>
  );
}
