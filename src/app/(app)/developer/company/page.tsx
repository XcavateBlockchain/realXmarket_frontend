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
        <DescriptionList title="Company name" value="PrimeStone Developments" />
        <DescriptionList title="Registration number" value="PRD-2024-987654" />
        <DescriptionList title="Phone number" value="12345678" />
        <DescriptionList
          title="Address"
          value="PrimeStone Developments, 123 Kensington High Street, London W8 5SA United Kingdom"
        />
        <DescriptionList title="Associate website" value="www.primestone-developments.com" />
        <DescriptionList title="Association membership  number" value="PMD-2024-00123" />
      </div>
    </div>
  );
}
