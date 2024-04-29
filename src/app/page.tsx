import Banner from "@/components/Banner";
import PropertyCard from "@/ui/property-card";
import Navbar from "../components/Navbar";
import property1 from "../../public/assets/property1.jpg";
import property2 from "../../public/assets/property2.jpg";
import property3 from "../../public/assets/property3.jpg";
import property4 from "../../public/assets/property4.jpg";
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
        <div className="card-container grid grid-cols-4 gap-3">
          {dummyPropertyData.map((property) => {
            return <PropertyCard key={property.id} {...property} />;
          })}
        </div>
      </div>
    </main>
  );
}
