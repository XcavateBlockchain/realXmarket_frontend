"use client";

import MarketplaceCard from "@/components/MarketplaceCard";
import Navbar from "@/components/Navbar";

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-10 py-10 border-gray-300 border-b-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-12">
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 text-gray-500 uppercase">
              Property Price
            </label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 text-gray-500 uppercase">
              Property Type
            </label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 text-gray-500 uppercase">
              Token Price
            </label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 text-gray-500 uppercase">
              Country
            </label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 text-gray-500 uppercase">
              Town/City
            </label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-10">
        <h1 className="banner-text uppercase font-mona text-center text-lg sm:text-2xl lg:text-3xl mt-20 sm:mt-40">
          Market Place
        </h1>
        <p className="text-center text-sm sm:text-md mt-2">
          Find the investment that’s right for you
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 sm:mt-40">
          {Array.from({ length: 16 }).map((_, i) => (
            <MarketplaceCard key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
