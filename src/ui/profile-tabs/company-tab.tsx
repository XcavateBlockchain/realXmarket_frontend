import React from "react";

const CompanyTab = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col font-DM">
          <h1 className="font-bold text-gray-900">Company credentials</h1>
          <p className="text-sm text-gray-400">
            This information was pre-filled from deloitte
          </p>
        </div>
        <div>
          <button className="px-4 py-2 mt-4 text-sm font-medium text-black border rounded-md">
            Add Members
          </button>
        </div>
      </div>
      <div className="flex mt-10 flex-col gap-y-8">
        <div className="flex  w-full items-center">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-gray-900 dark:text-black"
          >
            Name:
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-1/2  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-md"
              placeholder="Neeraj"
              required
            />
            <input
              type="text"
              id="last_name"
              className="bg-[#4E4E4E1A] w-1/2  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-md"
              placeholder="Choubisa"
              required
            />
          </div>
        </div>
        <div className="flex  w-full items-center">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-gray-900 dark:text-black"
          >
            Email Address:
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-full  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-md"
              placeholder="Neeraj"
              required
            />
           
          </div>
        </div>
        <div className="flex  w-full items-center">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-gray-900 dark:text-black"
          >
            Phone Number :
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-full  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-md"
              placeholder="+9087968686"
              required
            />
           
          </div>
        </div>
        <div className="flex  w-full items-center">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-gray-900 dark:text-black"
          >
            Address :
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-full  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-md"
              placeholder="+9087968686"
              required
            />
           
          </div>
        </div>
        <div className="flex  w-full items-center">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-gray-900 dark:text-black"
          >
            Passport/drivers license :
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-full  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-md"
              placeholder="+9087968686"
              required
            />
           
          </div>
        </div>
        <div className="flex  w-full items-center">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-gray-900 dark:text-black"
          >
            Utility bill :
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-full  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-md"
              placeholder="+9087968686"
              required
            />
           
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyTab;
