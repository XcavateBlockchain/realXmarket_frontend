"use client";

import MarketplaceCard from "@/components/MarketplaceCard";
import Navbar from "@/components/Navbar";

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="px-10 py-10 border-gray-300 border-b-2">
        <div className="grid grid-cols-5 gap-12">
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0  text-gray-500 uppercase">Property Price</label>
            <select
              className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring"
             
            >
              <option value="Toast with Strawberry Juice">Show all</option>
              <option value="Toast with Strawberry Juice">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0  text-gray-500 uppercase">Property Type</label>
            <select
              className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring"
             
            >
              <option value="Toast with Strawberry Juice">Show all</option>
              <option value="Toast with Strawberry Juice">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0  text-gray-500 uppercase">Token Price</label>
            <select
              className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring"
             
            >
              <option value="Toast with Strawberry Juice">Show all</option>
              <option value="Toast with Strawberry Juice">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0  text-gray-500 uppercase">Country</label>
            <select
              className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring"
             
            >
              <option value="Toast with Strawberry Juice">Show all</option>
              <option value="Toast with Strawberry Juice">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0  text-gray-500 uppercase">Town/City</label>
            <select
              className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring"
             
            >
              <option value="Toast with Strawberry Juice">Show all</option>
              <option value="Toast with Strawberry Juice">Bello</option>
            </select>
          </div>
        </div>
      </div>

      <div className="px-10">
        <h1 className="banner-text uppercase font-mona text-3xl  text-center mt-40">Market Place</h1>
        <p className="text-center text-md mt-2">Find the investment that’s right for you</p>
        <div className="grid grid-cols-4 gap-4 mt-40">

            {Array.from({ length: 16 }).map((_, i) => (
                <MarketplaceCard  />
            ))}

        </div>
      </div>
    </>
  );
}
