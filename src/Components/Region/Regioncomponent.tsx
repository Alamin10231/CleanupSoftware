import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import AddApartment from "./add-apartment";
import BuildingDetails from "./building-details";
import {
  useGetBuildingsQuery,
  useGetStatsQuery,
} from "@/redux/features/admin/buildings/building.api";
import type { Building } from "@/Types/building.types";
import AddBuilding from "../map/AddBuilding";
import AddRegion from "./add-region";
import UpdateBuilding from "./update-building";
import { Button } from "../ui/button";

export default function RegionComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError, refetch } = useGetBuildingsQuery(1);
  const { data: statsData } = useGetStatsQuery(undefined);

  const buildings: Building[] = data?.results ?? [];

  const active = statsData?.total_active_apartments ?? 0;
  const inactive = statsData?.total_inactive_apartments ?? 0;
  const apartments = statsData?.total_apartments ?? 0;
  const total = statsData?.total_buildings ?? 0;

  const filteredBuildings = buildings.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading buildings...
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col justify-center items-center h-64 text-red-500 text-center space-y-3">
        <p>Failed to load buildings.</p>
        <Button onClick={() => refetch()} className="text-blue-600 underline">
          Retry
        </Button>
      </div>
    );

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-xl sm:text-2xl">Buildings</h1>
          <p className="text-[#8E8E8E] text-base sm:text-lg">
            Manage buildings & apartments
          </p>
        </div>

        {/* Add Buttons */}
        <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
          <AddApartment />
          <AddBuilding />
          <AddRegion />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active", value: active, icon: <FaCheckCircle /> },
          { label: "Inactive", value: inactive, icon: <GoPlus /> },
          { label: "Total Apartments", value: apartments, icon: <FiHome /> },
          { label: "Total Buildings", value: total, icon: <LuBuilding2 /> },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-300"
          >
            <div>
              <p className="text-sm sm:text-base text-[#8E8E8E] py-2">
                {stat.label}
              </p>
              <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-blue-500 p-3 bg-sky-100 rounded-full">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center border border-gray-400 px-3 py-2 rounded-xl w-full sm:max-w-sm">
        <IoIosSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by name or area..."
          className="outline-none w-full text-sm sm:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Building Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredBuildings.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No buildings found for “{searchTerm}”.
          </p>
        ) : (
          filteredBuildings.map((b) => (
            <div
              key={b.id}
              className="rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white"
            >
              {/* Left side info */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-lg">
                    {b.name}
                    <span className="text-xs sm:text-sm px-2 py-1 ml-2 rounded-full bg-green-100 text-green-700">
                      {b.type}
                    </span>
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-gray-600 text-sm">
                    <p className="flex items-center gap-1">
                      <IoLocationOutline /> {b.location}
                    </p>
                    <p className="flex items-center gap-1">
                      <FiHome /> {b.city}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:flex sm:gap-8 text-gray-500 text-sm mt-2">
                    <span className="flex flex-col items-center sm:items-start">
                      <span className="text-lg font-bold text-black">
                        {b.total_apartments.toString().padStart(2, "0")}
                      </span>
                      Apts
                    </span>
                    <span className="flex flex-col items-center sm:items-start">
                      <span className="text-lg font-bold text-black">
                        {b.active_apartments_in_building}
                      </span>
                      Active
                    </span>
                    <span className="flex flex-col items-center sm:items-start">
                      <span className="text-lg font-bold text-black">
                        {new Date(b.created_at).toLocaleDateString()}
                      </span>
                      Created
                    </span>
                    <span className="flex flex-col items-center sm:items-start">
                      <span className="text-lg font-bold text-black">
                        {b.region_name}
                      </span>
                      Region
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-3 self-end sm:self-auto">
                {/* <UpdateBuilding building={b} refetch={refetch} /> */}
                <BuildingDetails buildingData={b} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
