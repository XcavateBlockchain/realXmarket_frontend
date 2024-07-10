import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { properties } from '@/config/property';
import { getPropertyDetails, getTokenRemaining } from '@/lib/queries';
import { Property } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import BuyToken from './_components/buy-token';
import { FaRegHeart } from 'react-icons/fa6';
import { RiShareForwardBoxLine } from 'react-icons/ri';
import { CiLocationOn } from 'react-icons/ci';
interface FetchedProperty {
  [key: string]: any;
}

export default async function Page({ params }: { params: { assetId: string } }) {
  const tokensRemaining = await getTokenRemaining(Number(params.assetId));
  const propertyIfo = (await getPropertyDetails(Number(params.assetId))) as FetchedProperty;
  const property = properties.find((property: Property) => property.id === params.assetId);
  if (!property) {
    return <div></div>;
  }

  console.log(propertyIfo);
  console.log(tokensRemaining);
  const { images } = property;

  return (
    <>
      <div className="container mx-auto px-4 py-4 sm:mt-20 md:px-20">
        <span className="cursor-pointer text-xl font-normal">Back</span>
        <div className="mt-10 flex w-full flex-col gap-8 px-4 md:flex-row md:px-8">
          <div className="flex w-full flex-col overflow-hidden md:w-1/2">
            <img
              src={property.property_image}
              alt="Property Image"
              className="h-full w-full border border-black object-cover"
            />
            <div className="mx-auto mt-4 flex gap-3">
              {images.map((image: any) => (
                <div
                  key={image}
                  className="h-12 w-12 overflow-hidden rounded-sm border shadow-md"
                >
                  <img
                    src={image}
                    alt="Property Image"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              {/* {.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 w-12 overflow-hidden rounded-sm border shadow-md">
                  <img
                    src="/images/property_one.png"
                    alt="Property Image"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))} */}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"
                  alt="Rounded avatar"
                />
                <p className="font-bold">Gade homes</p>
              </div>
              <div className="flex items-center gap-4">
                <FaRegHeart size={22} />
                <RiShareForwardBoxLine size={22} />
              </div>
            </div>
            <div className="mt-4 flex flex-col">
              <p className="text-md flex items-center">
                <CiLocationOn size={20} className="text-black" />{' '}
                {`${property.address_street} ${property.address_town_city}`}
              </p>
              <p className="mt-2 text-xl font-normal text-black">{property.property_name}</p>
            </div>
            <div className="mt-4 flex flex-col">
              <span className="text-xs">Price per token</span>
              <p className="mt-2 text-xl font-normal text-gray-500">
                31253.43 USDT ~ 1.00 ETH
              </p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">Listing Price</span>
                <p className="mt-2 text-sm font-normal text-gray-500">$1,00,000</p>
              </div>
              <div className="flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">RIO Per NFT</span>
                <p className="mt-2 text-sm font-normal text-gray-500">$1,00,000</p>
              </div>
              <div className="flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">Token Minted</span>
                <p className="mt-2 text-sm font-normal text-gray-500">$1,00,000</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="col-span-1 flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">Property Type</span>
                <p className="mt-2 text-sm font-normal text-gray-500">$1,00,000</p>
              </div>
              <div className="col-span-2 flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">Area Prices</span>
                <div className="relative mb-6">
                  <input
                    type="range"
                    min="200000"
                    max="270000"
                    step="1"
                    className="h-1 w-full cursor-pointer appearance-none rounded-md bg-gray-200"
                  />
                  <span className="absolute -bottom-6 start-0 text-xs text-gray-500">
                    £200,000
                  </span>
                  <span className="absolute -bottom-6 end-0 text-xs text-gray-500">
                    £270,000
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="col-span-1 flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">Property Type</span>
                <p className="mt-2 text-sm font-normal text-gray-500">$1,00,000</p>
              </div>
              <div className="col-span-2 flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">Area Prices</span>
                <div className="relative mb-6">
                  <input
                    type="range"
                    min="200000"
                    max="270000"
                    step="1"
                    className="h-1 w-full cursor-pointer appearance-none rounded-md bg-gray-200"
                  />
                  <span className="absolute -bottom-6 start-0 text-xs text-gray-500">
                    £200,000
                  </span>
                  <span className="absolute -bottom-6 end-0 text-xs text-gray-500">
                    £270,000
                  </span>
                </div>
              </div>
            </div>
            <BuyToken
              listingId={Number(params.assetId)}
              tokens={tokensRemaining}
              property={propertyIfo}
              data={property}
            />

            {/* <button
              type="button"
              onClick={() => setFundModal(true)}
              className="gradient-button mt-3 rounded-2xl border bg-gradient-to-r px-4 py-2.5 text-center text-sm font-light uppercase text-black shadow-md focus:ring-4"
            >
              Buy
            </button> */}
          </div>
        </div>
      </div>
      <div className="mt-8 bg-[#F4F4F4] px-4 py-10 md:px-20">
        <div className="mt-10 flex flex-col gap-8 px-4 md:flex-row md:px-8">
          <div className="flex w-full flex-col md:w-1/2">
            <h1 className="text-[#4E4E4E]">Property Description</h1>
            <p className="text-md mt-2 text-[#191A1BD9]">
              {property.description}
              {/* Welcome to this stunning 3-bedroom, 2-bathroom condo located in the heart of
              downtown. This spacious corner unit boasts breathtaking city views and features a
              modern open floor plan, perfect for entertaining. The condo has been recently
              renovated with brand new hardwood floors, stainless steel appliances, and a
              state-of-the-art security system. */}
            </p>
            <h1 className="mt-10 text-[#4E4E4E]">Details</h1>
            <div className="mt-0 flex justify-between border-t-2 border-gray-200 px-1 py-2 text-[#4E4E4E]">
              <span className="text-sm">Bedroom</span>
              <p className="mt-2 text-sm font-normal">{property.no_of_Bedrooms}</p>
            </div>
            <div className="mt-0 flex justify-between border-t-2 border-gray-200 px-1 py-2 text-[#4E4E4E]">
              <span className="text-sm">Bathroom</span>
              <p className="mt-2 text-sm font-normal">{property.number_of_bathrooms}</p>
            </div>
            {['Location', 'Type', 'Location'].map((detail, i) => (
              <div
                key={i}
                className="mt-0 flex justify-between border-t-2 border-gray-200 px-1 py-2 text-[#4E4E4E]"
              >
                <span className="text-sm">{detail}</span>
                <p className="mt-2 text-sm font-normal">$1,00,000</p>
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col md:w-1/2">
            <h1 className="font-bold">MAP</h1>
            <div className="mt-2 h-full w-full bg-gray-300"></div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex w-full flex-col overflow-x-scroll px-4 md:px-20">
        <h1 className="mb-4 text-xl text-[#4E4E4E]">Item Activity</h1>
        <table className="min-w-full border-separate border-spacing-x-2 border-spacing-y-2 border-t-2 border-gray-200">
          <thead className="border-b lg:table-header-group">
            <tr>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                Action
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                From
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                Trade Price
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                To
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                Date
              </td>
            </tr>
          </thead>
          <tbody className="lg:border-gray-300">
            <tr>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $59.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $59.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $59.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $29.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $29.00
              </td>
            </tr>
            <tr>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $59.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $59.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $59.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $29.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $29.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="w-full space-y-16">
        <div className="container mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col items-start justify-start gap-10  px-4 py-20 md:px-10">
          <Button variant={'text'} asChild>
            <Link href={'/marketplace'}>
              <Icons.arrowRight className="size-2.5" /> Back
            </Link>
          </Button>
          <div className="flex flex-col gap-8 md:flex-row md:gap-16">
            <div className="flex w-full flex-col overflow-hidden md:w-1/2">
              <img
                src={property.property_image}
                alt="Property Image"
                className="h-full w-full rounded-lg object-cover"
              />
              <div className="mx-auto mt-4 flex gap-3">
                {images.map((image: any) => (
                  <div
                    key={image}
                    className="h-12 w-12 overflow-hidden rounded-sm border shadow-md"
                  >
                    <img
                      src={image}
                      alt="Property Image"
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
                    src={'/images/company_logo.png'}
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
                    <Icons.heart className="size-5" />
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
                  {property.address_street} {property.address_town_city}
                </h3>
              </div>
              <h1 className="font-mona text-[24px]/[32px] font-bold">
                {property.property_name}
              </h1>
              <div className="space-y-2">
                <p className="text-[14px]/[24px]">Price per token</p>
                <div className="flex items-center gap-1 text-[16px]/[24px] font-medium">
                  <h4 className="font-mona text-[24px]/[32px] font-bold">£2,000</h4> {'~'}{' '}
                  <h4>31253.43 USDT</h4>
                </div>
              </div>
              <BuyToken tokens={tokensRemaining} property={propertyIfo} data={property} />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
