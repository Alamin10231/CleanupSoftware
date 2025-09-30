import { useState } from "react";
import SubscriptionsTable from "./SubscriptionsTable";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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
         <Select
             value={statusFilter}
             onValueChange={(value) => {
               setPage(1);
              setStatusFilter(value);
            }}
         >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All status">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="auto-Renew">Auto-Renew</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Link to="/add-new-plan">
            <Button>
              + Add New Plan
            </Button>
          </Link>
          <Link to="/subscriptionplan">
            <Button>
              View Plan
            </Button>
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
