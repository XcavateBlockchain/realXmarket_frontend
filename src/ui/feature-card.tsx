import React from "react";
import Image from "next/image";
import ID from "@/assets/ID-white.png";
const FeatureCard = () => {
  return (
    <>
      <div className="flex feature-card-bg">
        <div className="absolute left-8 top-4 whitespace-pre-wrap flex flex-col  w-1/2">
            <Image src={ID} width={100} height={100}  />
          <h1 className=" font-mona  text-white text-[20px] font-extrabold">
            Connect digital identity & verify your credentials
          </h1>
        </div>
      </div>
    </>
  );
};

export default FeatureCard;
