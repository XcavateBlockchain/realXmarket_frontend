import React, { FC } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
const MarketplaceCard = () => {
  return (
    <div className="bg-white shadow-md rounded-md">
      <div className="bg-gray-200 h-60 w-full rounded-t-md overflow-hidden">
        <img
          src="https://flowbite.com/docs/images/blog/image-2.jpg"
          alt="Property Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <p className="text-sm text-gray-400 flex items-baseline">
            <CiLocationOn size={20} className="text-black" /> Hertford UK
          </p>
          <p className="text-xl text-black">
            <FaRegHeart />
          </p>
        </div>
        <p className="text-sm text-black font-bold mt-2">Plot 1 - Lea Wharf</p>
        <div className="flex justify-between mt-2">
          <p className="text-xs text-gray-400">
            Price : <span className="text-black">$ 4,56,600</span>
          </p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-xs text-gray-400">
            Tokens : <span className="text-black">100</span>{" "}
          </p>
          <p className="text-xs text-gray-400">
            APY : <span className="text-black">10 %</span>
          </p>
        </div>
        <button className="mt-4 px-4 w-full py-3 gradient-button text-sm font-medium text-white bg-[#3B4F74] rounded-md">
          View Details
        </button>
      </div>
    </div>
  );
};

export default MarketplaceCard;
