import React from "react";
import { FaRegHeart } from "react-icons/fa6";
const PropertyCard = () => {
  return (
    <div className="box mb-20 border-3 rounded-md shadow-lg">
      <div className="top">
        <img
          src="https://cdn.pixabay.com/photo/2014/07/31/00/30/vw-beetle-405876__340.jpg"
          alt=""
        />
        <span>
          <FaRegHeart />
        </span>
      </div>
      <div className="bottom">
        <h3>Villa In Alexandria</h3>
        <p>
          Enjoy serenity of Deering Bay whole day from this spectacular North
          and...
        </p>
        <p>$245,890</p>
      </div>
    </div>
  );
};

export default PropertyCard;
