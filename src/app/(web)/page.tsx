import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaArrowDown } from 'react-icons/fa';
import { Shell } from '@/components/shell';
import FeatureSlide from './components/feature-slide';
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

//  className="container flex w-[90%] flex-col items-center space-y-12 md:space-y-12"

export default function Home() {
  return (
    <Shell className="gap-12">
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <h1 className="bg-[linear-gradient(90deg,_#ecb278_-25.47%,_#dc7da6_35.16%,_#3b4f74_69.39%,_#57a0c5_103.47%)] bg-clip-text text-center font-mona text-[1.7rem] font-black uppercase text-transparent md:text-[1.875rem]/[2.5rem] lg:text-[2.5rem]/[3.5rem]">
            REAL ESTATE INVESTMENT MADE SIMPLE
          </h1>
          <p className="text-center text-[16px]/[24px] md:text-balance md:text-[18px]/[24px] lg:text-[22px]/[24px]">
            All properties are independently verified prior to listing on the marketplace
          </p>
        </div>
        <div className="hidden w-full items-center justify-between md:flex">
          <div className="flex flex-col items-center justify-center gap-6">
            <Image src={'/images/frame_1.png'} alt="hero" width={257} height={242} />
            <p className="font-sans text-[18px]/[24px] font-medium">Browse & Buy</p>
          </div>
          <HomeArrow className="mb-20 h-[110px] w-[70px]" />
          <div className="flex flex-col items-center justify-center gap-6">
            <Image src={'/images/frame_2.png'} alt="hero" width={361} height={290} />
            <p className="font-sans text-[18px]/[24px] font-medium">Property Management</p>
          </div>
          <HomeArrow className="mb-20 h-[110px] w-[70px]" />
          <div className="flex flex-col items-center justify-center gap-6">
            <Image src={'/images/frame_3.png'} alt="hero" width={257} height={242} />
            <p className="font-sans text-[18px]/[24px] font-medium">Relist & Sell</p>
          </div>
        </div>
        <FeatureSlide />
        <Button asChild variant={'outline'}>
          <Link href={'/marketplace'}>EXPLORE MARKETPLACE</Link>
        </Button>
        <ArrowDown />
      </div>
      {/* About  */}
      <section className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row md:gap-2 md:py-[100px] lg:gap-20">
        <div className="flex flex-col items-start justify-start gap-4">
          <h2 className="font-mona text-[1.125rem]/[1.5rem] font-black text-primary-foreground lg:text-[2.5rem]/[3.5rem]">
            Making property investment simple
          </h2>
          <p className="text-[1rem]/[1.5rem] md:text-[1.125rem]/[1.5rem]">
            Create your own property portfolio in minutes. No fund managers or agents required.
          </p>
        </div>
        <Image
          src={'/images/about.svg'}
          width={445}
          height={388}
          alt="property"
          className="md:w-[353px] lg:w-[445px]"
          priority
        />
      </section>
      {/* Features */}
      <section className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:gap-[54px]">
        {how_it_works.map(steps => (
          <div
            key={steps.title}
            className='flex h-full w-full shrink-0 rounded-lg bg-[url("/images/feature_card.png")] bg-cover bg-no-repeat'
          >
            <div className="inline-flex w-full flex-col items-start gap-3.5 px-8 py-7 md:gap-4 lg:max-w-lg lg:px-[54px] lg:pb-[57px] lg:pt-[46px]">
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
      </section>
    </Shell>
  );
}

const HomeArrow = (props: any) => (
  <svg viewBox="0 0 70 110" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M37.9167 77.9167L52.5 55L37.9167 32.0833M17.5 77.9167L32.0833 55L17.5 32.0833"
      stroke="#3B4F74"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowDown = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.9808 4.16669V15.8334M10.9808 15.8334L16.8141 10M10.9808 15.8334L5.14746 10"
      stroke="#56A0C6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
