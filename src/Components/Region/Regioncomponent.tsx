import { useEffect, useState } from "react";
import { FaCheckCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import Buildings from "@/assets/building.svg";
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
    const [openeye, setopeneye] = useState(false);
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

    // Filter buildings based on search term
    const filteredBuildings = buildings.filter(
        (building) =>
            building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            building.area.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const total = buildings.length;
    const active = buildings.filter((b) => b.status === "Active").length;
    const maintenance = buildings.filter(
        (b) => b.status === "Maintenance"
    ).length;
    const inactive = buildings.filter((b) => b.status === "Inactive").length;
    const apartments = buildings.reduce((sum, b) => sum + b.apartments, 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-2xl">Buildings</h1>
                    <p className="text-[#8E8E8E] text-xl">
                        Manage buildings & apartments
                    </p>
                </div>
                <div className="flex space-x-2 items-center">
                    {/* show map button */}
                    <button className="px-4 py-2 bg-blue-500 text-white text-md font-medium flex items-center gap-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 11c1.656 0 3-1.343 3-3s-1.344-3-3-3-3 1.343-3 3 1.344 3 3 3z M19.5 9c0 7.5-7.5 13-7.5 13S4.5 16.5 4.5 9a7.5 7.5 0 1115 0z"
                            />
                        </svg>
                        Show map
                    </button>

                    {/* add apartment button */}
                    <Dialog>
                        <DialogTrigger>
                            <button className="px-4 py-2 bg-blue-500 text-white text-md font-medium flex items-center gap-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 9.75L12 3l9 6.75M4.5 10.5V20a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5V10.5M9 21V13h6v8"
                                    />
                                </svg>
                                Add Apartment
                            </button>
                        </DialogTrigger>

                        <DialogContent className="bg-white border-0 rounded-lg max-w-4xl w-full">
                            {/* Header */}
                            <DialogHeader className="border-b border-gray-200 pb-4">
                                <DialogTitle className="bg-gradient-to-r from-[#0a078f] via-[#8241ed] to-[#2463ea] bg-clip-text text-transparent font-semibold text-2xl">
                                    Add New Apartment
                                </DialogTitle>
                                <DialogDescription>
                                    <p className="text-gray-500 font-semibold">
                                        Pick apartment location on the map & add
                                        area tags
                                    </p>
                                </DialogDescription>
                            </DialogHeader>

                            {/* Body */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                {/* Left side form */}
                                <form className="space-y-4">
                                    {/* Client */}
                                    <div>
                                        <label
                                            htmlFor="client"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Client
                                        </label>
                                        <select
                                            id="client"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        >
                                            <option>All / Not linked</option>
                                            <option>All / Not linked</option>
                                            <option>All / Not linked</option>
                                        </select>
                                    </div>

                                    {/* Building */}
                                    <div>
                                        <label
                                            htmlFor="building"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Building *
                                        </label>
                                        <select
                                            id="building"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        >
                                            <option>Select building</option>
                                        </select>
                                    </div>

                                    {/* Apartment Number + Floor */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="apartment"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Apartment Number *
                                            </label>
                                            <input
                                                type="text"
                                                id="apartment"
                                                placeholder="e.g. A-203"
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="floor"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Floor *
                                            </label>
                                            <input
                                                type="number"
                                                id="floor"
                                                placeholder="e.g. 2"
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                    </div>

                                    {/* Living rooms + Bathrooms */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="living"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Living Rooms *
                                            </label>
                                            <input
                                                type="number"
                                                id="living"
                                                placeholder="e.g. 2"
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="bathrooms"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Bathrooms *
                                            </label>
                                            <input
                                                type="number"
                                                id="bathrooms"
                                                placeholder="e.g. 2"
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                    </div>

                                    {/* Outdoor Area */}
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="outdoor"
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor="outdoor"
                                            className="text-sm text-gray-700"
                                        >
                                            Outdoor area
                                        </label>
                                    </div>
                                </form>

                                {/* Right side map */}
                                <div className="w-full h-[350px] rounded-md border border-gray-300 overflow-hidden">
                                    {/* Replace this div with actual Map (Leaflet, Google Maps, etc.) */}
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        Map goes here
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-gray-200 pt-4 px-6">
                                <div className="flex justify-end gap-3 w-full">
                                    <button
                                        type="button"
                                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
                                    >
                                        + Create
                                    </button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* refresh button */}
                    <button className="px-4 py-2 bg-blue-500 text-white text-md font-medium flex items-center gap-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.001 8.001 0 01-15.356-2m15.356 2H15"
                            />
                        </svg>
                        Refresh
                    </button>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-5 gap-4">
                {[
                    { label: "Active", value: active, icon: <FaCheckCircle /> },
                    {
                        label: "Maintenance",
                        value: maintenance,
                        icon: <FaCheckCircle />,
                    },
                    { label: "Inactive", value: inactive, icon: <GoPlus /> },
                    {
                        label: "Apartments",
                        value: apartments,
                        icon: <FiHome />,
                    },
                    { label: "Total", value: total, icon: <LuBuilding2 /> },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-xl p-4 px-6 shadow flex items-center justify-between border border-gray-200"
                    >
                        <div>
                            <p className="text-lg text-[#8E8E8E] py-4">
                                {stat.label}
                            </p>
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
    );
}
