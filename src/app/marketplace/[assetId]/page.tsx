import Navbar from "@/components/Navbar";
import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import { RiShareForwardBoxLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-4 px-20">
        <span className="text-xl font-normal">Back</span>
        <div className="flex gap-8 mt-10 px-8">
          <div className="w-1/2 flex flex-col overflow-hidden">
            <img
              src="https://flowbite.com/docs/images/blog/image-2.jpg"
              alt="Property Image"
              className="w-full h-full object-cover border border-black "
            />

            <div className="flex gap-3 mt-4 mx-auto">
              <div className="w-12 h-12 overflow-hidden rounded-sm shadow-md">
                <img
                  src="https://flowbite.com/docs/images/blog/image-2.jpg"
                  alt="Property Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 overflow-hidden border rounded-sm shadow-md">
                <img
                  src="https://flowbite.com/docs/images/blog/image-2.jpg"
                  alt="Property Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 overflow-hidden border rounded-sm shadow-md">
                <img
                  src="https://flowbite.com/docs/images/blog/image-2.jpg"
                  alt="Property Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 overflow-hidden border rounded-sm shadow-md">
                <img
                  src="https://flowbite.com/docs/images/blog/image-2.jpg"
                  alt="Property Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 overflow-hidden border rounded-sm shadow-md"></div>
              <div className="w-12 h-12 overflow-hidden border rounded-sm shadow-md"></div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"
                  alt="Rounded avatar"
                />
                <p className="font-bold">Gade homes</p>
              </div>
              <div className="flex gap-4 items-center">
                <FaRegHeart size={22} />
                <RiShareForwardBoxLine size={22} />
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <p className="text-md flex  items-center">
                <CiLocationOn size={20} className="text-black" /> Hertford UK
              </p>
              <p className="text-xl text-black font-normal mt-2">
                Plot 1 - Lea Wharf
              </p>
            </div>
            <div className="flex flex-col mt-4">
              <span className="text-xs flex  items-center">
                Price per token
              </span>
              <p className="text-xl text-gray-500 font-normal mt-2">
                31253.43 USDT ~ 1.00 ETH
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="flex flex-col py-2 border-t-2 px-1 border-gray-200">
                <span className="text-xs">Listing Price</span>
                <p className="text-sm text-gray-500 font-normal mt-2">
                  $1,00,000
                </p>
              </div>
              <div className="flex flex-col py-2 border-t-2 px-1 border-gray-200">
                <span className="text-xs">RIO Per NFT</span>
                <p className="text-sm text-gray-500 font-normal mt-2">
                  $1,00,000
                </p>
              </div>
              <div className="flex flex-col py-2 border-t-2 px-1 border-gray-200">
                <span className="text-xs">Token Minted</span>
                <p className="text-sm text-gray-500 font-normal mt-2">
                  $1,00,000
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="flex flex-col col-span-1 py-2 border-t-2 px-1 border-gray-200">
                <span className="text-xs">Property Type</span>
                <p className="text-sm text-gray-500 font-normal mt-2">
                  $1,00,000
                </p>
              </div>

              <div className="flex flex-col col-span-2 py-2 border-t-2 px-1 border-gray-200">
                <span className="text-xs">Area Prices</span>
                <div className="relative mb-6">
                  <input
                    type="range"
                    value="200000"
                    min="200000"
                    max="270000"
                    step="1"
                    className="w-full h-1 bg-gray-200 rounded-md range-sm appearance-none cursor-pointer "
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                    £200,000
                  </span>

                  <span className="text-xs text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                    £270,000
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="flex flex-col col-span-1 py-2 border-t-2 px-1 border-gray-200">
                <span className="text-xs">Property Type</span>
                <p className="text-sm text-gray-500 font-normal mt-2">
                  $1,00,000
                </p>
              </div>

              <div className="flex flex-col col-span-2 py-2 border-t-2 px-1 border-gray-200">
                <span className="text-xs">Area Prices</span>
                <div className="relative mb-6">
                  <input
                    type="range"
                    value="200000"
                    min="200000"
                    max="270000"
                    step="1"
                    className="w-full h-1 bg-gray-200 rounded-md range-sm appearance-none cursor-pointer "
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                    £200,000
                  </span>

                  <span className="text-xs text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                    £270,000
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="text-black shadow-md font-light uppercase border focus:ring-4  rounded-2xl text-sm px-4 py-2.5 gradient-button text-center bg-gradient-to-r"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default page;
