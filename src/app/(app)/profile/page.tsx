import { DescriptionList } from '@/components/description-list';
import { PageHeader } from '@/components/profile-page-header';

export default function Account() {
  return (
    <div className="w-full space-y-16">
      <PageHeader
        title="Personal information"
        description="You need to connect a  wallet to complete transactions"
      />
      <div className="flex w-full flex-col items-start gap-10 bg-grey px-4 py-6 md:px-[57px] md:py-10">
        <DescriptionList title="Name" value="Richard Grey" />
        <DescriptionList title="Email address" value="Richard120@gmail.com" />
        <DescriptionList title="Phone number" value="07464646464" />
      </div>
    </div>
  );
}
