import { ProfileTabs } from '@/components/profile-tabs';
import { tabConfig } from '@/config/tab';
import ProfileBanner from '@/components/profile-banner';
import ProfileHeaderOverview from './_components/profile-header';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function DeveloperLayout({ children }: Readonly<ProfileLayoutProps>) {
  return (
    <>
      <ProfileBanner />
      <div className="container relative mx-auto flex min-h-screen max-w-screen-2xl flex-col items-start justify-start gap-10 px-4 md:px-4 lg:gap-16 lg:px-[50px]">
        <ProfileHeaderOverview />
        <ProfileTabs items={tabConfig.invertor} />
        {children}
      </div>
    </>
  );
}
