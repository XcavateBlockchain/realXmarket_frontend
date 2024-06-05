import React, { FC } from 'react';
import { FaRegHeart } from 'react-icons/fa6';
import Image, { StaticImageData } from '../../node_modules/next/image';
import property4 from '@/assets/property4.jpg';
interface PropertyCardProps {
  id: number;
  title: string;
  description: string;
  price: string;
  img: StaticImageData;
}
const PropertyCard: FC<PropertyCardProps> = ({ id, title, description, price, img }) => {
  return (
    <div className="box border-3 mb-10 rounded-md shadow-lg">
      <div className="top">
        <Image src={property4} width={150} height={150} alt="Picture of the author" />
        <span>
          <FaRegHeart />
        </span>
      </div>
      <div className="bottom">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
