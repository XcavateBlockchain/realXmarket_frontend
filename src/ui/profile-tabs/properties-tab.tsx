'use client';
import React from 'react';
import PropertyModalCard from '../modals/property-modal-card';

const PropertiesTab = () => {
  const [showPropertyModal, setShowPropertyModal] = React.useState(false);

  return (
    <>
      <section className="w-100% flex h-[100vh] flex-col items-center justify-center space-y-8 text-[#4E4E4E80]">
        <h1 className="px-12 text-center font-mona text-2xl text-[#4E4E4E80]">
          Looks like there's nothing here yet! Start exploring and adding content to fill this
          space with your own unique properties.
        </h1>
        <button
          onClick={() => setShowPropertyModal(true)}
          className="rounded-md border border-black px-8 py-3 text-xl font-medium text-black"
        >
          Add Property
        </button>
      </section>
      {showPropertyModal && (
        <PropertyModalCard
          setAddPropertyModal={setShowPropertyModal}
          setShowMintingModal={setShowPropertyModal}
        />
      )}
    </>
  );
};

export default PropertiesTab;
