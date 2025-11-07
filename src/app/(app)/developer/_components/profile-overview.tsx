'use client';
import { OverviewCard } from '@/components/cards/overview-card';
import { Button } from '@/components/ui/button';
import { profiles } from '@/config/profiles';
import { findDeveloperByPartnerAddress } from '@/config/white-list';
import { useWalletContext } from '@/context/wallet-context';
import usePaymentAsset from '@/hooks/use-payment-asset';
import { getLocalStorageItem } from '@/lib/localstorage';
import { formatPrice } from '@/lib/utils';
import { IProfile } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfileHeaderOverview({
  profile,
  accountDetails
}: {
  profile: string;
  accountDetails: any;
}) {
  const { asset } = useWalletContext();
  const { asset: paymentAsset } = usePaymentAsset(asset);

  const totalTokens =
    accountDetails &&
    accountDetails.reduce((total: number, details: any) => {
      const tokenPrice = parseInt(details.listingDetails.tokenPrice.replace(/,/g, ''), 10);
      const collectedFunds = parseInt(
        details.listingDetails.collectedFunds[Number(paymentAsset.id)]
          ?.toString()
          .replace(/,/g, '') || '0',
        10
      );
      return total + collectedFunds / tokenPrice;
    }, 0);

  const totalSales =
    accountDetails &&
    accountDetails.reduce((total: number, details: any) => {
      const collectedFunds = parseInt(
        details.listingDetails.collectedFunds[Number(paymentAsset.id)]
          ?.toString()
          .replace(/,/g, '') || '0',
        10
      );
      return total + collectedFunds;
    }, 0);

  const propertiesWithPurchases =
    accountDetails &&
    accountDetails.filter((details: any) => {
      const totalCollectedFunds = Object.values(
        details.listingDetails.collectedFunds as Record<string, number>
      ).reduce((sum: number, value: number) => sum + value, 0);
      return totalCollectedFunds > 0;
    });

  return (
    <>
      <div className="flex w-full flex-col gap-6">
        {/* <div className="mt-28 flex size-[155px] items-center justify-center rounded-full bg-white">
          <Image
            src={'/images/developer_logo.png'}
            alt="avatar"
            width={150}
            height={150}
            className="rounded-full bg-cover  bg-no-repeat"
            priority
          />
        </div> */}
        <div className="flex w-full items-center justify-between">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold">
                {profile ? `${profile}` : '- -'}
              </h1>
              <div className="flex items-center gap-2 rounded-lg bg-accent-200/10 px-2 py-[2px]">
                <span className="text-[0.875rem] text-accent-200">Developer</span>
              </div>
            </div>
            <span className="font-mona text-[0.875rem]/[1.5rem]">
              Account created May, 2024
            </span>
          </div>

          <div className="hidden gap-2 md:flex">
            <Button asChild>
              <Link href={'/property/create'}>ADD PROPERTY</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-5 lg:grid-cols-4">
        <OverviewCard title="Active listed properties" value={accountDetails?.length ?? 0} />
        <OverviewCard title="Total Invested" value={totalTokens ?? 0} />
        <OverviewCard title="ROI" value={0} />
        <OverviewCard
          title="Balance"
          value={formatPrice(totalSales ?? 0, { notation: 'compact' })}
        />
      </div>
    </>
  );
}
