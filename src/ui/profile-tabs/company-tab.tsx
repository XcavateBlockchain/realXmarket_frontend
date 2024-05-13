"use client";
import React from "react";

const CompanyTab = () => {
  const [showInviteModal, setShowInviteModal] = React.useState(false);
  const ModalCard=()=>{
    return(<div   className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center backdrop-blur-md backdrop-brightness-90 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative w-full p-4 flex justify-center h-[100%]">
        <div className="relative  w-1/3 h-1/3 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between md:py-5 px-5 rounded-t ">
            <h1 className="font-mona">Add Team Members</h1>
                <button onClick={()=>setShowInviteModal(false)} type="button" className="text-gray-400 bg-transparent   rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center border" >
                    <svg className="w-3 h-3"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 py-1 space-y-4 flex flex-col items-center">
               
                <input type="text" placeholder="Enter | Wallet" className="w-full px-4 py-4 border border-gray-300 rounded-md text-gray-900 text-sm" />
                <button className=" text-black shadow-md w-[200px] uppercase border focus:ring-4  rounded-2xl text-sm px-4 py-3.5 gradient-button text-center bg-gradient-to-r">
                    Invite
                </button>
            </div>
     
        </div>
    </div>
</div>);
  }
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
          <button onClick={()=>setShowInviteModal(true)} className="px-4 py-2 mt-4 text-sm font-medium text-black border rounded-sm">
            Add Members
          </button>
        </div>
      </div>
      <div className="flex mt-10 flex-col gap-y-8">
        <div className="flex  w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-[#4E4E4E]"
          >
           Company Name:
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-[100%]  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-sm"
              placeholder="Neeraj"
              required
            />
           
          </div>
        </div>
        <div className="flex  w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-[#4E4E4E]"
          >
            Registeration Number:
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-full  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-sm"
              placeholder="Neeraj"
              required
            />
           
          </div>
        </div>
        <div className="flex  w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-[#4E4E4E]"
          >
            Company Phone Number :
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-full  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-sm"
              placeholder="+9087968686"
              required
            />
           
          </div>
        </div>
        <div className="flex  w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-[#4E4E4E]"
          >
            Company Email Address :
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-full  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-sm"
              placeholder="+9087968686"
              required
            />
           
          </div>
        </div>
        <div className="flex  w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-[#4E4E4E]"
          >
            Phone Number :
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-full  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-sm"
              placeholder="+9087968686"
              required
            />
           
          </div>
        </div>
        <div className="flex  w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-[#4E4E4E]"
          >
            Address:
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-full  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-sm"
              placeholder="+9087968686"
              required
            />
           
          </div>
        </div>
        <div className="flex  w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-[#4E4E4E]"
          >
            Association Website:
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-full  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-sm"
              placeholder="+9087968686"
              required
            />
           
          </div>
        </div>
        <div className="flex  w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-[#4E4E4E]"
          >
            Association membership Number:
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-full  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-sm"
              placeholder="+9087968686"
              required
            />
           
          </div>
        </div>
        <div className="flex  w-full items-center justify-between">
          <label
            htmlFor="full_name"
            className="block mb-2 w-1/3 text-md font-medium text-[#4E4E4E]"
          >
            Passport/Driver license:
          </label>
          <div className="flex  w-1/2 gap-3 ">
            <input
              type="text"
              id="first_name"
              className="bg-[#4E4E4E1A] w-full  px-4 py-2 border border-gray-300 text-gray-900 text-sm rounded-sm"
              placeholder="+9087968686"
              required
            />
           
          </div>
        </div>
      </div>

      {showInviteModal && <ModalCard/>}
    </>
  );
};

export default CompanyTab;
