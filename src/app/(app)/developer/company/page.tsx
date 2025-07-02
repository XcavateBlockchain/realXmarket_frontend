import { DescriptionList } from '@/components/description-list';
import { PageHeader } from '@/components/profile-page-header';
import { Button } from '@/components/ui/button';

export default function Page() {
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
        <DescriptionList title="Company name" value="BTB Developments Ltd" />
        <DescriptionList title="Registration number" value="9990066788" />
        <DescriptionList title="Phone number" value="+44 2564 789798" />
        <DescriptionList title="Email" value="sales@btb-developments.com" />
        <DescriptionList
          title="Address"
          value="Developed over five hundred different developemnts all across UK."
        />
        <DescriptionList title="Associate website" value="www.btb-developments.com" />
        <DescriptionList title="Association membership  number" value="0412885YHT" />
      </div>
    </div>
  );
}
