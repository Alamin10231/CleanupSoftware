import { useState } from "react";
import { assets } from "@/assets/assets";

const ActionButton = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const handleRefresh = () => {
    setIsRotating(true);

    setRefreshKey(prev => prev + 1);

    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <div key={refreshKey}>
      <div className="flex gap-4">
        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="flex gap-2.5 bg-[#E5E5E5] py-2.5 px-5 rounded-full text-[#8E8E8E] cursor-pointer items-center"
        >
          <img
            src={assets.Refresh}
            alt="refresh"
            className={`w-5 h-5 ${isRotating ? "animate-spin" : ""}`}
          />
          Refresh
        </button>

        {/* Bulk Button */}
        <button className="flex gap-2.5 text-white bg-[#009608] py-2.5 px-5 rounded-full cursor-pointer items-center">
          <img src={assets.Bulk} alt="bulk" className="w-5 h-5" />
          Bulk
        </button>

        {/* Add Employee Button */}
        <button className="flex gap-2.5 text-white bg-[#2463EA] py-2.5 px-5 rounded-full cursor-pointer items-center">
          <img src={assets.Add_Employee} alt="add" className="w-5 h-5" />
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default ActionButton;
