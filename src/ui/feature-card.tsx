import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

interface FeatureCardProps {
  id: number;
  title: string;
  img: StaticImageData;
}
const FeatureCard: FC<FeatureCardProps> = ({ id, title, img }) => {
  return (
    <>
      <div className="feature-card-bg flex">
        <div className="absolute left-8 top-0 flex w-1/2 flex-col whitespace-pre-wrap">
          <Image src={img} width={100} height={100} />
          <h1 className="font-mona text-[20px] font-extrabold leading-6 text-white">
            {title}
          </h1>
        </div>
      </div>
    </>
  );
};

export default FeatureCard;
