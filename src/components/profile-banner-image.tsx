'use client';

import { profiles } from '@/config/profiles';
import { getLocalStorageItem } from '@/lib/localstorage';
import { IProfile } from '@/types';
import Image from 'next/image';

export default function ProfileBannerImage({ profile }: { profile: IProfile | null }) {
  return (
    <div className="relative h-[297px] w-full">
      <Image
        src={profile?.banner ?? '/images/banner-profile.png'}
        alt="cover-photo"
        placeholder={`data:image/images/banner-profile.png`}
        quality={100}
        sizes="100vw"
        fill
        className="absolute h-auto w-full"
        priority
      />
    </div>
  );
}
