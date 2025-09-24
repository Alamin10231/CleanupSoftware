import { useEffect, useState } from "react";

type OverviewData = {
  totalClients: number;
  monthlyRevenue: number;
  buildings: number;
};

export default function DashboardOverview() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // এখন মক JSON থেকে ডেটা নিচ্ছি
    fetch("/mockoverview.json")
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading overview:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm text-center">
        Loading…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm text-center">
        Failed to load overview data
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        CleanUp Pro Dashboard Overview
      </h3>
      <p className="mb-6 text-sm text-gray-500">
        Your cleaning business is growing! The dashboard has been updated with
        the latest stats.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="flex flex-col items-center rounded-lg bg-[#F5F5F5] p-4">
          <p className="text-2xl font-bold text-black">{data.totalClients}</p>
          <p className="text-sm text-gray-500">Total Clients</p>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-[#F5F5F5] p-4">
          <p className="text-2xl font-bold text-black">
            SAR {data.monthlyRevenue}
          </p>
          <p className="text-sm text-gray-500">Monthly Revenue</p>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-[#F5F5F5] p-4">
          <p className="text-2xl font-bold text-black">{data.buildings}</p>
          <p className="text-sm text-gray-500">Buildings</p>
        </div>
      <div className="mt-6 text-center">
        <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Explore Premium Features
        </button>
      </div>
      </div>

    </div>
  );
}
