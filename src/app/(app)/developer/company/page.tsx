'use client';

import { DescriptionList } from '@/components/description-list';
import { PageHeader } from '@/components/profile-page-header';
import { Button } from '@/components/ui/button';
import { findDeveloperByPartnerAddress } from '@/config/white-list';
import { useWalletContext } from '@/context/wallet-context';

export default function Page() {
  const { selectedAccount } = useWalletContext();
  const address = selectedAccount?.[0]?.address;
  const developer = findDeveloperByPartnerAddress(address!);

  return (
    <div className="w-full space-y-10">
      <PageHeader
        title="Company information"
        description="You need to connect a wallet to complete transactions"
        className="hidden md:flex"
      >
        <Button variant={'filled'}>ADD TEAM</Button>
      </PageHeader>

      <div className="flex w-full flex-col items-start gap-10 bg-grey px-4 py-6 md:px-[57px] md:py-10">
        <DescriptionList
          title="Company name"
          value={developer?.name ?? 'BTB Developments Ltd'}
        />
        <DescriptionList title="Registration number" value="9990066788" />
        <DescriptionList title="Phone number" value="+44 2564 789798" />
        <DescriptionList title="Email" value="sales@btb-developments.com" />
        <DescriptionList
          title="Address"
          value={
            developer?.address ??
            'Developed over five hundred different developments all across UK'
          }
        />
        <DescriptionList
          title="Associate website"
          value={developer?.website ?? 'www.btb-developments.com'}
        />
        <DescriptionList title="Association membership  number" value="0412885YHT" />
        <DescriptionList
          title="Summary"
          value={
            developer?.summary ??
            'Developed over five hundred different developments all across UK'
          }
        />
      </div>
    </div>
  );
}
