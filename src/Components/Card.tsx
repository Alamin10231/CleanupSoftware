import React from "react";

interface CardProps {
  title: string;
  number: string | number;
  iconSrc: string; 
  iconAlt: string; 
}

const Card: React.FC<CardProps> = ({ title, number, iconSrc, iconAlt }) => {
  return (
    <div className="flex  justify-between items-center p-5 rounded-lg border shadow-sm bg-white mt-3"
      style={{ borderColor: "#CACACA" }}
    >
      <div>
        <p className="text-gray-500 text-xl font-bold">{title}</p>
        <h2 className="text-2xl font-bold mt-6">{number}</h2>
      </div>
      <div className="bg-blue-50  rounded-md">
        <img src={iconSrc} alt={iconAlt} className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Card;
