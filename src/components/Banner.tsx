'use client';
import React from 'react';

const Banner = () => {
  return (
    <div className="flex h-[400px] flex-col items-center justify-center px-20">
      <h1 className="banner-text text-center font-mona uppercase text-black">
        WELCOME TO THE LARGEST DECENTRALIZED GLOBAL WEB3 REAL ESTATE INVESTOR COMMUNITY
      </h1>
      <p className="mt-3 text-center text-[24px] font-normal">
        Buy, sell & trade real world rental real estate through NFTs in a <br /> trustless,
        fully decentralized way
      </p>
    </div>
  );
};

export default Banner;
