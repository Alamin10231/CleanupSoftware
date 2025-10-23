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
      <div className="flex justify-center items-center h-64 text-red-500">
        Failed to load buildings.{" "}
        <button onClick={() => refetch()} className="underline text-blue-600">
          Retry
        </button>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Buildings</h1>
          <p className="text-[#8E8E8E] text-xl">
            Manage buildings & apartments
          </p>
        </div>
        <div className="flex gap-4">
          <AddApartment />
          <AddBuilding />
          <AddRegion />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active", value: active, icon: <FaCheckCircle /> },
          { label: "Inactive", value: inactive, icon: <GoPlus /> },
          { label: "Total Apartments", value: apartments, icon: <FiHome /> },
          { label: "Total Buildings", value: total, icon: <LuBuilding2 /> },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 px-6 shadow flex items-center justify-between border border-gray-200"
          >
            <div>
              <p className="text-lg text-[#8E8E8E] py-4">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="text-2xl font-bold text-blue-500 p-4 bg-sky-100 rounded-full">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center border border-gray-400 p-2 rounded-xl w-full max-w-sm">
        <IoIosSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by name or area..."
          className="outline-none w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Building Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBuildings.map((b) => (
          <div
            key={b.id}
            className="rounded-xl p-4 shadow flex relative items-center justify-between gap-2 border border-gray-200 mt-5"
          >
            <div className="flex gap-3 items-center">
              <div className="pb-28 pt-4">
                <span className="px-4 py-4 mr-2 bg-sky-100 rounded-full font-semibold">
                  {b.name.slice(0, 2)}
                </span>
              </div>
              <div className="py-2">
                <p className="font-medium text-lg">
                  {b.name}
                  <span className="text-sm px-2 py-1 ml-2 rounded-full bg-green-100 text-green-700">
                    {b.type}
                  </span>
                </p>

                <div className="flex items-center gap-3 py-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <IoLocationOutline /> {b.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <FiHome /> {b.city}
                  </p>
                </div>

                <div className="flex gap-8 text-md text-gray-500 mt-2">
                  <span className="flex flex-col items-center">
                    <span className="text-lg font-bold text-black">
                      {b.total_apartments.toString().padStart(2, "0")}
                    </span>
                    Apts
                  </span>
                  <span className="flex flex-col items-center">
                    <span className="text-lg font-bold text-black">
                      {b.active_apartments_in_building}
                    </span>
                    Active
                  </span>
                  <span className="flex flex-col items-center">
                    <span className="text-lg font-bold text-black">
                      {new Date(b.created_at).toLocaleDateString()}
                    </span>
                    Created
                  </span>
                  <span className="flex flex-col items-center">
                    <span className="text-lg font-bold text-black">
                      {b.region_name}
                    </span>
                    Region
                  </span>
                </div>
              </div>
            </div>
            <BuildingDetails buildingData={b} />
          </div>
        ))}
      </div>
    </div>
  );
}
