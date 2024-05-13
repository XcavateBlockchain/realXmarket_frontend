"use client";
import React from 'react'
import PropertyModalCard from '../property-modal-card';

const PropertiesTab = () => {
  const [showPropertyModal, setShowPropertyModal] = React.useState(false);

  return (
    <>
      <section className="flex text-[#4E4E4E80] justify-center flex-col space-y-8 items-center w-100% h-[100vh]">
        <h1 className='text-[#4E4E4E80] text-2xl px-12 font-mona text-center'>Looks like there's nothing here yet! Start exploring and adding content to fill this space with your own unique properties.</h1>
        <button
          onClick={() => setShowPropertyModal(true)}
            className="px-8 py-3 text-black text-xl border-black rounded-md font-medium border"
          >
            Add Property
          </button>
      </section>
      {showPropertyModal && <PropertyModalCard/>}
    </>
  )
}

export default PropertiesTab