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
                    min={200000}
                    max={270000}
                    step={1}
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
      <div className="bg-[#F4F4F4] px-20 py-10 border mt-8">
        <div className="flex gap-8 mt-10 px-8">
          <div className="w-1/2 flex flex-col">
            <h1 className="text-[#4E4E4E]">Property Description</h1>
            <p className="text-md text-[#191A1BD9] mt-2">
              Welcome to this stunning 3-bedroom, 2-bathroom condo located in
              the heart of downtown. This spacious corner unit boasts
              breathtaking city views and features a modern open floor plan,
              perfect for entertaining. The condo has been recently renovated
              with brand new hardwood floors, stainless steel appliances, and a
              state-of-the-art security system.
            </p>
            <h1 className="text-[#4E4E4E] mt-10">Details</h1>

            <div className="flex justify-between text-[#4E4E4E] py-2 mt-4 border-t-2 px-1 border-gray-200">
              <span className="text-sm ">Bedroom</span>
              <p className="text-sm font-normal mt-2">$1,00,000</p>
            </div>
            <div className="flex justify-between text-[#4E4E4E] py-2 mt-0 border-t-2 px-1 border-gray-200">
              <span className="text-sm ">Bathroom</span>
              <p className="text-sm font-normal mt-2">$1,00,000</p>
            </div>
            <div className="flex justify-between text-[#4E4E4E] py-2 mt-0 border-t-2 px-1 border-gray-200">
              <span className="text-sm ">Location</span>
              <p className="text-sm font-normal mt-2">$1,00,000</p>
            </div>
            <div className="flex justify-between text-[#4E4E4E] py-2 mt-0 border-t-2 px-1 border-gray-200">
              <span className="text-sm ">Type</span>
              <p className="text-sm font-normal mt-2">$1,00,000</p>
            </div>
            <div className="flex justify-between text-[#4E4E4E] py-2 mt-0 border-t-2 px-1 border-gray-200">
              <span className="text-sm ">Location</span>
              <p className="text-sm font-normal mt-2">$1,00,000</p>
            </div>
          </div>
          <div className="w-1/2 flex flex-col">
            <h1 className="font-bold">MAP</h1>
            <div className="bg-gray-300 w-full h-full mt-2"></div>
          </div>
        </div>
      </div>

      <div className="px-20 flex flex-col mt-10">
        <h1 className="text-[#4E4E4E] text-xl mb-4">Item Activity</h1>
        <table className="min-w-full border-separate border-spacing-y-2 border-t-2 border-spacing-x-2">
          <thead className="hidden border-b lg:table-header-group">
            <tr className="">
              <td
           
                className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
              >
                Action
              </td>

              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                From
              </td>

              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                Trade Price
              </td>

              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                To
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                Date
              </td>
            </tr>
          </thead>

          <tbody className="lg:border-gray-300">
            <tr className="">
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                07 February, 2022
              </td>

              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                07 February, 2022
              </td>

              <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                $59.00
              </td>

              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                07 February, 2022
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                07 February, 2022
              </td>
            </tr>

            <tr className="">
              <td
               
                className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
              >
                Basic Plan - Nov 2021
               
              </td>

              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                14 November, 2021
              </td>

              <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                $29.00
               
              </td>

              <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                $29.00
               
              </td>
              <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                $29.00
               
              </td>
            </tr>

            <tr className="">
              <td
               
                className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
              >
                Basic Plan - Oct 2021
                
              </td>

              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                15 October, 2021
              </td>

              <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                $29.00
               
              </td>
              <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                $29.00
               
              </td>
              <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                $29.00
               
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default page;
