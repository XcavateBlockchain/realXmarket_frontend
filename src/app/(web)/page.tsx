import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaArrowDown } from 'react-icons/fa';
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
    <div className="container flex w-[90%] flex-col items-center space-y-12 md:space-y-12">
      {/* HERO section */}
      <div className="mt-0 flex w-full flex-col items-center justify-center gap-4">
        <h1
          style={{
            lineHeight: '56px',
            wordSpacing: '0.25em'
          }}
          className="bg-[linear-gradient(90deg,_#ecb278_-25.47%,_#dc7da6_35.16%,_#3b4f74_69.39%,_#57a0c5_103.47%)] bg-clip-text text-center font-mona font-black uppercase text-transparent md:text-[1.875rem]/[2.5rem] lg:text-[2.5rem]/[3.5rem]"
        >
          REAL ESTATE INVESTMENT MADE SIMPLE
        </h1>
        <p
          className="text-[1.
           md:text-center lg:text-balance"
        >
          All properties are independently verified prior to listing on the marketplace
        </p>
      </div>
      {/* NFT section */}
      <div className="mb-5 mt-28  hidden w-[80%] items-center justify-between gap-5 lg:flex">
        {/* {ad_properties.map((property: Property) => (
          <AdNFTCard key={property.id} {...property} />
        ))}
         */}
        <div className="flex flex-col items-center justify-center">
          <Image src={'/images/frame_1.png'} alt="hero" width={257} height={242} />
          <p className="text-bold mt-2 text-sm text-gray-700">Browse And Buy</p>
        </div>
        <div className="mb-20">
          {' '}
          <svg
            width="70"
            height="110"
            viewBox="0 0 70 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.9167 77.9167L52.5 55L37.9167 32.0833M17.5 77.9167L32.0833 55L17.5 32.0833"
              stroke="#3B4F74"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="mb-12 flex flex-col  items-center justify-center">
          <Image src={'/images/frame_2.png'} alt="hero" width={361} height={290} />
          <p className="text-bold mt-3 text-sm text-gray-700">Property Management</p>
        </div>
        <div className="mb-20">
          <svg
            width="70"
            height="110"
            viewBox="0 0 70 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.9167 77.9167L52.5 55L37.9167 32.0833M17.5 77.9167L32.0833 55L17.5 32.0833"
              stroke="#3B4F74"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Image src={'/images/frame_3.png'} alt="hero" width={257} height={242} />
          <p className="text-bold mt-2 text-sm text-gray-700">Relist & Sell</p>
        </div>
      </div>

      <div className="lg:hidden">{/* <AdNFTCard /> */}</div>

      <div className="mt-4 flex items-center justify-center">
        <Button asChild variant={'outline'} className="px-[102px]">
          <Link href={'/marketplace'}>EXPLORE MARKETPLACE</Link>
        </Button>
      </div>

      <FaArrowDown className="text-[#3B4F74]" />
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
          priority
        />
      </div>
      {/* Features */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:gap-[54px]">
        {how_it_works.map(steps => (
          <div
            key={steps.title}
            className='flex h-full w-full shrink-0 rounded-xl bg-[url("/images/feature_card.png")] bg-cover bg-no-repeat lg:h-[235px]'
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
