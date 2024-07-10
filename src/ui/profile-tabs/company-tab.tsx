'use client';
import React from 'react';
import ConfirmMintingModal from '../modals/confirm-minting';
import SuccessMintingModal from '../modals/success-minting';

const CompanyTab = () => {
  const [showInviteModal, setShowInviteModal] = React.useState(false);

  const ModalCard = () => {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-md backdrop-brightness-90 md:inset-0">
        <div className="relative flex h-[100%] w-full justify-center p-4">
          <div className="relative h-1/3 w-1/3 rounded-lg bg-white shadow">
            <div className="flex items-center justify-between rounded-t px-5 md:py-5">
              <h1 className="font-mona">Add Team Members</h1>
              <button
                onClick={() => setShowInviteModal(false)}
                type="button"
                className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-transparent text-sm text-gray-400"
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
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4 p-4 py-1 md:p-5">
              <input
                type="text"
                placeholder="Enter | Wallet"
                className="w-full rounded-md border border-gray-300 px-4 py-4 text-sm text-gray-900"
              />
              <button className="gradient-button w-[200px] rounded-2xl border bg-gradient-to-r px-4 py-3.5 text-center text-sm uppercase text-black shadow-md focus:ring-4">
                Invite
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="font-DM flex flex-col">
          <h1 className="font-bold text-gray-900">Company credentials</h1>
          <p className="text-sm text-gray-400">
            This information was pre-filled from deloitte
          </p>
        </div>
        <div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="mt-4 rounded-sm border px-4 py-2 text-sm font-medium text-black"
          >
            Add Members
          </button>

          <button
            onClick={() => setShowInviteModal(true)}
            className="mt-4 rounded-sm border px-4 py-2 text-sm font-medium text-black"
          >
            Minting Modal
          </button>

          <button
            onClick={() => setShowInviteModal(true)}
            className="mt-4 rounded-sm border px-4 py-2 text-sm font-medium text-black"
          >
            Success Minting Modal
          </button>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-y-8 border-b border-t py-8">
        <div className="flex w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="text-md mb-2 block w-1/3 font-medium text-[#4E4E4E]"
          >
            Company Name:
          </label>
          <div className="flex w-1/2 gap-3">
            <input
              type="text"
              id="first_name"
              className="w-[100%] rounded-sm border border-gray-300 bg-[#4E4E4E1A] px-4 py-2 text-sm text-gray-900"
              placeholder="Neeraj"
              required
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="text-md mb-2 block w-1/3 font-medium text-[#4E4E4E]"
          >
            Registeration Number:
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
            className="text-md mb-2 block w-1/3 font-medium text-[#4E4E4E]"
          >
            Company Phone Number :
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
            className="text-md mb-2 block w-1/3 font-medium text-[#4E4E4E]"
          >
            Company Email Address :
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
            className="text-md mb-2 block w-1/3 font-medium text-[#4E4E4E]"
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
            className="text-md mb-2 block w-1/3 font-medium text-[#4E4E4E]"
          >
            Address:
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
            className="text-md mb-2 block w-1/3 font-medium text-[#4E4E4E]"
          >
            Association Website:
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
            className="text-md mb-2 block w-1/3 font-medium text-[#4E4E4E]"
          >
            Association membership Number:
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
            className="text-md mb-2 block w-1/3 font-medium text-[#4E4E4E]"
          >
            Passport/Driver license:
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

      <section className="py-12 font-mona">
        <h1 className="mt-3 text-2xl font-bold">Users</h1>
        <div className="mt-6 overflow-hidden rounded-xl border">
          <table className="min-w-full border-separate border-spacing-x-2 border-spacing-y-2 border-t-2">
            <thead className="hidden border-b lg:table-header-group">
              <tr className="">
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
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

                <td className="whitespace-no-wrap px-6 py-4 text-right text-sm text-gray-600 lg:text-left">
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
                <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                  Basic Plan - Nov 2021
                </td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                  14 November, 2021
                </td>

                <td className="whitespace-no-wrap px-6 py-4 text-right text-sm text-gray-600 lg:text-left">
                  $29.00
                </td>

                <td className="whitespace-no-wrap px-6 py-4 text-right text-sm text-gray-600 lg:text-left">
                  $29.00
                </td>
                <td className="whitespace-no-wrap px-6 py-4 text-right text-sm text-gray-600 lg:text-left">
                  $29.00
                </td>
              </tr>

              <tr className="">
                <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                  Basic Plan - Oct 2021
                </td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                  15 October, 2021
                </td>

                <td className="whitespace-no-wrap px-6 py-4 text-right text-sm text-gray-600 lg:text-left">
                  $29.00
                </td>
                <td className="whitespace-no-wrap px-6 py-4 text-right text-sm text-gray-600 lg:text-left">
                  $29.00
                </td>
                <td className="whitespace-no-wrap px-6 py-4 text-right text-sm text-gray-600 lg:text-left">
                  $29.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {showInviteModal && <ModalCard />}
    </>
  );
};

export default CompanyTab;
