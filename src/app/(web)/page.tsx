import Image from 'next/image';
import AdNFTCard from '@/components/cards/ad-nft-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const how_it_works = [
  {
    id: 1,
    title: 'Connect digital identity & verify your credentials',
    img: '/icons/id_white.svg'
  },
  {
    id: 2,
    title: 'Choose a property and number of fractions',
    img: '/icons/portfolio_white.svg'
  },
  {
    id: 3,
    title: 'Agree to the terms of the smart contract & digitally sign',
    img: '/icons/verify_your_identity_white.svg'
  },
  {
    id: 4,
    title: 'Make payment & receive your property tokens',
    img: '/icons/capital_purchase_white.svg'
  }
];

export default function Home() {
  return (
    <div className="w-full space-y-12 md:space-y-10">
      {/* HERO section */}
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h1 className="bg-[linear-gradient(90deg,_#ecb278_-25.47%,_#dc7da6_35.16%,_#3b4f74_69.39%,_#57a0c5_103.47%)] bg-clip-text text-center font-mona font-black uppercase text-transparent md:text-[1.875rem]/[2.5rem] lg:text-[2.5rem]/[3.5rem]">
          WELCOME TO THE LARGEST DECENTRALIZED GLOBAL WEB3 REAL ESTATE INVESTOR COMMUNITY
        </h1>
        <p className="text-[1.125rem]/[1.5rem] md:text-center lg:text-balance">
          Buy, sell & trade real world rental real estate through NFTs in a trustless, fully
          decentralized way
        </p>
      </div>
      {/* NFT section */}
      <div className="hidden w-full items-center gap-5 lg:flex">
        <AdNFTCard />
        <AdNFTCard />
        <AdNFTCard />
        <AdNFTCard />
      </div>

      <div className="lg:hidden">
        <AdNFTCard />
      </div>

      <div className="flex items-center justify-center">
        <Button asChild variant={'outline'} className="px-[102px]">
          <Link href={'/marketplace'}>EXPLORE MARKETPLACE</Link>
        </Button>
      </div>
      {/* About  */}
      <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row md:gap-2 md:py-[100px] lg:gap-20">
        <div className="flex flex-col items-start justify-start gap-4">
          <h2 className="font-mona text-[1.125rem]/[1.5rem] font-black text-primary-foreground lg:text-[2.5rem]/[3.5rem]">
            Making property investment simple
          </h2>
          <p className="text-[1rem]/[1.5rem] md:text-[1.125rem]/[1.5rem]">
            Aligning the incentives of the real estate developer, investors & tenants
          </p>
        </div>
        <Image
          src={'/images/about.svg'}
          width={445}
          height={388}
          alt="property"
          className="md:w-[353px] lg:w-[445px]"
        />
      </div>
      {/* Features */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:gap-[54px]">
        {how_it_works.map(steps => (
          <div
            key={steps.title}
            className='flex h-full w-full shrink-0 bg-[url("/images/feature_card.png")] bg-cover bg-no-repeat lg:h-[235px]'
          >
            <div className="inline-flex flex-col items-start gap-3.5 px-8 py-7 md:gap-4 lg:px-[54px] lg:pb-[57px] lg:pt-[46px]">
              <Image
                src={steps.img}
                width={65}
                height={43}
                alt=""
                className="pointer-events-none fill-white"
              />
              <h4 className="font-mona text-[1.125rem]/[1.5rem] font-bold text-white lg:text-[1.5rem]/[2.5rem]">
                {steps.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
