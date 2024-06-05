import Image from 'next/image';

export function OverviewCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="relative flex h-full w-full shrink-0 flex-col items-start gap-4 bg-white/[0.71] p-3 font-mona shadow-profile-card md:h-[182px] md:gap-12 md:p-6">
      <dt className="text-[0.75rem]/[1.5rem] font-semibold md:text-[1.125rem]/[1.5rem]">
        {title}
      </dt>
      <dd className="px-2.5 text-[1.5rem] font-semibold text-primary md:px-5 md:text-[2.5rem]">
        {value}
      </dd>
      <Image
        src={'/images/x_card_bg.svg'}
        alt=""
        width={170}
        height={170}
        className="absolute right-0 top-0 hidden bg-cover bg-no-repeat opacity-[0.2] mix-blend-luminosity md:block"
        priority
      />
      <Image
        src={'/images/x_card_bg.svg'}
        alt=""
        width={93}
        height={93}
        className="absolute right-0 top-0 block bg-cover bg-no-repeat opacity-[0.2] mix-blend-luminosity md:hidden"
        priority
      />
    </div>
  );
}
