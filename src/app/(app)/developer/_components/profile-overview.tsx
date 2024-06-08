'use client';
import { OverviewCard } from '@/components/cards/overview-card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import PropertyModalCard from '@/ui/modals/property-modal-card';
import ConfirmMintingModal from '@/ui/modals/confirm-minting';
import SuccessMintingModal from '@/ui/modals/success-minting';
import { useState } from 'react';
export default function ProfileHeaderOverview() {
  const [addPropertyModal, setAddPropertyModal] = useState(false);
  const [showMintingModal, setShowMintingModal] = useState(false);
  const [showSuccessMintingModal, setShowSuccessMintingModal] = useState(false);
  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <div className="-mt-28 flex size-[155px] items-center justify-center rounded-full bg-white">
          <Image
            src={'/images/avatar.png'}
            alt="avatar"
            width={150}
            height={150}
            className="bg-cover bg-no-repeat"
            priority
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold">
                Richard Grey
              </h1>
              <div className="flex items-center gap-2 rounded-lg bg-accent-200/10 px-2 py-[2px]">
                <span className="text-[0.875rem] text-accent-200">Developer</span>
              </div>
            </div>
            <span className="font-mona text-[0.875rem]/[1.5rem]">
              Account created May, 2024
            </span>
          </div>

          <div className="hidden gap-2 md:flex">
            <Button variant={'outline'}>EDIT PROFILE</Button>
            <Button onClick={() => setAddPropertyModal(true)}>ADD PROPERTY</Button>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-5 lg:grid-cols-4">
        <OverviewCard title="Active listed properties" value={0} />
        <OverviewCard title="Property tokens sold" value={0} />
        <OverviewCard title="Total sales" value={0} />
        <OverviewCard title="Average sale time" value={0} />
      </div>

      {addPropertyModal && <PropertyModalCard setShowMintingModal={setShowMintingModal} setAddPropertyModal={setAddPropertyModal} />}
      {showMintingModal && <ConfirmMintingModal setShowSuccessMintingModal={setShowSuccessMintingModal} setShowMintingModal={setShowMintingModal} />}
      {showSuccessMintingModal && <SuccessMintingModal setShowSuccessMintingModal={setShowSuccessMintingModal} />}
    </>
  );
}
