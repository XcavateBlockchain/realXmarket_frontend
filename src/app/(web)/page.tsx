import Banner from '@/components/Banner';
import PropertyCard from '@/ui/property-card';
// import Navbar from '../components/Navbar';
import property1 from '@/assets/property1.jpg';
import property2 from '@/assets/property2.jpg';
import property3 from '@/assets/property3.jpg';
import property4 from '@/assets/property4.jpg';
import buildings from '@/assets/buildings.png';
import Image from 'next/image';
import FeatureCard from '@/ui/feature-card';
import Footer from '@/components/Footer';
import ID from '@/assets/ID-white.png';
import propertyIcon from '@/assets/Property Portfolio-white.png';
import verifyingIcon from '@/assets/Verify your identity-white.png';
import capitalIcon from '@/assets/Capital - Purchase-white.png';
const dummyFeatureData = [
  {
    id: 1,
    title: 'Connect digital identity & verify your credentials',
    img: ID
  },
  {
    id: 2,
    title: 'Choose a property and number of fractions ',
    img: propertyIcon
  },
  {
    id: 3,
    title: 'Agree to the terms of the smart contract & digitally sign',
    img: verifyingIcon
  },
  {
    id: 4,
    title: 'Make payment & receive your property tokens',
    img: capitalIcon
  }
];
const dummyPropertyData = [
  {
    id: 1,
    title: 'Villa In Alexandria',
    description: 'Enjoy serenity of Deering Bay whole day from this spectacular North and...',
    price: '$245,890',
    img: property1
  },
  {
    id: 2,
    title: 'Villa In Alexandria',
    description: 'Enjoy serenity of Deering Bay whole day from this spectacular North and...',
    price: '$245,890',
    img: property2
  },
  {
    id: 3,
    title: 'Villa In Alexandria',
    description: 'Enjoy serenity of Deering Bay whole day from this spectacular North and...',
    price: '$245,890',
    img: property3
  },
  {
    id: 4,
    title: 'Villa In Alexandria',
    description: 'Enjoy serenity of Deering Bay whole day from this spectacular North and...',
    price: '$245,890',
    img: property4
  }
];
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container mx-auto">
        {/* <Navbar /> */}
        <Banner />
        <div className="flex flex-col items-center justify-center">
          <div className="card-container grid grid-cols-4 gap-3">
            {dummyPropertyData.map(property => {
              return <PropertyCard key={property.id} {...property} />;
            })}
          </div>
          <button className="rounded-xl border border-black bg-transparent px-8 py-4 font-normal uppercase text-black transition duration-500">
            EXPLORE MarketPLACE{' '}
          </button>
        </div>
        <div className="mb-20 mt-20 flex items-center justify-between px-20">
          <div className="flex flex-col justify-center px-10 text-left">
            <h2 className="font-mona text-[38px] font-extrabold text-black">
              Making property investment <br /> simple
            </h2>
            <p className="mt-4 text-left text-xl text-gray-500">
              Aligning the incentives of the real estate developer, investors & tenants
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Image src={buildings} width={500} height={500} alt="property" />
          </div>
        </div>
        <div className="ml-20 grid grid-cols-2 gap-1 gap-y-6 px-20">
          {dummyFeatureData.map(feature => {
            return <FeatureCard key={feature.id} {...feature} />;
          })}
        </div>
      </div>
    </main>
  );
}
