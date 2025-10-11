import { Button } from "@/Components/ui/button";
import { CiSearch } from "react-icons/ci";


export default function Buildingregions() {
  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6">
      {/* Left Section */}
      <div className="flex-1 space-y-4">
        {/* Header */}
        <h2 className="text-3xl font-bold">Building & Region Tasks</h2>

        {/* Search Input */}
        <div className="flex relative items-center bg-[#E8EDF2] rounded-md p-2">
                 <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Search Region/Building/Apartment "
            className="w-full bg-[#E8EDF2] outline-none text-md p-2 ml-5 text-gray-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 ">
          <button className="font-semibold px-3 py-1 bg-[#E8EDF2] rounded-md border text-md text-[#0D141C]">
            Assigned Only
          </button>
        <button className="font-semibold px-3 py-1 bg-[#E8EDF2] rounded-md border text-md text-[#0D141C]">Status</button>
        </div>

        {/* Map Section */}
        <div className="relative w-full h-72 rounded-lg overflow-hidden border ">
          <input
            type="text"
            placeholder="Search for a location"
            className="absolute top-3 left-1/2 -translate-x-1/2 w-[80%] bg-white shadow rounded-md px-3 py-2 text-sm outline-none"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/San_Francisco_Bay_Area_map.png/640px-San_Francisco_Bay_Area_map.png"
            alt="map"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-4/12 space-y-6 ">
        {/* Building Info */}
        <div className=" rounded-lg p-4 space-y-3">
          <h3 className="font-bold text-3xl border-b pb-6">Building Info</h3>
          <div className="border-b pb-6">
            <p className="text-gray-500 text-sm ">Building Name</p>
            <p className="font-medium">The Grand Residences</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Address</p>
            <p className="font-medium">123 Oak Street, San Francisco</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Region</p>
            <p className="font-medium">Northwest</p>
          </div>
        </div>

        {/* Assigned Workers */}
        <div className=" rounded-lg p-4 space-y-3">
          <h3 className="font-bold text-3xl py-3">Assigned Workers</h3>
          <div className="flex -space-x-3">
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://i.pravatar.cc/40?img=1"
              alt="worker1"
            />
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://i.pravatar.cc/40?img=2"
              alt="worker2"
            />
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://i.pravatar.cc/40?img=3"
              alt="worker3"
            />
          </div>
        </div>

        {/* Subscription Status */}
        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-bold text-3xl py-3">Subscription Status</h3>
          <div className="flex items-center gap-2">
            <input type="radio" checked readOnly />
            <div>
              <p className="font-medium">Premium Plan</p>
              <p className="text-sm text-green-600">Active</p>
            </div>
          </div>
          <Button className="w-full">
             View Subscription
          </Button>
        </div>
      </div>
    </div>
  );
}

