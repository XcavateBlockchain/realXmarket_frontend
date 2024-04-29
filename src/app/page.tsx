
import Banner from "@/components/Banner";
import PropertyCard from "@/ui/property-card";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  items-center justify-between">
      <div className="container mx-auto">
        <Navbar/>
        <Banner/>
        <div className="card-container grid grid-cols-4 gap-3">
            <PropertyCard/>
            <PropertyCard/>
            <PropertyCard/>
            <PropertyCard/>
        </div>
      </div>
    </main>
  );
}
