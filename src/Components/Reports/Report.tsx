// src/pages/Report.tsx
import React from "react";
import Button from "../Button";
import { FiRefreshCw } from "react-icons/fi";
import { BiExport } from "react-icons/bi";

export default function Report() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Report & Analytics</h1>
          <p className="text-gray-500 text-lg">
            Track performance, revenue, and client engagement in real time
          </p>
        </div>
        <div className="flex gap-3">
          <Button icon={<BiExport />} text="Export" />
          <Button icon={<FiRefreshCw />} text="Refresh" />
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border  border-gray-300 rounded-xl p-4 flex flex-wrap gap-4 items-center">
        

    <div>
          <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>All Regions</option>
        </select>

        <input
          type="text"
          placeholder="Enter apartment code"
          className="border rounded-lg px-4 py-2 border-gray-300"
        />
    </div>

        {/* Status checkboxes */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-1">
            <input type="checkbox" defaultChecked /> Active
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" defaultChecked /> Expired
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" defaultChecked /> Stopped
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" defaultChecked /> Pending
          </label>
        </div>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Revenue", value: "SAR 4,350", change: "+12.5%", color: "text-green-500" },
          { title: "Total Expenses", value: "SAR 230", change: "+8.2%", color: "text-red-500" },
          { title: "Active Subscriptions", value: "47", change: "+5.1%", color: "text-green-500" },
          { title: "Pending Payments", value: "SAR 156", change: "-2.3%", color: "text-yellow-500" },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white border-gray-300 border rounded-xl p-6 shadow text-center space-y-2"
          >
            <p className="text-gray-500 font-semibold">{item.title}</p>
            <p className="text-2xl font-bold">{item.value}</p>
            <p className={`font-medium ${item.color}`}>{item.change} vs last month</p>
          </div>
        ))}
      </div>
    </div>
  );
}
