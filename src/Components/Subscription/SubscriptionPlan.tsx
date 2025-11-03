import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useGetPlansQuery, useUpdatePlanMutation } from "@/redux/features/admin/plan/plan.api";
import { Switch } from "@/Components/ui/switch";
import { toast } from "sonner";

export default function SubscriptionPlan() {
  const [statusFilter, setStatusFilter] = useState("All status");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetPlansQuery(currentPage);
  const [updatePlan] = useUpdatePlanMutation();

  const handleStatusChange = async (plan: any, checked: boolean) => {
    const newStatus = checked;
    try {
      await toast.promise(
        updatePlan({ id: plan.id, is_active: newStatus }).unwrap(),
        {
          loading: "Updating status...",
          success: "Status updated successfully!",
          error: "Failed to update status.",
        }
      );
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading)
    return (
      <div className="text-center text-gray-500 py-10">Loading plans...</div>
    );
  if (isError)
    return (
      <div className="text-center text-red-600 py-10">
        Failed to load plans.{" "}
        <button onClick={() => refetch()} className="underline text-blue-600">
          Retry
        </button>
      </div>
    );

  const mappedPlans =
    data?.results?.map((item: any) => ({
      id: item.id,
      name: item.name ?? "Unnamed Plan",
      subtitle: item.description ?? "—",
      price: `$${Math.round(item.amount) ?? 0}`,
      cycle:
        item.interval === "month"
          ? "Monthly"
          : item.interval === "year"
          ? "Yearly"
          : "Unknown",
      features:
        item.service_line_items?.map((s: any) => s.description).join(", ") ||
        "—",
      status: item.is_active ? "Active" : "Inactive",
    })) ?? [];

  // apply filter
  const filteredPlans =
    statusFilter === "All status"
      ? mappedPlans
      : mappedPlans.filter((p: any) => p.status === statusFilter);

  const totalPages = data?.count && data?.results?.length ? Math.ceil(data.count / data.results.length) : 1;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div></div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option>All status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-base">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="p-4">Plan Name</th>
              <th className="px-4">Price</th>
              <th className="px-4">Billing Cycle</th>
              <th className="px-4">Features</th>
              <th className="px-4">Status</th>
              <th className="px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPlans?.map((plan: any) => (
              <tr key={plan.id}>
                <td className="px-4 py-3">
                  <div className="text-gray-900">
                    {plan.name}
                  </div>
                  <div className="text-gray-500 text-sm">{plan.subtitle}</div>
                </td>

                <td className="px-4 py-3">{plan.price}</td>

                <td className="px-4 py-3">
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

                <td className="px-4 py-3">{plan.features}</td>

                <td className="px-4 py-3">
                  <Switch
                    checked={plan.status === "Active"}
                    onCheckedChange={(checked) => handleStatusChange(plan, checked)}
                  />
                </td>

                <td className="px-4 py-3 space-x-3">
                  <Link to={`/admin/update-plan/${plan.id}`}>
                    <Button variant={"outline"}>Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <p className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!data.previous}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!data.next}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
