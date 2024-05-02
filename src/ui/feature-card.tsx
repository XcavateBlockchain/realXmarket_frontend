import React from "react";
import Image from "next/image";
import ID from "@/assets/ID-white.png";
const FeatureCard = ({ id, title, img }) => {
  return (
    <>
      <div className="flex feature-card-bg ">
        <div className="absolute left-8 top-0 whitespace-pre-wrap flex flex-col  w-1/2">
          <Image src={img} width={100} height={100} />
          <h1 className=" font-mona leading-6 text-white text-[20px] font-extrabold">
            {title}
          </h1>
        </div>
      </div>
    </>
  );
};

export default FeatureCard;
