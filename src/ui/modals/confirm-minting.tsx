import React from "react";

const ConfirmMintingModal = ({setShowMintingModal}) => {
  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center backdrop-blur-md backdrop-brightness-90 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full p-4 flex justify-center h-[100%]">
          <div className="relative  w-1/3 h-[320px] bg-white rounded-lg shadow">
            <div className="flex items-center justify-between md:py-5 px-5 rounded-t ">
              <h1 className="font-mona">Confirm minting</h1>
              <button
                onClick={() => setShowMintingModal(false)}
                type="button"
                className="text-gray-400 bg-transparent   rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center border"
              >
                <svg
                  className="w-3 h-3"
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
            <div className="p-4 md:p-5 py-1 space-y-4 flex flex-col items-center">
              <p>
                You are about to mint 10X tokens of PLOT 1 - Lea Wharf property
                by clicking continue you verify that the details provided are
                correct.
              </p>
              <button className=" text-black shadow-md w-[200px] uppercase border focus:ring-4  rounded-2xl text-sm px-4 py-3 gradient-button text-center bg-gradient-to-r">
                Continue
              </button>
              <button className="mt-4 px-4 py-3 bg-transparent">
                Verify Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmMintingModal;
