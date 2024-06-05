import React from 'react';

const ProfileTab = () => {
  return (
    <>
      <div className="font-DM flex flex-col">
        <h1 className="font-bold text-gray-900">Personal Info</h1>
        <p className="text-sm text-gray-400">This information was pre-filled from deloitte</p>
      </div>
      <div className="mt-10 flex flex-col gap-y-8">
        <div className="flex w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="text-md mb-2 block w-1/3 font-medium text-gray-900 dark:text-black"
          >
            Name:
          </label>
          <div className="flex w-1/2 gap-3">
            <input
              type="text"
              id="first_name"
              className="w-1/2 rounded-sm border border-gray-300 bg-[#4E4E4E1A] px-4 py-2 text-sm text-gray-900"
              placeholder="Neeraj"
              required
            />
            <input
              type="text"
              id="last_name"
              className="w-1/2 rounded-sm border border-gray-300 bg-[#4E4E4E1A] px-4 py-2 text-sm text-gray-900"
              placeholder="Choubisa"
              required
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="text-md mb-2 block w-1/3 font-medium text-gray-900 dark:text-black"
          >
            Email Address:
          </label>
          <div className="flex w-1/2 gap-3">
            <input
              type="text"
              id="first_name"
              className="w-full rounded-sm border border-gray-300 bg-[#4E4E4E1A] px-4 py-2 text-sm text-gray-900"
              placeholder="Neeraj"
              required
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="text-md mb-2 block w-1/3 font-medium text-gray-900 dark:text-black"
          >
            Phone Number :
          </label>
          <div className="flex w-1/2 gap-3">
            <input
              type="text"
              id="first_name"
              className="w-full rounded-sm border border-gray-300 bg-[#4E4E4E1A] px-4 py-2 text-sm text-gray-900"
              placeholder="+9087968686"
              required
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="text-md mb-2 block w-1/3 font-medium text-gray-900 dark:text-black"
          >
            Address :
          </label>
          <div className="flex w-1/2 gap-3">
            <input
              type="text"
              id="first_name"
              className="w-full rounded-sm border border-gray-300 bg-[#4E4E4E1A] px-4 py-2 text-sm text-gray-900"
              placeholder="+9087968686"
              required
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="text-md mb-2 block w-1/3 font-medium text-gray-900 dark:text-black"
          >
            Passport/drivers license :
          </label>
          <div className="flex w-1/2 gap-3">
            <input
              type="text"
              id="first_name"
              className="w-full rounded-sm border border-gray-300 bg-[#4E4E4E1A] px-4 py-2 text-sm text-gray-900"
              placeholder="+9087968686"
              required
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="text-md mb-2 block w-1/3 font-medium text-gray-900 dark:text-black"
          >
            Utility bill :
          </label>
          <div className="flex w-1/2 gap-3">
            <input
              type="text"
              id="first_name"
              className="w-full rounded-sm border border-gray-300 bg-[#4E4E4E1A] px-4 py-2 text-sm text-gray-900"
              placeholder="+9087968686"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTab;
