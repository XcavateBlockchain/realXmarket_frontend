import React, { FC } from 'react';

interface ConfirmMintingModalProps {
  setShowMintingModal: any;
  setShowSuccessMintingModal: any;
}

const ConfirmMintingModal: FC<ConfirmMintingModalProps> = ({
  setShowMintingModal,
  setShowSuccessMintingModal
}) => {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-md backdrop-brightness-90 md:inset-0">
        <div className="relative flex h-[100%] w-full justify-center p-4">
          <div className="relative h-[320px] w-1/3 rounded-lg bg-white bg-opacity-10 shadow">
            <div className="flex items-center justify-between rounded-t px-5 md:py-5">
              <h1 className="font-mona">Confirm minting</h1>
              <button
                onClick={() => setShowMintingModal(false)}
                type="button"
                className="ms-auto inline-flex size-8 items-center justify-center rounded-lg border bg-transparent text-sm text-gray-400"
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
              <p>
                You are about to mint 10X tokens of PLOT 1 - Lea Wharf property by clicking
                continue you verify that the details provided are correct.
              </p>
              <button
                onClick={() => {
                  setShowSuccessMintingModal(true);
                  setShowMintingModal(false);
                }}
                className="gradient-button w-[200px] rounded-2xl border bg-gradient-to-r px-4 py-3 text-center text-sm uppercase text-black shadow-md focus:ring-4"
              >
                Continue
              </button>
              <button className="mt-4 bg-transparent px-4 py-3">Verify Details</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmMintingModal;
