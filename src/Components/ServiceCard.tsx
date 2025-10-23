import { useGetAllServiceDataAdminQuery } from "@/redux/features/admin/services/services.api";
import React, { useMemo, useState } from "react";
import { FiEye, FiEdit2, FiTrash2, FiHome } from "react-icons/fi";

interface Service {
  id: number;
  name: string;
  description: string;
  category: { id: number; name: string | number };
  base_price: number;
  discounted_price?: number | null;
  bill_cycle: string;
  status: string;
  revenue: number;
  total_booking: number;
  active: number;
  completed: number;
  pending: number;
  created_at: string;
  building: { name: string; city: string };
  discount?: number;
}

const formatRevenueShort = (num: number) => {
  if (num >= 1_000_000) return `SAR ${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1000) return `SAR ${(num / 1000).toFixed(1)}K`;
  return `SAR ${num.toLocaleString()}`;
};

const ServiceCard: React.FC = () => {
  const { data: all_serviceData } = useGetAllServiceDataAdminQuery();
  console.log(all_serviceData);

  const services: Service[] = all_serviceData?.results || [];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Category");
  const [status, setStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("Sort By Revenue (High to Low)");

  const filtered = useMemo(() => {
    return services
      .filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.description.toLowerCase().includes(search.toLowerCase())
      )
      .filter(
        (s) =>
          category === "All Category" ||
          s.category.name.toLowerCase() === category.toLowerCase()
      )
      .filter(
        (s) =>
          status === "All Status" ||
          s.status.toLowerCase() === status.toLowerCase()
      )
      .sort((a, b) => {
        if (sortBy === "Sort By Name") return a.name.localeCompare(b.name);
        if (sortBy === "Sort By Revenue (High to Low)")
          return b.revenue - a.revenue;
        return b.total_booking - a.total_booking;
      });
  }, [services, search, category, status, sortBy]);

  return (
    <>
      {/* 🔍 Filters */}
      <div className="flex items-center justify-between gap-4 mt-8">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search services..."
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <select
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All Category</option>
            {[...new Set(services.map((s) => s.category.name))].map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select> */}
          {/* <select
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>started</option>
            <option>completed</option>
            <option>pending</option>
          </select> */}
        </div>

        <select
          className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Sort By Revenue (High to Low)</option>
          <option>Sort By Name</option>
          <option>Sort By Bookings</option>
        </select>
      </div>

      {/* 📦 Services Grid */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {filtered.map((service) => {
          // ✅ Safely calculate discounted price
          const discounted =
            service.discounted_price ??
            (service.base_price && service.discount
              ? service.base_price -
                (service.base_price * service.discount) / 100
              : service.base_price);

          const completionTotal =
            service.completed + service.pending + service.active;
          const completionPercent =
            completionTotal > 0
              ? (service.completed / completionTotal) * 100
              : 0;

          return (
            <div
              key={service.id}
              className="bg-white border border-gray-300 rounded-xl shadow-sm p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FiHome className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold text-[#0b1220]">
                        {service.name}
                      </h2>
                      {/* <span
                        className={`text-xs px-2 py-0.5 rounded-md ${
                          service.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : service.status === "started"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {service.status}
                      </span> */}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {service.description}
                    </p>
                    {/* <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md">
                        {service.category.name}
                      </span>
                      <span>🏢 {service.building.name}</span>
                      <span>📍 {service.building.city}</span>
                    </div> */}
                  </div>
                </div>

                {/* Actions + Price */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      title="View"
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <FiEye className="text-gray-500" />
                    </button>
                    <button
                      title="Edit"
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <FiEdit2 className="text-gray-500" />
                    </button>
                    <button
                      title="Delete"
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <FiTrash2 className="text-red-500" />
                    </button>
                  </div>
                  <div className="text-right font-bold text-xl text-gray-800">
                    SAR {discounted.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Bookings */}
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                <span>👥 {service.total_booking} bookings</span>
                <span>💰 Revenue: {formatRevenueShort(service.revenue)}</span>
              </div>

              {/* Completion Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Completion:</p>
                  <p>
                    {service.completed} / {completionTotal}
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mt-4 text-center text-sm">
                <div>
                  <p className="font-semibold">{service.active}</p>
                  <p className="text-gray-500">Active</p>
                </div>
                <div>
                  <p className="font-semibold">{service.completed}</p>
                  <p className="text-gray-500">Completed</p>
                </div>
                <div>
                  <p className="font-semibold">
                    {formatRevenueShort(service.revenue)}
                  </p>
                  <p className="text-gray-500">Revenue</p>
                </div>
                <div>
                  <p className="font-semibold">{service.pending}</p>
                  <p className="text-gray-500">Pending</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-sm">
          No services found.
        </p>
      )}
    </>
  );
};

export default ServiceCard;
