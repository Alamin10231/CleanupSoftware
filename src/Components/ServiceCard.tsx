import React, { useEffect, useState } from "react";
import { FiEye, FiEdit2, FiTrash2, FiHome } from "react-icons/fi";

interface Service {
  id: number;
  title: string;
  status: string;
  description: string;
  category: string;
  rating: number;
  duration: string;
  price: string;
  bookings: number;
  popularity: string | number; 
  completionRate: { completed: number; total: number };
  stats: { active: number; completed: number; revenue: number; rating: number };
  keyFeatures: string[];
  includedItems: string[];
}

const formatRevenueShort = (num: number) => {
  if (num >= 1_000_000) return `SAR ${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1000) return `SAR ${(num / 1000).toFixed(1)}K`;
  return `SAR ${num.toLocaleString()}`;
};

const ServiceCard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Category");
  const [status, setStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("Sort By Popularity");

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(() => setServices([]));
  }, []);

  const filtered = services
    .filter((s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    )
    .filter((s) => category === "All Category" || s.category.toLowerCase() === category.toLowerCase())
    .filter((s) => status === "All Status" || s.status.toLowerCase() === status.toLowerCase());

  // ✅ Sorting
  const sorted = filtered.sort((a, b) => {
    if (sortBy === "Sort By Name") return a.title.localeCompare(b.title);
    if (sortBy === "Sort By Revenue (High to Low)") return b.stats.revenue - a.stats.revenue;
    // Default: Popularity
    return parseInt(b.popularity.replace("%", "")) - parseInt(a.popularity.replace("%", ""));
  });

  return (
    <>
      {/* Filters UI */}
      <div className="flex items-center justify-between gap-4 mt-8 p-6 bg-white border border-gray-300 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search employees..."
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All Category</option>
            <option>Regular Cleaning</option>
            <option>Deep Cleaning</option>
            <option>Maintenance</option>
            <option>Landscaping</option>
            <option>Pest Control</option>
            <option>Security</option>
          </select>
          <select
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
        </div>
        <select
          className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Sort By Popularity</option>
          <option>Sort By Name</option>
          <option>Sort By Revenue (High to Low)</option>
        </select>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {sorted.map((service) => (
          <div key={service.id} className="bg-white border border-gray-300 rounded-xl shadow-sm p-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FiHome className="text-2xl text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-[#0b1220]">{service.title}</h2>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-md">{service.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md">{service.category}</span>
                    <span>⭐ {service.rating}</span>
                    <span>• {service.duration}</span>
                  </div>
                </div>
              </div>

              {/* Actions + Price */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <button title="View" className="p-1 rounded-md hover:bg-gray-100"><FiEye className="text-gray-500" /></button>
                  <button title="Edit" className="p-1 rounded-md hover:bg-gray-100"><FiEdit2 className="text-gray-500" /></button>
                  <button title="Delete" className="p-1 rounded-md hover:bg-gray-100"><FiTrash2 className="text-red-500" /></button>
                </div>
                <div className="text-right font-bold text-xl">{service.price}</div>
              </div>
            </div>

            {/* Bookings & Popularity */}
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
              <span>👥 {service.bookings} bookings</span>
              <span>🔥 {service.popularity} popularity</span>
            </div>

            {/* Completion Rate */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <p>Completion Rate:</p>
                <p>{service.completionRate.completed} / {service.completionRate.total}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(service.completionRate.completed / service.completionRate.total) * 100}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-4 text-center text-sm">
              <div><p className="font-semibold">{service.stats.active}</p><p className="text-gray-500">Active</p></div>
              <div><p className="font-semibold">{service.stats.completed}</p><p className="text-gray-500">Completed</p></div>
              <div><p className="font-semibold">{formatRevenueShort(service.stats.revenue)}</p><p className="text-gray-500">Revenue</p></div>
              <div><p className="font-semibold">{service.stats.rating}</p><p className="text-gray-500">Rating</p></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceCard;