import React from "react";

interface CardProps {
  title: string;
  number: string | number;
  iconSrc: string; // The source URL for the image
  iconAlt: string; // A description of the image for accessibility
}

const Card: React.FC<CardProps> = ({ title, number, iconSrc, iconAlt }) => {
  return (
    <div className="flex  justify-between items-center p-8 rounded-lg border shadow-sm bg-white mt-3"
      style={{ borderColor: "#CACACA" }}
    >
      <div>
        <p className="text-gray-600 text-xl ">{title}</p>
        <h2 className="text-2xl font-bold mt-2">{number}</h2>
      </div>
      <div className="bg-blue-50  rounded-md">
        <img src={iconSrc} alt={iconAlt} className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Card;
