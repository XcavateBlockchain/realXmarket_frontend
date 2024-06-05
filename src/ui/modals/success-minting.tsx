import React from 'react';

const SuccessMintingModal = ({ setShowSuccessMintingModal }) => {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-md backdrop-brightness-90 md:inset-0">
        <div className="relative flex h-[100%] w-full justify-center p-8">
          <div className="relative h-[420px] w-1/3 rounded-lg bg-white p-2 shadow">
            <div className="flex flex-col items-center justify-center space-y-8 rounded-t px-5 md:py-5">
              <img
                className="h-24 w-24 overflow-hidden rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="Default avatar"
              />
              <h1 className="text-center font-mona text-xl font-bold text-[#4E4E4E]">
                You have minted 100X tokens of Plot 1 - Plea Wharf successfully
              </h1>
            </div>
            <div className="text-msm flex flex-col items-center space-y-4 p-4 py-1">
              <p className="text-center">
                You can now Add properties, List properties, Add team members, Purchase NFTs.
                Lol you can now use all features Xcavate offers.
              </p>
              <button
                onClick={() => setShowSuccessMintingModal(false)}
                className="gradient-button w-[200px] rounded-2xl border bg-gradient-to-r px-4 py-3 text-center text-sm uppercase text-black shadow-md focus:ring-4"
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
