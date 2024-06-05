'use client';
import React from 'react';
import { MdSwapHoriz } from 'react-icons/md';
const PropertyModalCard = () => {
  const [step, setStep] = React.useState(1);
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-md backdrop-brightness-90 md:inset-0">
        <div className="relative flex h-[100%] w-full justify-center p-4">
          <section className="shadow-black-50 mx-auto h-[100vh] max-w-screen-md rounded-md bg-white text-gray-600 sm:my-10">
            <div className="container mx-auto flex flex-col flex-wrap px-5 pb-12">
              <div className="mx-auto mb-10 mt-4 flex w-full flex-wrap items-center space-x-4 py-4 md:mb-10 md:justify-center md:px-4">
                <span className="hidden h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white shadow md:inline-flex">
                  1
                </span>
                <span className="hidden text-teal-500 md:inline">Property Information</span>
                <span className="hidden h-0.5 w-10 bg-teal-400 md:inline"></span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow">
                  2
                </span>
                <span className="text-blue-600 md:inline">Pricing Details</span>
                <span className="hidden h-0 w-10 border-t-2 border-dashed border-gray-400 md:inline"></span>
                <span className="hidden h-8 w-8 items-center justify-center rounded-full bg-white text-blue-700 shadow md:inline-flex">
                  3
                </span>
                <span className="hidden text-gray-600 md:inline">Additional Details</span>
              </div>

              {step === 1 && (
                <>
                  <div className="flex w-full flex-col px-8">
                    <div className="mt-0 grid items-center gap-3 gap-y-5 sm:grid-cols-6">
                      <div className="flex flex-col sm:col-span-2">
                        <label className="mb-1 ml-0 font-normal text-gray-500">
                          Property Name
                        </label>
                        <input
                          type="text"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Toast"
                        />
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <label className="mb-1 ml-0 font-normal text-gray-500">
                          Property Number
                        </label>
                        <input
                          type="text"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Toast"
                        />
                      </div>

                      <div className="col-span-2 flex flex-col">
                        <label className="mb-1 ml-0 text-gray-500">Property Type</label>
                        <select
                          className="rounded-sm border border-black px-2 py-2 shadow-sm outline-none focus:ring"
                          name=""
                          id=""
                        >
                          <option value="Toast with Strawberry Juice">Hello</option>
                          <option value="Toast with Strawberry Juice">Bello</option>
                        </select>
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <label className="mb-1 ml-0 text-xs font-normal text-gray-500">
                          Property Address
                        </label>
                        <input
                          type="text"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Street"
                        />
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <input
                          type="text"
                          className="mt-5 rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="City"
                        />
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <input
                          type="text"
                          className="mt-5 rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Post Code"
                        />
                      </div>
                      <div className="flex flex-col sm:col-span-3">
                        <label className="mb-1 ml-0 font-normal text-gray-500">
                          Property Development Code
                        </label>
                        <input
                          type="text"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Toast"
                        />
                      </div>

                      <div className="col-span-3 flex flex-col">
                        <label className="mb-1 ml-0 text-gray-500">
                          Planning Permission Code
                        </label>
                        <input
                          type="text"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Toast"
                        />
                      </div>

                      <div className="flex flex-col sm:col-span-2">
                        <label className="mb-1 ml-0 font-normal text-gray-500">
                          Local Authority
                        </label>
                        <input
                          type="text"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Toast"
                        />
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <label className="mb-1 ml-0 font-normal text-gray-500">
                          Title Deed Number
                        </label>
                        <input
                          type="text"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Toast"
                        />
                      </div>

                      <div className="col-span-2 flex flex-col">
                        <label className="mb-1 ml-0 text-gray-500">Google Map Link</label>
                        <input
                          type="text"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Toast"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="mb-1 whitespace-nowrap text-black">Document</label>
                        <p className="whitespace-nowrap text-sm">
                          Please upload your ID (drivers license or passport ) and a utility
                          bill within 3 months
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="mt-4 flex w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4">
                        <p className="mt-4 text-center text-xs font-medium text-gray-800">
                          Drop Files here
                          <label className="mt-2 block bg-white px-4 py-0.5 font-normal text-blue-500">
                            <input className="hidden" type="file" name="file" id="" />
                          </label>
                        </p>
                      </div>

                      <div className="mt-4 flex w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4">
                        <div className="">
                          <p className="cursor-pointer text-sm font-medium text-blue-600/90">
                            design_proposal.pdf
                          </p>
                          <p className="text-xs text-gray-600">1.4MB</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col items-center justify-between">
                      <button
                        onClick={() => setStep(2)}
                        className="gradient-button group my-2 mb-3 rounded-lg bg-blue-700 py-2 text-center font-bold text-white outline-none focus:ring sm:order-1 sm:w-40"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex w-full flex-col px-8">
                    <div className="mt-0 grid items-center gap-3 gap-y-5 sm:grid-cols-6">
                      <div className="col-span-3 flex flex-col">
                        <label className="mb-1 ml-0 text-gray-500">
                          Number of Property Tokens :
                        </label>
                        <select
                          className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring"
                          name=""
                          id=""
                        >
                          <option value="Toast with Strawberry Juice">100</option>
                          <option value="Toast with Strawberry Juice">200</option>
                          <option value="Toast with Strawberry Juice">300</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-12 grid items-center gap-3 gap-y-5 sm:grid-cols-12">
                      <div className="col-span-5 flex flex-col">
                        <label className="mb-1 ml-0 text-gray-500">Listing Price :</label>
                        <input
                          type="number"
                          className="rounded-md border border-black px-2 py-3 outline-none focus:ring"
                          placeholder="20"
                        />
                      </div>
                      <div className="col-span-2 mt-7 flex flex-col items-center">
                        <MdSwapHoriz size={40} />
                      </div>
                      <div className="col-span-5 flex flex-col">
                        <input
                          type="number"
                          className="mt-7 rounded-md border border-black px-2 py-3 outline-none focus:ring"
                          placeholder="20"
                        />
                      </div>
                    </div>

                    <div className="mt-12 grid items-center gap-3 gap-y-5 sm:grid-cols-12">
                      <div className="col-span-5 flex flex-col">
                        <label className="mb-1 ml-0 text-gray-500">
                          Estimated Rental Income :
                        </label>
                        <input
                          type="number"
                          className="rounded-md border border-black px-2 py-3 outline-none focus:ring"
                          placeholder="20"
                        />
                      </div>
                      <div className="col-span-2 mt-7 flex flex-col items-center">
                        <MdSwapHoriz size={40} />
                      </div>
                      <div className="col-span-5 flex flex-col">
                        <input
                          type="number"
                          className="mt-7 rounded-md border border-black px-2 py-3 outline-none focus:ring"
                          placeholder="20"
                        />
                      </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center justify-between">
                      <button
                        onClick={() => setStep(3)}
                        className="gradient-button group my-2 mb-3 rounded-lg bg-blue-700 py-3 text-center font-bold text-white outline-none focus:ring sm:order-1 sm:w-40"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h1 className="mb-10 px-8 font-bold uppercase">Property Fetaures</h1>
                  <div className="flex w-full flex-col px-8">
                    <div className="mt-0 grid items-center gap-3 gap-y-5 sm:grid-cols-6">
                      <div className="flex flex-col sm:col-span-2">
                        <label className="mb-1 ml-0 text-sm font-normal text-black">
                          INTERNAL AREA
                        </label>
                        <input
                          type="text"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Toast"
                        />
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <label className="mb-1 ml-0 text-sm font-normal text-black">
                          FINISHING QUALITY
                        </label>
                        <input
                          type="text"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Toast"
                        />
                      </div>

                      <div className="col-span-2 flex flex-col">
                        <label className="mb-1 ml-0 text-sm text-black">PROPERTY TYPE</label>
                        <input
                          type="text"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Toast"
                        />
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <label className="mb-1 ml-0 text-sm font-normal text-black">
                          NUMBER OF BEDROOMS
                        </label>
                        <input
                          type="number"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Street"
                        />
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <label className="mb-1 ml-0 text-sm font-normal text-black">
                          OUTDOOR SPACE
                        </label>
                        <input
                          type="number"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Street"
                        />
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <label className="mb-1 ml-0 text-sm font-normal text-black">
                          CONSTRUCTION DATE
                        </label>
                        <input
                          type="date"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Street"
                        />
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <label className="mb-1 ml-0 text-sm font-normal text-black">
                          NUMBER OF BEDROOMS
                        </label>
                        <input
                          type="number"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Street"
                        />
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <label className="mb-1 ml-0 text-sm font-normal text-black">
                          OUTDOOR SPACE
                        </label>
                        <input
                          type="number"
                          className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                          placeholder="Street"
                        />
                      </div>
                    </div>
                  </div>

                  <h1 className="mt-10 px-8 font-bold uppercase">Property DISCRIPTION</h1>

                  <div className="mt-2 flex w-full flex-col px-8">
                    <label className="mb-1 ml-0 text-xs font-normal text-black">
                      Maximum 1000 characters
                    </label>
                    <textarea
                      rows={4}
                      className="rounded-sm border border-black px-2 py-2 outline-none focus:ring"
                      placeholder="Write..."
                    />
                  </div>

                  <h1 className="mt-10 px-8 font-bold uppercase">UPLOAD PROPERTY IMAGES</h1>

                  <div className="mt-0 grid items-center gap-3 gap-y-5 px-8 sm:grid-cols-8">
                    <div className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 sm:col-span-2">
                      <p className="mt-4 text-center text-xs font-medium text-gray-800">
                        Drop Files here
                        <label className="block bg-white px-4 py-4 font-normal text-blue-500">
                          <input className="hidden" type="file" name="file" id="" />
                        </label>
                      </p>
                    </div>

                    <div className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 sm:col-span-2">
                      <p className="mt-4 text-center text-xs font-medium text-gray-800">
                        Drop Files here
                        <label className="block bg-white px-4 py-4 font-normal text-blue-500">
                          <input className="hidden" type="file" name="file" id="" />
                        </label>
                      </p>
                    </div>

                    <div className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 sm:col-span-2">
                      <p className="mt-4 text-center text-xs font-medium text-gray-800">
                        Drop Files here
                        <label className="block bg-white px-4 py-4 font-normal text-blue-500">
                          <input className="hidden" type="file" name="file" id="" />
                        </label>
                      </p>
                    </div>

                    <div className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 sm:col-span-2">
                      <p className="mt-4 text-center text-xs font-medium text-gray-800">
                        Drop Files here
                        <label className="block bg-white px-4 py-4 font-normal text-blue-500">
                          <input className="hidden" type="file" name="file" id="" />
                        </label>
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col items-center justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="gradient-button group my-2 mb-3 rounded-lg bg-blue-700 py-2 text-center font-bold text-white outline-none focus:ring sm:order-1 sm:w-40"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PropertyModalCard;
