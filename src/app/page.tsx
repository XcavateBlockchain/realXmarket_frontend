import Banner from "@/components/Banner";
import PropertyCard from "@/ui/property-card";
import Navbar from "../components/Navbar";
import property1 from "@/assets/property1.jpg";
import property2 from "@/assets/property2.jpg";
import property3 from "@/assets/property3.jpg";
import property4 from "@/assets/property4.jpg";
import buildings from "@/assets/buildings.png";
import Image from "../../node_modules/next/image";
import FeatureCard from "@/ui/feature-card";
import Footer from "@/components/Footer";
import ID from "@/assets/ID-white.png";
import propertyIcon from "@/assets/Property Portfolio-white.png";
import verifyingIcon from "@/assets/Verify your identity-white.png";
import capitalIcon from "@/assets/Capital - Purchase-white.png";
const dummyFeatureData=[{
  id:1,
  title:"Connect digital identity & verify your credentials",
  img:ID,
},{
  id:2,
  title:"Choose a property and number of fractions ",
  img:propertyIcon,
},{
  id:3,
  title:"Agree to the terms of the smart contract & digitally sign",
  img:verifyingIcon,
},{
  id:4,
  title:"Make payment & receive your property tokens",
  img:capitalIcon,
}];
const dummyPropertyData = [
  {
    id: 1,
    title: "Villa In Alexandria",
    description:
      "Enjoy serenity of Deering Bay whole day from this spectacular North and...",
    price: "$245,890",
    img: property1,
  },
  {
    id: 2,
    title: "Villa In Alexandria",
    description:
      "Enjoy serenity of Deering Bay whole day from this spectacular North and...",
    price: "$245,890",
    img: property2,
  },
  {
    id: 3,
    title: "Villa In Alexandria",
    description:
      "Enjoy serenity of Deering Bay whole day from this spectacular North and...",
    price: "$245,890",
    img: property3,
  },
  {
    id: 4,
    title: "Villa In Alexandria",
    description:
      "Enjoy serenity of Deering Bay whole day from this spectacular North and...",
    price: "$245,890",
    img: property4,
  },
];
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  items-center justify-between">
      <div className="container mx-auto">
        <Navbar />
        <Banner />
        <div className="flex justify-center items-center flex-col">
          <div className="card-container grid grid-cols-4 gap-3">
            {dummyPropertyData.map((property) => {
              return <PropertyCard key={property.id} {...property} />;
            })}
          </div>
          <button className="border border-black rounded-xl py-4 px-8 bg-transparent font-normal text-black  transition duration-500 uppercase ">
            EXPLORE MarketPLACE{" "}
          </button>
        </div>
        <div className="flex justify-between items-center px-20 mt-20 mb-20">
          <div className="flex text-left justify-center flex-col  px-10">
            <h2 className="text-[38px] font-extrabold font-mona text-black">
              Making property investment <br/> simple
            </h2>
            <p className="text-gray-500 text-left text-xl mt-4">
              Aligning the incentives of the real estate developer, investors &
              tenants
            </p>
          </div>

          <div className="flex justify-center items-center">
            <Image src={buildings} width={500} height={500} alt="property" />
          </div>
        </div>
        <div className="px-20 grid grid-cols-2 gap-1 gap-y-6 ml-20">
            {dummyFeatureData.map((feature) => {
              return <FeatureCard key={feature.id} {...feature} />;
            })}
        </div>
        <Footer/>
      </div>
    </main>
  );
}
