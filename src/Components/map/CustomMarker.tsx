import { useState } from "react";
import type { Building } from "@/Types/building.types";

interface CustomMarkerProps {
  building?: Building;
}

export default function CustomMarker({ building }: CustomMarkerProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Different colors based on building type
  const getMarkerColor = (type?: string) => {
    switch (type) {
      case "residential":
        return "#3B82F6"; // blue
      case "commercial":
        return "#10B981"; // green
      default:
        return "#6366F1"; // indigo
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Marker Pin */}
      <div
        className="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
        style={{
          width: "32px",
          height: "40px",
        }}
      >
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 0C7.163 0 0 7.163 0 16C0 24.837 16 40 16 40C16 40 32 24.837 32 16C32 7.163 24.837 0 16 0Z"
            fill={getMarkerColor(building?.type)}
          />
          <circle cx="16" cy="16" r="6" fill="white" />
        </svg>
      </div>

      {/* Tooltip */}
      {showTooltip && building && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
          style={{ minWidth: "200px" }}
        >
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              {building.name}
            </h3>
            <p className="text-xs text-gray-600 mb-2">
              {building.location}, {building.city}
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                {building.type}
              </span>
              <span className="text-xs text-gray-500">
                {building.total_apartments} units
              </span>
            </div>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
            <div className="border-8 border-transparent border-t-white"></div>
          </div>
        </div>
      )}
    </div>
  );
}
