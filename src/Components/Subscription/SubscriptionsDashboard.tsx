import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router";
import { assets, Subscription, data } from "../../assets/assets";
import SubscriptionsTable from "./SubscriptionsTable";
import { useGetCalculationSubscriptionsQuery } from "@/redux/api/apiSlice";

export default function SubscriptionsDashboard() {
  const [statusFilter, setStatusFilter] = useState("All status");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // 🔹 Fetch KPI totals
  const { data: kpis, isLoading: kpisLoading } =
    useGetCalculationSubscriptionsQuery();

  console.log();

  // 🔹 Debug log
  // useEffect(() => {
  //   console.log("📊 KPI API Response:", kpis);
  // }, [kpis]);

  // 🔹 Map backend fields to UI card titles
  const valueByTitle: Record<string, number> = {
    "Active Subscriptions": Number(kpis?.active ?? kpis?.Active ?? 0),
    "Pending Renewals": Number(kpis?.pending ?? kpis?.Pending ?? 0),
    Inactive: Number(kpis?.inactive ?? kpis?.Inactive ?? 0),
    Expired: Number(kpis?.expired ?? kpis?.Expired ?? 0),
    "Revenue This Month": Number(
      kpis?.total_revinew_last_month ??
        kpis?.total_revenue_last_month ?? // in case backend fixed spelling
        kpis?.revenue_this_month ??
        0
    ),
  };

  // 🔹 Filter for table
  const filtered = useMemo(() => {
    return data.filter((s) => {
      if (statusFilter === "All status") return true;
      if (statusFilter === "Inactive") return s.status !== "Active";
      return s.status === statusFilter;
    });
  }, [statusFilter]);

  return (
    <div className="p-6 space-y-8">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpisLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white shadow rounded-md p-5 py-10 animate-pulse h-[112px]"
              />
            ))
          : Subscription.map((a, index) => {
              const icon = assets[a.iconKey as keyof typeof assets];
              const raw = valueByTitle[a.title] ?? 0;
              const display =
                a.title === "Revenue This Month"
                  ? `$ ${raw.toLocaleString()}`
                  : raw.toLocaleString();

              return (
                <div
                  key={index}
                  className="bg-white shadow rounded-md p-5 py-10 flex items-center justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-500 font-semibold">{a.title}</p>
                    <p className="text-black font-bold text-xl">{display}</p>
                  </div>

                  {icon && (
                    <div className="p-3 bg-blue-100 rounded-xl w-12 h-12 flex items-center justify-center">
                      <img src={icon} alt={a.iconAlt} className="w-8 h-8" />
                    </div>
                  )}
                </div>
              );
            })}
      </div>

      {/* Table section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">All Subscribers</h1>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option>All status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Auto-Renew</option>
            <option>Expired</option>
            <option>Inactive</option>
          </select>

          <Link to="/subscriptionplan">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              View Plan
            </button>
          </Link>
        </div>
      </div>

      <SubscriptionsTable
        rows={filtered}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}
