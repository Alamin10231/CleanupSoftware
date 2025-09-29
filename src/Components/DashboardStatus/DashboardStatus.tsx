import { useState } from "react";
// import man from "../../../public/Image/Heart.png";
import man from "../../assets/Image/Heart.png";
import vector from "../../assets/Image/Vector.png";
import vector1 from "../../assets/Image/Vector (1).png";
import house from "../../assets/Image/solar_card-outline.png";
import { IoIosArrowUp } from "react-icons/io";

export default function DashboardStats() {
    const [activeTab, setActiveTab] = useState("month");

    const tabs = [
        { id: "day", label: "Day" },
        { id: "week", label: "Week" },
        { id: "month", label: "Month" },
    ];

    const statsData = [
        {
            id: 1,
            title: "Total Client",
            value: "10+",
            subtitle: "Last Month",
            growth: "+0%",
            icon: man,
        },
        {
            id: 2,
            title: "Active Subscriptions",
            value: "07+",
            subtitle: "Last Month",
            growth: "+0%",
            icon: house,
        },
        {
            id: 3,
            title: "Monthly Revenue",
            value: "SAR 10",
            subtitle: "Last Month",
            growth: "+0%",
            icon: vector,
        },
        {
            id: 4,
            title: "Total Buildings",
            value: "01+",
            subtitle: "Last Month",
            growth: "+0%",
            icon: vector1,
        },
    ];

    return (
        <div>
            {/* Header + Tabs */}
            <div className="flex pb-10 items-center justify-between">
                <div>
                    <h1 className="font-bold text-2xl">Dashboard</h1>
                    <p className="text-[#8E8E8E] font-bold">
                        Welcome to CleanUp Pro.{" "}
                        <span className="font-bold text-black">Admin User</span>
                    </p>
                </div>

                <div className="flex space-x-2 p-2 bg-white">
                    <div className="flex space-x-2 border border-[#9A9AA9]  rounded-full">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 text-sm font-medium rounded-full focus:outline-none ${
                                    activeTab === tab.id
                                        ? "bg-blue-500 text-white hover:bg-blue-600"
                                        : "text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex space-x-2 items-center">
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
                                ></path>
                            </svg>
                            Refresh
                        </button>

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
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                ></path>
                            </svg>
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {statsData.map(
                    ({ id, icon, title, subtitle, value, growth }) => (
                        <div
                            key={id}
                            className="bg-white shadow-[0_0_5px_#00000040] rounded-xl p-6 flex gap-4 hover:shadow-xl border border-gray-50 hover:scale-105 transition transform duration-300 ease-in-out"
                        >
                            <div className="flex flex-col items-start justify-between flex-1">
                                {/* icon */}
                                <div className="flex items-center justify-between">
                                    {typeof icon === "string" &&
                                    icon.startsWith("/") ? (
                                        <img
                                            src={icon}
                                            alt={title}
                                            className="w-12 h-12 bg-[#EFF5FF] p-3 rounded-full"
                                        />
                                    ) : (
                                        <span className="text-2xl">{icon}</span>
                                    )}
                                </div>

                                {/* Title, Value, Growth */}
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {title}
                                    </h3>
                                    <p className="text-2xl font-bold mt-1">
                                        {value}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-between flex-1">
                                <span className="text-[#030229] text-sm">
                                    {subtitle}
                                </span>
                                {/* Growth Indicator */}
                                <div className="bg-[#C4FFC7] text-[#009608] px-4 py-1 rounded-full text-sm w-fit flex items-center gap-2">
                                    <span>
                                        <IoIosArrowUp size={24} color="green" />
                                    </span>{" "}
                                    {growth}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}