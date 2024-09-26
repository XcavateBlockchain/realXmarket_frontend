import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  getItemMetadata,
  getOnGoingObjectListing,
  getPropertyDetails,
  getTokenRemaining
} from '@/lib/queries';
import { IProperty, Property } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import BuyToken from './_components/buy-token';
import { notFound } from 'next/navigation';
import { PropertyStatsWithInput } from './_components/PropertyStatsWithInput';
import { formatNumber, formatPrice, hexToString } from '@/lib/utils';
interface FetchedProperty {
  [key: string]: any;
}

export default async function Page({ params }: { params: { assetId: string } }) {
  const listingDetails = await getOnGoingObjectListing(Number(params.assetId));
  const item: any = await getItemMetadata(listingDetails.collectionId, listingDetails.itemId);

  const tokensRemaining = await getTokenRemaining(Number(params.assetId));
  const propertyIfo = (await getPropertyDetails(Number(params.assetId))) as FetchedProperty;

  if (!item) {
    return notFound();
  }

  const itemString = item.data.startsWith('0x') ? hexToString(item.data) : item.data;

  const metaData: IProperty = JSON.parse(itemString);

  const { fileUrls } = metaData;

  const ARI = metaData.estimated_rental_income * 12;
  const APY = ARI / metaData.property_price;

  return (
    <>
      <div className="w-full">
        <div className="container mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col items-start justify-start gap-4 px-4 pt-36 md:px-10">
          <Button variant={'text'} asChild>
            <Link href={'/marketplace'}>
              <Icons.back className="size-2.5" /> Back
            </Link>
          </Button>
          <div className="flex  flex-col gap-8 md:flex-row md:gap-4">
            <div className="flex w-full flex-col overflow-hidden md:w-1/2">
              {fileUrls.length >= 1 ? (
                <img
                  src={fileUrls[0]}
                  alt={metaData.property_name}
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div></div>
              )}
              <div className="mx-auto mt-4 flex gap-3">
                {fileUrls.map((image: any) => (
                  <div
                    key={image}
                    className="h-12 w-12 overflow-hidden rounded-sm border shadow-md"
                  >
                    <img
                      src={image}
                      alt={metaData.property_name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex  w-full flex-col items-start justify-start gap-5 md:w-1/2">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={'/images/NEW_coin.svg'}
                    alt="logo"
                    width={54}
                    height={54}
                    className="border-spacing-3 rounded-full border-[#A6A6A6]"
                    priority
                  />
                  <h3 className="font-mona text-[18px]/[24px] font-semibold">Gade homes</h3>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant={'text'} size={'icon'}>
                    <Icons.heart className="size-8" />
                  </Button>
                  <Button variant={'text'} size={'icon'}>
                    <Icons.share className="size-5" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-1">
                <Image
                  src={'/icons/pin_location.svg'}
                  alt="loc"
                  width={24}
                  height={24}
                  className="pointer-events-none"
                />
                <h3 className="font-mona text-[16px]/[24px] font-semibold">
                  {metaData.address_street} {metaData.address_town_city}
                </h3>
              </div>
              <h1 className="font-mona text-[24px]/[32px] font-bold">
                {metaData.property_name}
              </h1>
              <div className="w-full space-y-2 ">
                <p className="text-[14px]/[24px]">Price</p>
                <div className="flex w-full items-center justify-between  gap-1 text-[16px]/[24px] font-medium">
                  <h4 className="font-mona text-[24px]/[32px] font-bold">
                    {formatPrice(metaData.property_price)}
                  </h4>{' '}
                  <BuyToken
                    listingId={Number(params.assetId)}
                    tokens={tokensRemaining}
                    property={metaData}
                    data={listingDetails}
                  />
                </div>
              </div>
              <div className="grid w-full grid-cols-3 gap-10">
                <PropertyStats title="Price per Token" value={propertyIfo.tokenPrice} />
                <PropertyStats title="Rental Yield" value={`${formatNumber(APY * 10)}`} />
                <PropertyStats
                  title="Tokens available"
                  value={`${tokensRemaining} / ${propertyIfo.tokenAmount}`}
                />
              </div>
              <div className="grid w-full grid-cols-3 gap-10">
                <PropertyStats title="Property type " value={metaData.property_type} />

                <PropertyStatsWithInput
                  title="Similar property prices"
                  start="£200,000"
                  mid=""
                  end="£270,000"
                />

                <PropertyStats
                  title="Rental income"
                  value={`${formatPrice(metaData.estimated_rental_income)}`}
                />

                <PropertyStatsWithInput
                  title="Area rental demand"
                  start="Low"
                  end="High"
                  mid="Medium"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex w-full max-w-screen-2xl flex-col items-start justify-start gap-4 bg-[#F4F4F4] px-4 py-16 md:px-10 lg:flex-row">
          <div className="flex w-full flex-col items-start gap-[20px] md:w-1/2">
            <div className="space-y-4 text-[18px]/[24px]">
              <h1 className="font-mona  font-semibold text-[#4E4E4E]">Property Description</h1>
              <p className=" text-[#191A1BD9]">{metaData.property_description}</p>
            </div>
            <div className="w-full space-y-4">
              <h1 className="font-mona  font-semibold text-[#4E4E4E]">Details</h1>
              <PropertyInfo title="Blocks" value={metaData.area} />
              <PropertyInfo title="Bedrooms" value={metaData.no_of_Bedrooms} />
              <PropertyInfo title="Bathrooms" value={metaData.no_of_bathrooms} />
              <PropertyInfo title="Type" value={metaData.property_type} />
              <PropertyInfo
                title="Location"
                value={`${metaData.address_street} ${metaData.address_town_city}`}
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start md:w-1/2">
            <h1 className="font-bold">MAP</h1>
            <Image
              src={'/images/map.png'}
              alt="map"
              width={630}
              height={424}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="mt-10 flex w-full flex-col overflow-x-scroll px-4 md:px-10">
          <h1 className="mb-4 text-xl font-bold text-[#4E4E4E]">Item Activity</h1>
          <table className="min-w-full border-separate border-spacing-y-2 border-t-2 border-gray-200 bg-[#FAFAFA] px-4">
            <thead className="border-b lg:table-header-group">
              <tr>
                <td className="whitespace-normal px-4 py-4 text-sm font-medium text-gray-500 sm:text-sm">
                  No
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-sm">
                  Action
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-sm">
                  From
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-sm">
                  Token Price
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-sm">
                  Price
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-sm">
                  To
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-sm">
                  Date
                </td>
              </tr>
            </thead>
            <tbody className="bg-[#E2E2E2] lg:border-gray-300">
              {[1, 23, 4, 6, 7, 8].map((_, index) => {
                return (
                  <tr key={index} className="rounded-lg bg-[#E2E2E2]">
                    <td className="whitespace-no-wrap rounded-l-md px-4 py-4 text-sm text-gray-600 sm:text-sm">
                      01
                    </td>
                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-sm">
                      $59.00
                    </td>
                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-sm">
                      $59.00
                    </td>
                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-sm">
                      $29.00
                    </td>
                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-sm">
                      $29.00
                    </td>
                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-sm">
                      $29.00
                    </td>
                    <td className="whitespace-no-wrap rounded-r-md py-4 text-sm text-gray-600 sm:text-sm">
                      $29.00
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const PropertyStats = ({ title, value }: { title: string; value: any }) => (
  <dl className="flex w-full flex-col items-start gap-2 border-t border-gray-200 pt-3.5 text-[14px]/[24px]">
    <dt className="text-[#4E4E4E]">{title}</dt>
    <dd className="text-[#717171]">{value}</dd>
  </dl>
);

const PropertyInfo = ({ title, value }: { title: string; value: any }) => (
  <ul className="flex w-full items-center justify-between border-t border-gray-200 p-3.5 text-[18px]/[24px]">
    <li className="text-[#717171]">{title}</li>
    <li className="text-[#4E4E4E]">{value}</li>
  </ul>
);
