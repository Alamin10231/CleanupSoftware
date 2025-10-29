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
  const { data: all_serviceData } = useGetAllServiceDataAdminQuery(undefined);
  const services: Service[] = useMemo(
    () => all_serviceData?.results || [],
    [all_serviceData]
  );

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search services..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-600 cursor-pointer w-full sm:w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Sort By Revenue (High to Low)</option>
            <option>Sort By Name</option>
            <option>Sort By Bookings</option>
          </select>
        </div>
      </div>

      {/* 📦 Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {filtered?.map((service) => {
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
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FiHome className="text-xl sm:text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-[#0b1220]">
                      {service.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right font-semibold text-lg sm:text-xl text-gray-800 w-full sm:w-auto mt-2 sm:mt-0">
                  SAR {discounted.toLocaleString()}
                </div>
              </div>

              {/* Bookings */}
              <div className="flex flex-wrap items-center gap-3 mt-4 text-xs sm:text-sm text-gray-600">
                <span>👥 {service.total_booking} bookings</span>
                <span>💰 {formatRevenueShort(service.revenue)}</span>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-center text-xs sm:text-sm">
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
