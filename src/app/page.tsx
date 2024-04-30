import Banner from "@/components/Banner";
import PropertyCard from "@/ui/property-card";
import Navbar from "../components/Navbar";
import property1 from "@/assets/property1.jpg";
import property2 from "@/assets/property2.jpg";
import property3 from "@/assets/property3.jpg";
import property4 from "@/assets/property4.jpg";
import buildings from "@/assets/buildings.png";
import Image from "../../node_modules/next/image";
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
          <div className="flex justify-center flex-col items-center">
            <h2 className="text-3xl font-extrabold font-mona text-black">
              Making property investment simple
            </h2>
            <p className="text-gray-500 text-center mt-4">
              Aligning the incentives of the real estate developer, investors &
              tenants
            </p>
          </div>

          <div className="flex justify-center items-center">
            <Image src={buildings} width={500} height={500} alt="property" />
          </div>
        </div>
      </div>
    </main>
  );
}
