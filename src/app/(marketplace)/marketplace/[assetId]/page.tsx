import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  getItemMetadata,
  getOnGoingObjectListing,
  getPropertyDetails,
  getTokenRemaining
} from '@/lib/queries';
import { IProperty } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatNumber, formatPrice, hexToString } from '@/lib/utils';
import { Shell } from '@/components/shell';
import PropertyOverView from './_components/proprty-overview';
import ImageComponent from '@/components/image-component';
import PropertyFeatures from './_components/property-features';
import PropertyDocuments from './_components/property-documents';
import PropertyTransactionsTable from './_components/property-trasnsactions';
import { generatePresignedUrl } from '@/lib/s3';

interface FetchedProperty {
  [key: string]: any;
}

export default async function Page({ params }: { params: { assetId: string } }) {
  const listingDetails = await getOnGoingObjectListing(Number(params.assetId));
  const item: any = await getItemMetadata(listingDetails.collectionId, listingDetails.itemId);

  const tokensRemaining = await getTokenRemaining(Number(params.assetId));
  const propertyInfo = (await getPropertyDetails(Number(params.assetId))) as FetchedProperty;

  if (!item) {
    return notFound();
  }

  const itemString = item.data.startsWith('0x') ? hexToString(item.data) : item.data;

  const metadata: IProperty = JSON.parse(itemString);

  console.log(metadata)

  // const { fileUrls } = metadata;

  const fileUrls = await Promise.all(
    metadata.files
      .filter((fileKey: string) => fileKey.split('/')[2] == 'property_image')
      .map(async (fileKey: string) => await generatePresignedUrl(fileKey))
  );

  return (
    <Shell variant={'basic'}>
      <div className="mb-5 flex items-start justify-start px-4 md:px-[50px]">
        <Link
          href={'/marketplace'}
          className="flex items-center gap-1  py-1 font-sans text-[0.875rem]/[1.8rem] font-bold transition-colors duration-200 hover:text-foreground/90"
        >
          <Icons.ArrowBack className="size-6" />
          Back
        </Link>
      </div>
      <section className="mb-10 grid grid-cols-1 gap-y-16 px-4 md:gap-x-[79px] md:px-[50px] lg:grid-cols-2">
        <div className="space-y-4">
          <div className=" relative">
            <div className="aspect-square lg:h-[544px]">
              <ImageComponent
                fill={true}
                src={fileUrls[0]}
                className="h-full w-full  rounded-lg object-cover"
              />
            </div>
          </div>
          {/* <img
            src="/images/properties/prop2-1.jpg"
            alt={metaData.property_name}
            className="h-[544px] w-[610px] rounded-lg bg-contain bg-center object-cover"
          /> */}
          <div className="flex items-center justify-center gap-2">
            {fileUrls.length >= 1
              ? fileUrls.map(file => (
                  <img
                    key={file}
                    src={file}
                    alt={metadata.property_name}
                    className="size-12 rounded-[2px]"
                  />
                ))
              : null}
          </div>
        </div>
        <PropertyOverView
          fileUrls={fileUrls}
          tokensRemaining={tokensRemaining}
          listingId={params.assetId}
          metaData={metadata}
          listingDetails={listingDetails}
          propertyInfo={propertyInfo}
        />
      </section>
      <section className="mb-10 flex flex-col gap-10 bg-[#F4F4F4] px-4 py-10 md:flex-row md:gap-[103px] md:px-[50px] md:py-16">
        <PropertyFeatures metadata={metadata} />
        <PropertyDocuments />
      </section>
      <section className="hidden w-full flex-col gap-12 px-4 md:flex md:px-[50px]">
        <div className="flex w-full border-b pb-2">
          <h3 className="text-[1.125rem]/[1.5rem] font-semibold">Item activity </h3>
        </div>
        <div className="h-full w-full gap-6 rounded bg-[#FAFAFA] px-[42px] py-10">
          <PropertyTransactionsTable />
        </div>
      </section>
    </Shell>
  );
}
