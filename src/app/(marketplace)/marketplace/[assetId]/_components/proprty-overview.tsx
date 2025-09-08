import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ProgressGradient } from '@/components/ui/progress';
import Image from 'next/image';
import BuyToken from './buy-token';
import { IProperty, ListingDetails } from '@/types';
import { cn, formatAPY, formatNumber, formatPrice, priceRangeFormat } from '@/lib/utils';
import ClaimProperty from './claim-property';
import { formatUnits } from '@/lib/formaters';

type PropertyOverviewProps = {
  listingId: any;
  tokensRemaining: any;
  metaData: IProperty;
  listingDetails: ListingDetails;
  propertyInfo: any;
  fileUrls: string[];
  totalTokensOwned: number | undefined;
  spvCreated: boolean;
  propertyOwners: any[];
  isPropertyOwner: boolean;
  tokenOwner: any;
};

export default function PropertyOverView({
  listingId,
  fileUrls,
  tokensRemaining,
  metaData,
  listingDetails,
  propertyInfo,
  totalTokensOwned,
  spvCreated,
  propertyOwners,
  isPropertyOwner,
  tokenOwner
}: PropertyOverviewProps) {
  const SimilarPropertyPrice = priceRangeFormat(metaData.property_price);
  return (
    <div className="grid w-full place-items-start gap-6">
      {/* <div className="grid w-full gap-6"> */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={metaData.company?.logo ?? '/images/developer_logo.png'}
            alt={metaData.company ? metaData.company.name : 'logo'}
            width={54}
            height={54}
            className="border-spacing-3 rounded-full border-caption"
            priority
          />
          <h3 className="font-mona text-[18px]/[24px] font-semibold">
            {metaData.company ? metaData.company.name : 'Bob T Builde'}
          </h3>
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
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex items-center gap-1">
          <Image
            src={'/icons/pin_location.svg'}
            alt="loc"
            width={24}
            height={24}
            className="pointer-events-none"
          />
          <span className="flex items-center font-mona text-[1rem]/[1.5rem] font-medium">
            <span className="capitalize">{metaData.address_street}</span>
            <span className="capitalize">
              {`, `} {metaData.address_town_city}
            </span>
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <h1 className="font-mona text-[1.5rem]/[2rem] font-bold">
            {metaData.property_name}
          </h1>
          {totalTokensOwned ? (
            <p className="text-[14px]/[24px]">
              Tokens owned <span className="text-[#717171]">{totalTokensOwned}</span>
            </p>
          ) : (
            <p className="text-[14px]/[24px]">
              Tokens owned: <span className="text-[#717171]">{tokenOwner}</span>
            </p>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start gap-2">
          <dt className="font-sans text-[0.875rem]/[1.5rem]">Price</dt>
          <dd className="font-mona text-[1.5rem]/[2rem] font-bold">
            {formatPrice(metaData.property_price)}
          </dd>
        </div>
        {spvCreated === false && propertyOwners.length === 0 && (
          <span className="rounded-full bg-gray-300 px-2 py-0.5 font-sans text-[0.875rem]/[1.5rem]">
            Processing Approval
          </span>
        )}
        {isPropertyOwner ? <Button>Re-list</Button> : null}
        {totalTokensOwned && spvCreated ? (
          <ClaimProperty listingId={Number(listingId)} />
        ) : null}
        {tokensRemaining !== '0' ? (
          <BuyToken
            fileUrls={fileUrls}
            listingId={Number(listingId)}
            tokens={tokensRemaining}
            property={metaData}
            data={listingDetails}
            totalTokensOwned={totalTokensOwned}
          />
        ) : null}
      </div>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-10">
        <PropertyStats
          title="Price per Token"
          value={
            propertyInfo.tokenPrice.length > 5
              ? formatNumber(formatUnits(propertyInfo.tokenPrice, 6))
              : propertyInfo.tokenPrice
          }
        />
        <PropertyStats
          title="Rental Yield"
          value={`${formatAPY(metaData.estimated_rental_income, metaData.property_price)}`}
        />
        <PropertyStats
          title="Tokens available"
          value={
            tokensRemaining === '0'
              ? 'Sold'
              : `${tokensRemaining} / ${propertyInfo.tokenAmount}`
          }
        />
        <PropertyStats
          title={`${metaData.annualServiceCharge ? 'Annual service charge' : 'Property type'}`}
          value={metaData.annualServiceCharge ?? metaData.property_type}
        />
        <PropertyStatsWithProgress
          title="Similar property prices"
          value={SimilarPropertyPrice.percentage}
          start={formatNumber(SimilarPropertyPrice.percentageDecrease)}
          mid={''}
          end={`£${formatNumber(SimilarPropertyPrice.percentageIncrease)}`}
          className="col-span-2 mb-4 md:mb-0"
        />
        <PropertyStats
          title="Rental income"
          value={formatPrice(metaData.estimated_rental_income)}
        />
        <PropertyStatsWithProgress
          title="Area rental demand"
          value={45}
          start="Low"
          end="High"
          mid="Medium"
          className=" col-span-2"
        />
      </div>

      {/* </div> */}
    </div>
  );
}

const PropertyStats = ({ title, value }: { title: string; value: any }) => (
  <div className="flex w-full flex-col items-start gap-2 border-t border-gray-200 pt-3.5 font-sans text-[0.875rem]/[1.5rem]">
    <dt className="text-[#4E4E4E]">{title}</dt>
    <dd className="text-[#717171]">{value}</dd>
  </div>
);

type PropertyStatsWithProgressProps = {
  title: string;
  value: any;
  start: string;
  end: string;
  mid: string;
  className: string;
};

const PropertyStatsWithProgress = ({ className, ...prop }: PropertyStatsWithProgressProps) => (
  <div
    className={cn(
      'flex w-full flex-col items-start gap-2 border-t border-gray-200 pt-3.5 font-sans text-[0.875rem]/[1.5rem]',
      className
    )}
  >
    <dt className="text-[#4E4E4E]">{prop.title}</dt>
    <dd className=" relative w-full">
      <ProgressGradient value={prop.value} className="h-1" />
      <span className="absolute -bottom-6 start-0 text-xs text-gray-500">{prop.start}</span>
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500">
        {prop.mid}
      </span>
      <span className="absolute -bottom-6 end-0 text-xs text-gray-500">{prop.end}</span>
    </dd>
  </div>
);
