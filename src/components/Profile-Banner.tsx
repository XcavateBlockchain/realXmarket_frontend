import Image from 'next/image';

export default function ProfileBanner() {
  return (
    <div className="relative h-[297px] w-full">
      <Image
        src={'/images/banner-profile.png'}
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
