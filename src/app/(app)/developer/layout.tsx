import { ProfileTabs } from '@/components/profile-tabs';
import { tabConfig } from '@/config/tab';
import ProfileHeaderOverview from './_components/profile-overview';
import ProfileBannerImage from '@/components/profile-banner-image';
import { getCookieStorage } from '@/lib/cookie-storage';
import { profiles } from '@/config/profiles';
import { getAllOngoingListingsWhereAddressIsDeveloper } from '@/lib/queries';
import ConnectWalletButton from '@/components/wallet/connect-wallet';
import { developers, findDeveloperByPartnerAddress } from '@/config/white-list';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default async function DeveloperLayout({ children }: Readonly<ProfileLayoutProps>) {
  const address = await getCookieStorage('accountKey');

  const data = await getAllOngoingListingsWhereAddressIsDeveloper(address as string);

  const developer = findDeveloperByPartnerAddress(address!) ?? developers[0];

  const profile = profiles['developer'];

  const partner = developer?.partners.find(
    partner => partner.whitelistedAccountAddress === address
  );

  if (!address || !profile) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-6 py-20">
        <p>Please Connect your wallet, and verify your credential.</p>
        {!address ? <ConnectWalletButton /> : null}
      </div>
    );
  }

  return (
    <>
      {/* <ProfileBannerImage profile={profile} /> */}
      <div className="container relative mx-auto flex min-h-screen max-w-screen-2xl flex-col items-start justify-start gap-10 px-4 py-[140px] md:px-4 lg:gap-16 lg:px-[50px]">
        <ProfileHeaderOverview
          profile={partner?.name ?? 'Bob Builder'}
          accountDetails={data}
        />
        <ProfileTabs items={tabConfig.developer} />
        {children}
      </div>
    </>
  );
}

// <div className="container relative mx-auto flex min-h-screen max-w-screen-2xl flex-col items-start justify-start md:px-4 lg:gap-16 lg:px-[50px]">
// {children}
// </div>
