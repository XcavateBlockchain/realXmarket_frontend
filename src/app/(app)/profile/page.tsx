import { DescriptionList } from '@/components/description-list';
import { PageHeader } from '@/components/profile-page-header';
import { profiles } from '@/config/profiles';
import { getCookieStorage } from '@/lib/cookie-storage';

export default async function Account() {
  const address = await getCookieStorage('accountKey');
  const profile = profiles[address as string] ?? null;
  return (
    <div className="w-full space-y-16">
      <PageHeader
        title="Personal information"
        description="You need to connect a  wallet to complete transactions"
      />
      <div className="flex w-full flex-col items-start gap-10 bg-grey px-4 py-6 md:px-[57px] md:py-10">
        <DescriptionList
          title="Name"
          value={
            profile
              ? `${profile.credential.claim.contents.firstName}  ${profile.credential.claim.contents.lastName}`
              : '- -'
          }
        />
        <DescriptionList
          title="Email address"
          value={profile?.credential.claim.contents.email ?? '-'}
        />
        <DescriptionList
          title="Phone number"
          value={profile?.credential.claim.contents.phone ?? '-'}
        />
      </div>
    </div>
  );
}
