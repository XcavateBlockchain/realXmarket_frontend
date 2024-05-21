import React from "react";

const SuccessMintingModal = ({ setShowSuccessMintingModal }) => {
  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center backdrop-blur-md backdrop-brightness-90 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full p-8 flex justify-center h-[100%]">
          <div className="relative p-2 w-1/3 h-[420px] bg-white rounded-lg shadow">

            <div className="flex items-center flex-col justify-center space-y-8 md:py-5 px-5 rounded-t ">
            <img className="w-24 h-24 rounded-full overflow-hidden" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Default avatar"/>
              <h1 className="font-mona text-center font-bold text-[#4E4E4E] text-xl">
                You have minted 100X tokens of Plot 1 - Plea Wharf successfully
              </h1>
            </div>
            <div className="p-4  py-1 space-y-4 flex text-msm flex-col items-center">
              <p className="text-center">
                You can now Add properties, List properties, Add team members,
                Purchase NFTs. Lol you can now use all features Xcavate offers.
              </p>
              <button
                onClick={() => setShowSuccessMintingModal(false)}
                className=" text-black shadow-md w-[200px] uppercase border focus:ring-4  rounded-2xl text-sm px-4 py-3 gradient-button text-center bg-gradient-to-r"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessMintingModal;
