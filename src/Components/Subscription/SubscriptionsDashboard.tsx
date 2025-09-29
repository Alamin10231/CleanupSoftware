import { useState } from "react";
import correcticon from "../../assets/Image/correcticon.svg";
import time from "../../assets/Image/time.svg";
import cross from "../../assets/Image/cross.svg";
import doller from "../../assets/Image/doller.svg";
import SubscriptionsTable from "./SubscriptionsTable";
import { Link } from "react-router";

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
        <span className="text-gray-500 text-2xl font-semibold py-5">{title}</span>
        <span className="text-3xl font-bold text-black">{value}</span>
      </div>
      <div className={`${bg} p-4 rounded-2xl`}>
        <img src={icon} alt="icon" className={`w-7 h-7 ${color}`} />
      </div>
    </div>
  );
}

export default function SubscriptionsDashboard() {
  const [statusFilter, setStatusFilter] = useState("All status");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // ফিল্টার লজিক
  const filtered = data.filter((s) => {
    if (statusFilter === "All status") return true;
    if (statusFilter === "Inactive") return s.status !== "Active";
    return s.status === statusFilter;
  });

  return (
    <div className="p-6 space-y-8">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Active Subscriptions" value="247" icon={correcticon} />
        <Card title="Pending Renewals" value="18" icon={time} />
        <Card title="Expired" value="12" icon={cross} color="text-red-500" bg="bg-red-100" />
        <Card title="Revenue This Month" value="$45,680" icon={doller} />
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">All Subscription</h1>
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

         <Link to=""> <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            + Add New Plan
          </button></Link>
         <Link to="/subscriptionplan"> <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            View Plan
          </button></Link>
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
