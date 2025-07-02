import React, { FC } from 'react';
import { FaRegHeart } from 'react-icons/fa6';
import { CiLocationOn } from 'react-icons/ci';
const MarketplaceCard = () => {
  return (
    <div className="rounded-md bg-white shadow-md">
      <div className="h-60 w-full overflow-hidden rounded-t-md bg-gray-200">
        <img
          src="https://flowbite.com/docs/images/blog/image-2.jpg"
          alt="Property Image"
          className="size-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <p className="flex items-baseline text-sm text-gray-400">
            <CiLocationOn size={20} className="text-black" /> Hertford UK
          </p>
          <p className="text-xl text-black">
            <FaRegHeart />
          </p>
        </div>
        <p className="mt-2 text-sm font-bold text-black">Plot 1 - Lea Wharf</p>
        <div className="mt-2 flex justify-between">
          <p className="text-xs text-gray-400">
            Price : <span className="text-black">$ 4,56,600</span>
          </p>
        </div>
        <div className="mt-2 flex justify-between">
          <p className="text-xs text-gray-400">
            Tokens : <span className="text-black">100</span>{' '}
          </p>
          <p className="text-xs text-gray-400">
            APY : <span className="text-black">10 %</span>
          </p>
        </div>
        <button className="gradient-button mt-4 w-full rounded-md bg-[#3B4F74] px-4 py-3 text-sm font-medium text-white">
          <a href="/marketplace/11">View Details</a>
        </button>
      </div>
    </div>
  );
};

export default MarketplaceCard;
