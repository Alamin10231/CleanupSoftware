import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

interface Building {
    id: number;
    name: string;
    status: "Active" | "Inactive" | "Maintenance";
    apartments: number;
    stock: number;
    active: number;
    createdOn: string;
    code: string;
    type: string;
    area: string;
}

interface AlljsonResponse {
    alljsondata: Building[];
}

export default function RegionComponent() {
  const [openeye, setopeneye] = useState<Record<number, boolean>>({});
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/AlljsonData.json");
        const data: AlljsonResponse = await res.json();
        setBuildings(data.alljsondata);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    loadData();
  }, []);

  const toggleeye = (id: number) => {
    setopeneye((p) => ({ ...p, [id]: !p[id] }));
  };

  // Filter buildings
  const filteredBuildings = buildings.filter(
    (building) =>
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = buildings.length;
  const active = buildings.filter((b) => b.status === "Active").length;
  const maintenance = buildings.filter((b) => b.status === "Maintenance").length;
  const inactive = buildings.filter((b) => b.status === "Inactive").length;
  const apartments = buildings.reduce((sum, b) => sum + b.apartments, 0);

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
        <div className="flex space-x-2 items-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center gap-2">
            Show map
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center gap-2">
            Add Apartment
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center gap-2">
            Export
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: "Active", value: active, icon: <FaCheckCircle /> },
          { label: "Maintenance", value: maintenance, icon: <FaCheckCircle /> },
          { label: "Inactive", value: inactive, icon: <GoPlus /> },
          { label: "Apartments", value: apartments, icon: <FiHome /> },
          { label: "Total", value: total, icon: <LuBuilding2 /> },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 px-6 shadow flex items-center justify-between border border-gray-200"
          >
            <div>
              <p className="text-lg text-[#8E8E8E] py-4">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-500 p-4 bg-sky-100 rounded-full">
                {stat.icon}
              </p>
            </div>
          </div>
        ))}
      </div>

            <div className="flex items-center gap-8 p-6 border border-gray-300 rounded-xl justify-between">
                <div className="flex items-center border border-gray-400 p-2 rounded-xl w-full max-w-sm">
                    <IoIosSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search by name, email or location..."
                        className="outline-none w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-20">
                    <div className="flex gap-2">
                        <p className="text-base text-gray-500 py-2 font-bold">
                            Status
                        </p>
                        <p className="bg-green-100 px-3 py-2 text-green-600 rounded-full">
                            Active
                        </p>
                        <p className="bg-yellow-100 px-3 py-2 text-yellow-600 rounded-full">
                            Inactive
                        </p>
                        <p className="bg-red-100 px-3 py-2 text-red-600 rounded-full">
                            Maintenance
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <p className="text-base text-gray-500 py-2 font-bold">
                            Type
                        </p>
                        <p className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full">
                            residential
                        </p>
                        <p className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full">
                            commercial
                        </p>
                        <p className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full">
                            office
                        </p>
                        <p className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full">
                            retail
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <p className="text-base text-gray-500 py-2 font-bold">
                            Area
                        </p>
                        <p className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full">
                            mohakhali
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {filteredBuildings.map((b) => (
                    <div
                        key={b.id}
                        className="rounded-xl p-4 shadow flex relative items-center justify-between gap-2 border border-gray-200 mt-5"
                    >
                        <div className="flex justify-start gap-3 items-center ">
                            <div className="pb-28 pt-4 ">
                                <h2 className="font-semibold">
                                    <span className="px-4 py-4 mr-2 bg-sky-100 rounded-full">
                                        {b.name.slice(0, 2)}
                                    </span>
                                </h2>
                            </div>
                            <div className="py-2">
                                <p>
                                    {b.name}
                                    <span
                                        className={`text-sm px-2 py-1 ml-2 rounded-full ${
                                            b.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : b.status === "Inactive"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {b.status}
                                    </span>
                                </p>

                                <div className="flex items-center gap-3 py-2">
                                    <p className="flex items-center gap-2">
                                        <IoLocationOutline /> Mohakhali
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FiHome /> jvai
                                    </p>
                                </div>

                                <div>
                                    <p className="flex gap-8 text-md text-gray-500 mt-2">
                                        <span className="flex flex-col items-center">
                                            <span className="text-lg font-bold text-black">
                                                {b.apartments
                                                    .toString()
                                                    .padStart(2, "0")}
                                            </span>
                                            Apts
                                        </span>
                                        <span className="flex flex-col items-center">
                                            <span className="text-lg font-bold text-black">
                                                0
                                            </span>
                                            Subs
                                        </span>
                                        <span className="flex flex-col items-center">
                                            <span className="text-lg font-bold text-black">
                                                {b.active}
                                            </span>
                                            Active
                                        </span>
                                        <span className="flex flex-col items-center">
                                            <span className="text-lg font-bold text-black">
                                                {b.createdOn}
                                            </span>
                                            Created
                                        </span>
                                        <span className="flex flex-col items-center">
                                            <span className="text-lg font-bold text-black">
                                                {b.code}
                                            </span>
                                            ID
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* building details */}
                        <Dialog>
                            <DialogTrigger>
                                <button
                                    className="absolute top-4 right-4 text-xl text-gray-600"
                                    onClick={() => setopeneye(!openeye)}
                                >
                                    {openeye ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>{`Building Name`}</DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                ))}
            </div>
        </div>
<<<<<<< HEAD
        <div className="flex gap-20">
          <div className="flex gap-2">
            <p className="text-base text-gray-500 py-2 font-bold">Status</p>
            <p className="bg-green-100 px-3 py-2 text-green-600 rounded-full">
              Active
            </p>
            <p className="bg-yellow-100 px-3 py-2 text-yellow-600 rounded-full">
              Inactive
            </p>
            <p className="bg-red-100 px-3 py-2 text-red-600 rounded-full">
              Maintenance
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-base text-gray-500 py-2 font-bold">Type</p>
            <p className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full">
              residential
            </p>
            <p className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full">
              commercial
            </p>
            <p className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full">
              office
            </p>
            <p className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full">
              retail
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-base text-gray-500 py-2 font-bold">Area</p>
            <p className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full">
              mohakhali
            </p>
          </div>
        </div>
      </div>

      {/* Building Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {filteredBuildings.map((b) => (
          <div
            key={b.id}
            className="rounded-xl p-4 shadow flex relative items-center justify-between gap-2 border border-gray-200 mt-5"
          >
            <div className="flex justify-start gap-3 items-center">
              <div className="pb-28 pt-4 ">
                <h2 className="font-semibold">
                  <span className="px-4 py-4 mr-2 bg-sky-100 rounded-full">
                    {b.name.slice(0, 2)}
                  </span>
                </h2>
              </div>
              <div className="py-2">
                <p>
                  {b.name}
                  <span
                    className={`text-sm px-2 py-1 ml-2 rounded-full ${
                      b.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : b.status === "Inactive"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </p>

                <div className="flex items-center gap-3 py-2">
                  <p className="flex items-center gap-2">
                    <IoLocationOutline /> {b.area}
                  </p>
                  <p className="flex items-center gap-2">
                    <FiHome /> {b.type}
                  </p>
                </div>

                <div>
                  <p className="flex gap-8 text-md text-gray-500 mt-2">
                    <span className="flex flex-col items-center">
                      <span className="text-lg font-bold text-black">
                        {b.apartments.toString().padStart(2, "0")}
                      </span>
                      Apts
                    </span>
                    <span className="flex flex-col items-center">
                      <span className="text-lg font-bold text-black">0</span>
                      Subs
                    </span>
                    <span className="flex flex-col items-center">
                      <span className="text-lg font-bold text-black">
                        {b.active}
                      </span>
                      Active
                    </span>
                    <span className="flex flex-col items-center">
                      <span className="text-lg font-bold text-black">
                        {b.createdOn}
                      </span>
                      Created
                    </span>
                    <span className="flex flex-col items-center">
                      <span className="text-lg font-bold text-black">
                        {b.code}
                      </span>
                      ID
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Eye toggle + dialog */}
            <Dialog>
              <DialogTrigger>
                <button
                  className="absolute top-4 right-4 text-xl text-gray-600"
                  onClick={() => toggleeye(b.id)}
                >
                  {openeye[b.id] ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{b.name}</DialogTitle>
                  <DialogDescription>
                    Building Code: {b.code}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
