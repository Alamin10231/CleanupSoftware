import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { useGetPlansQuery } from "@/redux/features/admin/plan/plan.api";

export default function SubscriptionPlan() {
  const [statusFilter, setStatusFilter] = useState("All status");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetPlansQuery(currentPage);

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
      price: `$${item.amount ?? 0}`,
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
      <div className="flex items-center justify-between py-10">
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

          <Link to="/add-new-plan">
            <Button>add-new-plan</Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-base">
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
            {filteredPlans?.map((plan: any) => (
              <tr key={plan.id}>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900 text-lg">
                    {plan.name}
                  </div>
                  <div className="text-gray-500 text-sm">{plan.subtitle}</div>
                </td>

                <td className="px-4 py-3 font-semibold">{plan.price}</td>

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

                <td className="px-4 py-3 space-x-3">
                  <Link to={`/add-new-plan?id=${plan.id}`}>
                    <Button variant={"outline"}>Edit</Button>
                  </Link>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant={"destructive"}>Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your plan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                          <Button variant={"destructive"}>Delete</Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
