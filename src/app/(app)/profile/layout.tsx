import { ProfileTabs } from '@/components/profile-tabs';
import { tabConfig } from '@/config/tab';
import ProfileHeaderOverview from './_components/profile-header';
import ProfileBannerImage from '@/components/profile-banner-image';
import { getCookieStorage } from '@/lib/cookie-storage';
import { profiles } from '@/config/profiles';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default async function DeveloperLayout({ children }: Readonly<ProfileLayoutProps>) {
  const address = await getCookieStorage('accountKey');
  const profile = profiles[address as string] ?? null;
  return (
    <>
      <ProfileBannerImage profile={profile} />
      <div className="container relative mx-auto flex min-h-screen max-w-screen-2xl flex-col items-start justify-start gap-10 px-4 md:px-4 lg:gap-16 lg:px-[50px]">
        <ProfileHeaderOverview profile={profile} />
        <ProfileTabs items={tabConfig.invertor} />
        {children}
      </div>
    </>
  );
}
