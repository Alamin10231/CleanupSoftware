import { useState } from "react";

type Plan = {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  cycle: "Monthly" | "Yearly";
  features: string;
  status: "Active" | "Inactive";
};

const plansData: Plan[] = [
  {
    id: 1,
    name: "Basic Plan",
    subtitle: "For small properties",
    price: "$29",
    cycle: "Monthly",
    features: "Up to 10 apartments, Basic support",
    status: "Active",
  },
  {
    id: 2,
    name: "Standard Plan",
    subtitle: "For medium properties",
    price: "$79",
    cycle: "Monthly",
    features: "Up to 50 apartments, Priority support",
    status: "Active",
  },
  {
    id: 3,
    name: "Premium Plan",
    subtitle: "For large properties",
    price: "$149",
    cycle: "Monthly",
    features: "Unlimited apartments, 24/7 support",
    status: "Active",
  },
  {
    id: 4,
    name: "Enterprise Plan",
    subtitle: "For enterprise clients",
    price: "Custom",
    cycle: "Yearly",
    features: "Custom features, Dedicated support",
    status: "Inactive",
  },
];

export default function SubscriptionPlan() {
  const [statusFilter, setStatusFilter] = useState("All status");

  // Filter plans based on selected status
  const filterplans =
    statusFilter === "All status" ? plansData : plansData.filter((p)=>p.status === statusFilter);

  return (
    <div>
      <div className="flex items-center justify-between py-10">
        <div></div>

        <div className="flex items-center gap-2 ">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-4  py-2"
          >
            <option>All status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

     <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
  <table className="min-w-full text-base"> {/* changed from text-sm to text-base */}
    <thead className="bg-gray-50 text-gray-600 text-left">
      <tr>
        <th className="px-4 py-3 text-lg">Plan Name</th>
        <th className="px-4 py-3 text-lg">Price</th>
        <th className="px-4 py-3 text-lg">Billing Cycle</th>
        <th className="px-4 py-3 text-lg">Features</th>
        <th className="px-4 py-3 text-lg">Status</th>
        <th className="px-4 py-3 text-lg">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {filterplans.map((plan) => (
        <tr key={plan.id}>
          <td className="px-4 py-3 text-base">
            <div className="font-medium text-gray-900 text-lg">{plan.name}</div>
            <div className="text-gray-500 text-sm">{plan.subtitle}</div>
          </td>

          <td className="px-4 py-3 font-semibold text-base">{plan.price}</td>

          <td className="px-4 py-3 text-base">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                plan.cycle === "Monthly"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-purple-100 text-purple-600"
              }`}
            >
              {plan.cycle}
            </span>
          </td>

          <td className="px-4 py-3 text-base">{plan.features}</td>

          <td className="px-4 py-3 text-base">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                plan.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {plan.status}
            </span>
          </td>

          <td className="px-4 py-3 space-x-3 text-base">
            <button className="text-blue-600 hover:underline">Edit</button>
           
            <button className="text-red-600 hover:underline">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}
