import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import correcticon from "../../assets/Image/correcticon.svg";
import time from "../../assets/Image/time.svg";
import cross from "../../assets/Image/cross.svg";
import doller from "../../assets/Image/doller.svg";

const data = [
  {
    id: 1,
    name: "John Martinez",
    email: "john.martinez@email.com",
    status: "Active",
    location: "Apt 4B, Building A North Region",
    package: "Premium Package $299/month",
    startDate: "Jan 15, 2024",
    countdown: "17 hour Left",
    nextPayment: "Feb 15, 2024",
    invoice: true,
  },
  {
    id: 2,
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    status: "Pending",
    location: "Apt 2A, Building C South Region",
    package: "Basic Package $149/month",
    startDate: "Dec 20, 2023",
    countdown: "",
    nextPayment: "Jan 20, 2024",
    invoice: false,
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@email.com",
    status: "Auto-Renew",
    location: "Apt 1C, Building B East Region",
    package: "Enterprise Package $499/month",
    startDate: "Nov 10, 2023",
    countdown: "17 Days Left",
    nextPayment: "Feb 10, 2024",
    invoice: true,
  },
  {
    id: 4,
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    status: "Expired",
    location: "Apt 3D, Building D West Region",
    package: "Premium Package $299/month",
    startDate: "Oct 5, 2023",
    countdown: "",
    nextPayment: "-",
    invoice: false,
  },
];

type CardProps = {
  title: string;
  value: string;
  icon: string;
  color?: string;
  bg?: string;
};

function Card({
  title,
  value,
  icon,
  color = "text-blue-500",
  bg = "bg-blue-100",
}: CardProps) {
  return (
    <div className="bg-white shadow rounded-lg px-5 py-10 my-5 flex items-center justify-between gap-2">
      <div className="flex flex-col items-start">
        <span className="text-gray-500 text-2xl font-semibold py-5">
          {title}
        </span>
        <span className="text-3xl font-bold text-black">{value}</span>
      </div>
      <div className={`${bg} p-4 rounded-full`}>
        <img src={icon} alt="icon" className={`w-5 h-5 ${color} `} />
      </div>
    </div>
  );
}

export default function SubscriptionsDashboard() {
  const [statusFilter, setStatusFilter] = useState("All status");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = data.filter((s) => {
    if (statusFilter === "All status") return true;
    if (statusFilter === "Active") return true;
    if (statusFilter === "Inactive") {
     return s.status !== "Active";
    }
    return s.status === statusFilter;
  });

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-6 space-y-8">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Active Subscriptions"
          value="247"
          icon={correcticon}
          color="text-blue-500"
          bg="bg-blue-100"
        />
        <Card
          title="Pending Renewals"
          value="18"
          icon={time}
          color="text-blue-500"
          bg="bg-blue-100"
        />
        <Card
          title="Expired"
          value="12"
          icon={cross}
          color="text-red-500"
          bg="bg-red-100"
        />
        <Card
          title="Revenue This Month"
          value="$45,680"
          icon={doller}
          color="text-blue-500"
          bg="bg-blue-100"
        />
      </div>
      {/* Filter + Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">All Subscription</h1>
        </div>
        <div className="relative flex items-center gap-2">
          <button
            className="flex items-center gap-1 border rounded-md px-3 py-2"
            onClick={() =>
              setStatusFilter(
                statusFilter === "All status" ? "Active" : "All status"
              )
            }
          >
            {statusFilter} <ChevronDownIcon className="w-4 h-4" />
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            + Add New Plan
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-300 text-sm font-sans">
          <thead className="bg-gray-200 uppercase text-gray-700 tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Client</th>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Package</th>
              <th className="px-6 py-3 text-left">Start Date</th>
              <th className="px-6 py-3 text-left">Countdown</th>
              <th className="px-6 py-3 text-left">Next Payment</th>
              <th className="px-6 py-3 text-left">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paged.map((sub, idx) => (
              <tr
                key={sub.id}
                className={`transition-colors duration-300 cursor-pointer ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50`}
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">
                      {sub.name}
                    </span>
                    <span className="text-xs text-gray-500">{sub.email}</span>
                    <span
                      className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                        sub.status === "Active"
                          ? "bg-gradient-to-r from-green-300 to-green-500 text-white"
                          : sub.status === "Pending"
                          ? "bg-gradient-to-r from-yellow-300 to-yellow-500 text-white"
                          : sub.status === "Auto-Renew"
                          ? "bg-gradient-to-r from-blue-300 to-blue-500 text-white"
                          : "bg-gradient-to-r from-red-300 to-red-500 text-white"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{sub.location}</td>
                <td className="px-6 py-4 text-gray-700">{sub.package}</td>
                <td className="px-6 py-4 text-gray-700">{sub.startDate}</td>
                <td className="px-6 py-4 text-gray-700">{sub.countdown}</td>
                <td className="px-6 py-4 text-gray-700">{sub.nextPayment}</td>
                <td className="px-6 py-4">
                  {sub.invoice ? (
                    <span className="px-3 py-1 text-blue-700 border border-blue-700 rounded-full text-xs font-semibold">
                      Linked
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-gray-400 border border-gray-300 rounded-full text-xs font-semibold">
                      No
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm">
        <span>
          Showing 1 to {paged.length} of {filtered.length} results
        </span>
        <div className="space-x-2">
          <button
            className="px-3 py-1 border rounded"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded"
            disabled={page * pageSize >= filtered.length}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
