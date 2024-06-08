'use client';

import PropertyCard from '@/components/cards/property-card';
// import MarketplaceCard from '@/components/MarketplaceCard';
// import PropertyCard from '@/ui/property-card';
// import { useState } from 'react';
export default function Marketplace() {
  return (
    <>
      <div className="mt-12 border-b-2 border-gray-300 px-4 py-10 sm:mt-20 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 uppercase text-gray-500">Property Price</label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 uppercase text-gray-500">Property Type</label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 uppercase text-gray-500">Token Price</label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 uppercase text-gray-500">Country</label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 uppercase text-gray-500">Town/City</label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-10">
        <h1 className="banner-text mt-20 text-center font-mona text-lg uppercase sm:mt-40 sm:text-5xl lg:text-6xl">
          Market Place
        </h1>
        <p className="sm:text-md mt-2 text-center text-sm sm:text-3xl">
          Find the investment that’s right for you
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-40 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <PropertyCard key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
