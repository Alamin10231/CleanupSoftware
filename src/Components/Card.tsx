import React from "react";

interface CardProps {
  title: string;
  number?: string | number;
  iconSrc: string;
  iconAlt?: string;
}

const Card: React.FC<CardProps> = ({ title, number, iconSrc, iconAlt }) => {
  // ✅ Smart formatting:
  const formattedNumber =
    typeof number === "number" ? Number.isInteger(number)
        ? number
        : number.toFixed(2)
      : number;
  return (
    <div className="flex justify-between items-center border-gray-300 p-5 rounded-lg border shadow-sm bg-white mt-3">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold mt-6">{formattedNumber}</h2>
      </div>
      <div className="bg-blue-50 rounded-md">
        <img src={iconSrc} alt={iconAlt} className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Card;
