'use client';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa6';
import { RiShareForwardBoxLine } from 'react-icons/ri';
import { CiLocationOn } from 'react-icons/ci';
const page = () => {
  const [fundModal, setFundModal] = useState(false);
  const [numberOfTokensModal, setNumberOfTokensModal] = useState(false);
  const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
  const [paymentSummaryModal, setPaymentSummaryModal] = useState(false);

  const NumberOfTokensModal = () => {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-md backdrop-brightness-90 md:inset-0">
        <div className="relative flex h-auto w-full justify-center p-4">
          <div className="relative w-1/3 rounded-lg bg-white shadow">
            <div className="flex items-center justify-between rounded-t px-5 md:py-2">
              <h1 className="font-mona text-xl">Payment Summary</h1>
              <button
                type="button"
                onClick={() => setNumberOfTokensModal(false)}
                className="ms-auto inline-flex h-6 w-6 items-center justify-center rounded-sm border bg-transparent text-sm text-black"
              >
                <svg
                  className="h-2 w-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex flex-col space-y-4 p-4 py-1 md:p-5">
              <div className="flex">
                <div className="flex h-20 w-20 flex-col items-center justify-center overflow-hidden border">
                  <img
                    src="https://flowbite.com/docs/images/blog/image-2.jpg"
                    alt="Property Image"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4 flex flex-col">
                  <h1 className="font-mona text-xs">Gade Homes</h1>
                  <p className="text-xl text-black">Plot 1 - Lea Wharf</p>
                  <p className="mt-1 flex items-baseline text-sm text-gray-400">
                    <CiLocationOn size={20} className="text-black" /> Hertford UK
                  </p>
                </div>
              </div>

              <div className="rounded-md border border-gray-400 px-2 py-4">
                <div className="flex justify-between px-2">
                  <p className="text-md text-black">Number of Tokens</p>
                  <p className="text-md text-gray-500">0</p>
                </div>
                <div className="mt-2 flex justify-between px-2">
                  <p className="text-md text-black">Price Per Token</p>
                  <p className="text-md text-gray-500">31253.43 USDT</p>
                </div>
                <div className="flex justify-between px-2">
                  <p className="text-md text-black"></p>
                  <p className="text-sm text-gray-500">£250,00</p>
                </div>
              </div>

              <div className="flex justify-between">
                <p className="text-xs text-black">Wallet Balance:</p>
                <p className="text-xs text-red-500">0.00 USDT</p>
              </div>
              <input
                type="text"
                placeholder="XXXXXXXXXXXXXXXXXXXX..."
                className="rounded-sm border p-2"
              />
              <div className="flex justify-between">
                <p className="text-xs text-black">Tokens</p>
                <p className="text-xs text-gray-500">30 of 100</p>
              </div>

              <div className="flex justify-between">
                <button className="rounded-md border bg-transparent px-4 py-2">CANCEL</button>
                <button
                  onClick={() => {
                    setNumberOfTokensModal(false);
                    setPaymentSummaryModal(true);
                  }}
                  className="gradient-button rounded-xl border bg-gradient-to-r px-6 py-2 text-center text-sm uppercase text-black shadow-md focus:ring-4"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PaymentSuccessModal = () => {
    return (
      <div className="backdrop-brightness-10 fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-md md:inset-0">
        <div className="relative flex h-auto w-full justify-center p-4">
          <div className="relative h-auto w-1/3 rounded-lg bg-white shadow">
            <div className="flex items-center justify-between rounded-t px-5 md:py-5">
              <button
                onClick={() => setPaymentSuccessModal(false)}
                type="button"
                className="ms-auto inline-flex h-6 w-6 items-center justify-center rounded-md border bg-transparent text-sm text-gray-400"
              >
                <svg
                  className="h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4 p-4 py-1 md:p-5">
              <div className="mb-3 h-28 w-28 overflow-hidden rounded-full bg-green-300">
                <img src="" />
              </div>
              <h1 className="text-center text-xl font-bold text-black">Successful</h1>
              <p className="text-center">
                Congratulations! Your NFT purchase was successful. You now own a fraction of
                Plot - Plea Wharf. Please note it might take a few minutes to reflect in your
                profile.
              </p>
              <button className="gradient-button w-[200px] rounded-2xl border bg-gradient-to-r px-4 py-3 text-center text-sm uppercase text-black shadow-md focus:ring-4">
                PROFILE
              </button>
              <button className="mt-4 bg-transparent px-4 py-3">MARKETPLACE</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const PaymentSummaryModal = () => {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-md backdrop-brightness-90 md:inset-0">
        <div className="relative flex h-auto w-full justify-center p-4">
          <div className="relative w-1/3 rounded-lg bg-white shadow">
            <div className="flex items-center justify-between rounded-t px-5 md:py-2">
              <h1 className="font-mona text-xl">Payment Summary</h1>
              <button
                type="button"
                onClick={() => setPaymentSummaryModal(false)}
                className="ms-auto inline-flex h-6 w-6 items-center justify-center rounded-sm border bg-transparent text-sm text-black"
              >
                <svg
                  className="h-2 w-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex flex-col space-y-4 p-4 py-1 md:p-5">
              <div className="flex">
                <div className="flex h-20 w-20 flex-col items-center justify-center overflow-hidden border">
                  <img
                    src="https://flowbite.com/docs/images/blog/image-2.jpg"
                    alt="Property Image"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4 flex flex-col">
                  <h1 className="font-mona text-xs">Gade Homes</h1>
                  <p className="text-xl text-black">Plot 1 - Lea Wharf</p>
                  <p className="mt-1 flex items-baseline text-sm text-gray-400">
                    <CiLocationOn size={20} className="text-black" /> Hertford UK
                  </p>
                </div>
              </div>
              <div className="mt-2 flex justify-between px-2">
                <p className="text-md text-black">Payment Method</p>
                <p className="text-md text-black">Victor (0xabccvee...)</p>
              </div>
              <div className="flex justify-between px-2">
                <p className="text-md text-black">Payment Currency</p>
                <p className="text-md text-black">31253.43 USDT</p>
              </div>
              <div className="flex justify-between px-2">
                <p className="text-md text-black"></p>
                <p className="text-md text-gray-500">⁓£250,00</p>
              </div>

              <div className="rounded-md border border-gray-400 px-2 py-4">
                <div className="flex justify-between px-2">
                  <p className="text-md text-black">Number of Tokens</p>
                  <p className="text-md text-gray-500">0</p>
                </div>
                <div className="flex justify-between px-2">
                  <p className="text-md text-black">Price Per Token</p>
                  <p className="text-md text-gray-500">31253.43 USDT</p>
                </div>
                <div className="flex justify-between px-2">
                  <p className="text-md text-black"></p>
                  <p className="text-sm text-gray-500">£250,00</p>
                </div>
                <div className="flex flex-col justify-between rounded-md bg-[#3B4F741A] px-2 py-2">
                  <div className="flex justify-between">
                    <p className="text-md text-black">Total</p>
                    <p className="text-md text-gray-500">£250,00</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-md"></p>
                    <p className="text-sm text-gray-500">£250,00</p>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex justify-between px-2">
                <p className="text-md text-black">Payment Method</p>
                <p className="text-md text-black">Victor (0xabccvee...)</p>
              </div>
              <div className="flex justify-between px-2">
                <p className="text-md text-black">Payment Currency</p>
                <p className="text-md text-black">31253.43 USDT</p>
              </div>
              <div className="flex justify-between px-2">
                <p className="text-md text-black"></p>
                <p className="text-md text-gray-500">⁓£250,00</p>
              </div>
              <div className="flex justify-between">
                <button className="rounded-xl border bg-transparent px-4 py-1">Back</button>
                <button
                  onClick={() => {
                    setPaymentSummaryModal(false);
                    setPaymentSuccessModal(true);
                  }}
                  className="gradient-button rounded-xl border bg-gradient-to-r px-6 py-3 text-center text-sm uppercase text-black shadow-md focus:ring-4"
                >
                  PROCEED
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddFundModal = () => {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-md backdrop-brightness-90 md:inset-0">
        <div className="relative flex h-auto w-full justify-center p-4">
          <div className="relative w-1/3 rounded-lg bg-white shadow">
            <div className="flex items-center justify-between rounded-t px-5 md:py-5">
              <h1 className="font-mona text-xl">Fund or change wallet</h1>
              <button
                type="button"
                onClick={() => setFundModal(false)}
                className="ms-auto inline-flex h-6 w-6 items-center justify-center rounded-sm border bg-transparent text-sm text-black"
              >
                <svg
                  className="h-2 w-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex flex-col space-y-4 p-4 py-1 md:p-5">
              <p>
                You don’t have up to the required amount needed to make this purchase please
                transfer funds to your wallet.{' '}
              </p>

              <div className="flex justify-between">
                <p className="text-xs text-black">Wallet Balance:</p>
                <p className="text-xs text-red-500">0.00 USDT</p>
              </div>
              <input
                type="text"
                placeholder="XXXXXXXXXXXXXXXXXXXX..."
                className="rounded-sm border p-2"
              />

              <div className="flex justify-between">
                <button className="rounded-xl border bg-transparent px-4 py-1">Back</button>
                <button
                  onClick={() => {
                    setFundModal(false);
                    setNumberOfTokensModal(true);
                  }}
                  className="gradient-button rounded-xl border bg-gradient-to-r px-6 py-3 text-center text-sm uppercase text-black shadow-md focus:ring-4"
                >
                  ADD FUNDS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="container mx-auto px-4 py-4 sm:mt-20 md:px-20">
        <span className="cursor-pointer text-xl font-normal">Back</span>
        <div className="mt-10 flex w-full flex-col gap-8 px-4 md:flex-row md:px-8">
          <div className="flex w-full flex-col overflow-hidden md:w-1/2">
            <img
              src="https://flowbite.com/docs/images/blog/image-2.jpg"
              alt="Property Image"
              className="h-full w-full border border-black object-cover"
            />
            <div className="mx-auto mt-4 flex gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 w-12 overflow-hidden rounded-sm border shadow-md">
                  <img
                    src="https://flowbite.com/docs/images/blog/image-2.jpg"
                    alt="Property Image"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"
                  alt="Rounded avatar"
                />
                <p className="font-bold">Gade homes</p>
              </div>
              <div className="flex items-center gap-4">
                <FaRegHeart size={22} />
                <RiShareForwardBoxLine size={22} />
              </div>
            </div>
            <div className="mt-4 flex flex-col">
              <p className="text-md flex items-center">
                <CiLocationOn size={20} className="text-black" /> Hertford UK
              </p>
              <p className="mt-2 text-xl font-normal text-black">Plot 1 - Lea Wharf</p>
            </div>
            <div className="mt-4 flex flex-col">
              <span className="text-xs">Price per token</span>
              <p className="mt-2 text-xl font-normal text-gray-500">
                31253.43 USDT ~ 1.00 ETH
              </p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">Listing Price</span>
                <p className="mt-2 text-sm font-normal text-gray-500">$1,00,000</p>
              </div>
              <div className="flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">RIO Per NFT</span>
                <p className="mt-2 text-sm font-normal text-gray-500">$1,00,000</p>
              </div>
              <div className="flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">Token Minted</span>
                <p className="mt-2 text-sm font-normal text-gray-500">$1,00,000</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="col-span-1 flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">Property Type</span>
                <p className="mt-2 text-sm font-normal text-gray-500">$1,00,000</p>
              </div>
              <div className="col-span-2 flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">Area Prices</span>
                <div className="relative mb-6">
                  <input
                    type="range"
                    min="200000"
                    max="270000"
                    step="1"
                    className="h-1 w-full cursor-pointer appearance-none rounded-md bg-gray-200"
                  />
                  <span className="absolute -bottom-6 start-0 text-xs text-gray-500">
                    £200,000
                  </span>
                  <span className="absolute -bottom-6 end-0 text-xs text-gray-500">
                    £270,000
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="col-span-1 flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">Property Type</span>
                <p className="mt-2 text-sm font-normal text-gray-500">$1,00,000</p>
              </div>
              <div className="col-span-2 flex flex-col border-t-2 border-gray-200 px-1 py-2">
                <span className="text-xs">Area Prices</span>
                <div className="relative mb-6">
                  <input
                    type="range"
                    min="200000"
                    max="270000"
                    step="1"
                    className="h-1 w-full cursor-pointer appearance-none rounded-md bg-gray-200"
                  />
                  <span className="absolute -bottom-6 start-0 text-xs text-gray-500">
                    £200,000
                  </span>
                  <span className="absolute -bottom-6 end-0 text-xs text-gray-500">
                    £270,000
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFundModal(true)}
              className="gradient-button mt-3 rounded-2xl border bg-gradient-to-r px-4 py-2.5 text-center text-sm font-light uppercase text-black shadow-md focus:ring-4"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-[#F4F4F4] px-4 py-10 md:px-20">
        <div className="mt-10 flex flex-col gap-8 px-4 md:flex-row md:px-8">
          <div className="flex w-full flex-col md:w-1/2">
            <h1 className="text-[#4E4E4E]">Property Description</h1>
            <p className="text-md mt-2 text-[#191A1BD9]">
              Welcome to this stunning 3-bedroom, 2-bathroom condo located in the heart of
              downtown. This spacious corner unit boasts breathtaking city views and features a
              modern open floor plan, perfect for entertaining. The condo has been recently
              renovated with brand new hardwood floors, stainless steel appliances, and a
              state-of-the-art security system.
            </p>
            <h1 className="mt-10 text-[#4E4E4E]">Details</h1>
            {['Bedroom', 'Bathroom', 'Location', 'Type', 'Location'].map((detail, i) => (
              <div
                key={i}
                className="mt-0 flex justify-between border-t-2 border-gray-200 px-1 py-2 text-[#4E4E4E]"
              >
                <span className="text-sm">{detail}</span>
                <p className="mt-2 text-sm font-normal">$1,00,000</p>
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col md:w-1/2">
            <h1 className="font-bold">MAP</h1>
            <div className="mt-2 h-full w-full bg-gray-300"></div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex w-full flex-col overflow-x-scroll px-4 md:px-20">
        <h1 className="mb-4 text-xl text-[#4E4E4E]">Item Activity</h1>
        <table className="min-w-full border-separate border-spacing-x-2 border-spacing-y-2 border-t-2 border-gray-200">
          <thead className="border-b lg:table-header-group">
            <tr>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                Action
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                From
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                Trade Price
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                To
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                Date
              </td>
            </tr>
          </thead>
          <tbody className="lg:border-gray-300">
            <tr>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $59.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $59.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $59.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $29.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $29.00
              </td>
            </tr>
            <tr>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $59.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $59.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $59.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $29.00
              </td>
              <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                $29.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {fundModal && <AddFundModal />}
      {numberOfTokensModal && <NumberOfTokensModal />}
      {paymentSuccessModal && <PaymentSuccessModal />}
      {paymentSummaryModal && <PaymentSummaryModal />}
    </>
  );
};

export default page;
