import { useState } from "react";
import SubscriptionsTable from "./SubscriptionsTable";
import { Link } from "react-router";
import { data, Subscription, type any } from "../../assets/assets";

export default function SubscriptionsDashboard() {
  const [statusFilter, setStatusFilter] = useState("All status");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = data.filter((s) => {
    if (statusFilter === "All status") return true;
    if (statusFilter === "Inactive") return s.status !== "Active";
    return s.status === statusFilter;
  });

  return (
    <div className="p-6 space-y-8">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Subscription.map((a, index) => {

          return (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-5 py-10 flex items-center justify-between"
            >
              {/* Left column: title and number */}
              <div className="flex flex-col gap-1">
                <p className="text-gray-500 font-semibold">{a.title}</p>
                <p className="text-black font-bold text-xl">{a.number}</p>
              </div>

              {/* Right: icon */}
              {a.iconKey && (
                <div className="p-3 bg-blue-100 rounded-xl w-12 h-12 flex items-center justify-center">
                  <img src={a.iconKey} alt={a.iconAlt} className="w-8 h-8" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">All Subscribers</h1>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="border border-gray-300  rounded-md px-3 py-2"
          >
            <option>All status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Auto-Renew</option>
            <option>Expired</option>
            <option>Inactive</option>
          </select>

          <Link to="">
            {" "}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              + Add New Plan
            </button>
          </Link>
          <Link to="/subscriptionplan">
            {" "}
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
