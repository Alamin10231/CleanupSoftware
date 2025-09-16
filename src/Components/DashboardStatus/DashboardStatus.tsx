import { useState } from "react";

export default function DashboardStats() {
    const [activeTab,setactiveTab] = useState("month")


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
      icon: "👤",
    },
    {
      id: 2,
      title: "Active Subscriptions",
      value: "07+",
      subtitle: "Last Month",
      growth: "+0%",
      icon: "💳",
    },
    {
      id: 3,
      title: "Monthly Revenue",
      value: "SAR 10",
      subtitle: "Last Month",
      growth: "+0%",
      icon: "💲",
    },
    {
      id: 4,
      title: "Total Buildings",
      value: "01+",
      subtitle: "Last Month",
      growth: "+0%",
      icon: "🏢",
    },
  ];

  return (

    <>

    <div className="p-6">
   <div className="flex py-10 items-center justify-between">
     <div className="">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <p className="text-[#8E8E8E] font-bold">Welcome to CleanUp Pro. <span className="font-bold text-black text-shadow-md">Admin User</span></p>
    </div>
<div className="flex space-x-2 p-2 bg-white">
  
  <div className="flex space-x-2 border-1 border-[#9A9AA9] px-6 py-3 rounded-full">
    {
       tabs.map(tab =>(
        <button 
        onClick={()=>setactiveTab(tab.id)}
        key={tab.id}
        className={`
        px-4 py-2 text-sm font-medium  rounded-full  focus:outline-none 
        ${activeTab === tab.id?"bg-blue-500 text-white hover:bg-blue-600": " text-gray-700 hover:bg-gray-200"
        
        }
        `}>
      {tab.label}
    </button>
    
       ))
    }
  </div>

  
  <div className="flex space-x-2 items-center">
    <button className="px-4 py-2 bg-blue-500 text-white text-md font-medium flex items-center gap-2   rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.001 8.001 0 01-15.356-2m15.356 2H15"></path>
      </svg>
      Refresh
    </button>
   <button className="px-4 py-2 bg-blue-500 text-white text-md font-medium flex items-center gap-2   rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
      </svg>
      Export
    </button>
  </div>
</div>
   </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statsData.map(({ id, icon, title, subtitle, value, growth }) => (
        <div
          key={id}
          className="bg-white shadow rounded-xl p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">{icon}</span>
            <span className="text-gray-500 text-sm">{subtitle}</span>
          </div>

          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>

          <div className="text-green-600 bg-green-100 px-2 py-1 rounded text-sm w-fit">
            ↑ {growth}
          </div>
        </div>
      ))}
    </div>
    </div>
    </>
  );
}
