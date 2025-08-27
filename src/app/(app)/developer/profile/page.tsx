import { DescriptionList } from '@/components/description-list';
import { PageHeader } from '@/components/profile-page-header';
import { profiles } from '@/config/profiles';
import { developers, findDeveloperByPartnerAddress } from '@/config/white-list';
import { getCookieStorage } from '@/lib/cookie-storage';

export default async function Account() {
  const address = await getCookieStorage('accountKey');
  const profile = profiles[address as string] ?? null;

  const developer = findDeveloperByPartnerAddress(address!) ?? developers[0];

  const partner = developer?.partners.find(
    partner => partner.whitelistedAccountAddress === address
  );

  return (
    <div className="w-full space-y-16">
      <PageHeader
        title="Personal information"
        description="You need to connect a  wallet to complete transactions"
      />
      <div className="flex w-full flex-col items-start gap-10 bg-grey px-4 py-6 md:px-[57px] md:py-10">
        <DescriptionList
          title="Name"
          value={partner?.name ? `${partner?.name}` : 'Bob Builder'}
        />
        <DescriptionList title="Bio" value={partner?.bio ?? ''} />
        <DescriptionList
          title="Email address"
          value={profile?.credential.claim.contents.email ?? 'bob@thebuilder.com'}
        />
        <DescriptionList
          title="Phone number"
          value={profile?.credential.claim.contents.phone ?? '+44 1122 33445566'}
        />
      </div>
    </div>
  );
}
