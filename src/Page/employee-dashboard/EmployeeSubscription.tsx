import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
// import { MdDownload } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { useGetEmployeeSubscriptionQuery } from "@/redux/features/employee/subscription/subscription.api";
import type { Subscription, Invoice, Plan } from "@/Types/subscription.types";
import { useDebounce } from "@/Components/ui/multiselect";
// import { useDebounce } from "use-debounce";

const EmployeeSubscription: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { data, isLoading, isError } = useGetEmployeeSubscriptionQuery(
    { page, search: debouncedSearch },
    { refetchOnMountOrArgChange: true }
  );

  const subscriptions: Subscription[] = data?.results || [];

  console.log(subscriptions);
  const totalPages = data?.total_pages || 1;

  const handleView = (sub: Subscription) => {
    setSelectedSub(sub);
    setOpenDialog(true);
  };

  const filteredSubscriptions =
    filterStatus === "all"
      ? subscriptions
      : subscriptions.filter((sub) => sub.status === filterStatus);

  const getStatusBadge = (
    status: Subscription["status"],
    remainingDays: number,
    invoiceStatus: Invoice["status"]
  ) => {
    const isExpired = remainingDays <= 0 && status === "active";
    if (status === "active" && invoiceStatus === "paid" && !isExpired)
      return (
        <span className="text-green-600 text-xs font-semibold bg-green-100 px-2 py-1 rounded-md">
          Active & Paid
        </span>
      );
    if (isExpired)
      return (
        <span className="text-red-600 text-xs font-semibold bg-red-100 px-2 py-1 rounded-md">
          Expired — Renewal Needed
        </span>
      );
    if (invoiceStatus !== "paid")
      return (
        <span className="text-orange-600 text-xs font-semibold bg-orange-100 px-2 py-1 rounded-md">
          Payment Due — Action Needed
        </span>
      );
    if (status === "paused")
      return (
        <span className="text-blue-600 text-xs font-semibold bg-blue-100 px-2 py-1 rounded-md">
          Paused — {remainingDays} days Left
        </span>
      );
    if (status === "canceled")
      return (
        <span className="text-red-600 text-xs font-semibold bg-red-100 px-2 py-1 rounded-md">
          Stopped Permanently
        </span>
      );
    return (
      <span className="text-gray-600 text-xs font-semibold bg-gray-100 px-2 py-1 rounded-md">
        {status}
      </span>
    );
  };

  const calculateProgress = (
    remainingDays: number,
    interval: Plan["interval"] = "month"
  ) => {
    const totalDays = interval === "month" ? 30 : 365;
    const elapsed = totalDays - remainingDays;
    return totalDays ? (elapsed / totalDays) * 100 : 0;
  };

  const getProgressColor = (
    status: Subscription["status"],
    invoiceStatus: Invoice["status"],
    remainingDays: number
  ) => {
    const isExpired = remainingDays <= 0 && status === "active";
    if (status === "canceled" || isExpired) return "bg-red-500";
    if (invoiceStatus !== "paid") return "bg-orange-500";
    if (status === "paused") return "bg-blue-500";
    return "bg-green-500";
  };

  if (isLoading)
    return <div className="p-6 text-center">Loading subscriptions...</div>;
  if (isError)
    return (
      <div className="p-6 text-center text-red-600">Error loading data</div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Subscriptions</h2>
      <p className="mt-2 text-gray-600">
        Manage all property subscriptions and billing cycles
      </p>

      {/* Search & Filter */}
      <div className="flex w-1/2 gap-2 mt-4 mb-4  p-2 rounded-xl">
        <input
          type="text"
          placeholder="Search by client, building, or apartment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="mt-6 border rounded-xl overflow-hidden bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Property & Owner</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Timeline</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscriptions.length > 0 ? (
              filteredSubscriptions.map((sub) => {
                const totalDays = sub.plan.interval === "month" ? 30 : 365;
                const elapsedDays = totalDays - sub.remaining_days;
                const progress = calculateProgress(
                  sub.remaining_days,
                  sub.plan.interval
                );
                return (
                  <tr key={sub.id} className="border-t">
                    <td className="p-3">
                      <div className="font-medium">
                        {sub.apartment.apartment_number}, {sub.building.name}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {sub.user.name} • {sub.region.name}
                      </div>
                    </td>
                    <td className="p-3">
                      {getStatusBadge(
                        sub.status,
                        sub.remaining_days,
                        sub.invoices.status
                      )}
                    </td>
                    <td className="p-3">
                      <div className="text-xs text-gray-600 mb-1">
                        {sub.remaining_days > 0
                          ? `${sub.remaining_days} days remaining`
                          : sub.status === "canceled"
                          ? "Subscription ended"
                          : "Expired"}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className={`${getProgressColor(
                            sub.status,
                            sub.invoices.status,
                            sub.remaining_days
                          )} h-1 rounded-full`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">
                        {elapsedDays}/{totalDays} days
                      </div>
                    </td>
                    <td className="p-3 flex gap-2">
                      <FaEye
                        onClick={() => handleView(sub)}
                        className="mt-3 ml-4 cursor-pointer text-base text-blue-600"
                      />
                      {/* <MdDownload className="mt-3 ml-2 cursor-pointer text-base text-blue-600" /> */}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No subscriptions found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between p-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal - Your previous design */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Client & Subscription Details
            </DialogTitle>
          </DialogHeader>

          {selectedSub && (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center gap-4 border-b pb-3">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg">
                  {selectedSub.user.name.slice(0, 1)}
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {selectedSub.user.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedSub.user.email || "No email"}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-600 text-xs font-semibold">
                  {selectedSub.status.toUpperCase()}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    selectedSub.invoices.status === "paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {selectedSub.invoices.status === "paid" ? "Paid" : "Unpaid"}
                </span>
                <span className="px-2 py-1 rounded bg-orange-100 text-orange-600 text-xs font-semibold">
                  {selectedSub.remaining_days} Days Left
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">
                    {selectedSub.user.prime_phone || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Plan</p>
                  <p className="font-medium">{selectedSub.plan.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Apartment</p>
                  <p className="font-medium">
                    {selectedSub.apartment.apartment_number}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Building</p>
                  <p className="font-medium">{selectedSub.building.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Area/Region</p>
                  <p className="font-medium">{selectedSub.region.name}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <a
                  href={`tel:${selectedSub.user.prime_phone}`}
                  className="flex-1 bg-blue-600 text-white rounded-md text-sm py-2 font-medium text-center"
                >
                  Call
                </a>
                <a
                  href={`https://wa.me/${selectedSub.user.prime_phone}`}
                  target="_blank"
                  className="flex-1 bg-green-600 text-white rounded-md text-sm py-2 font-medium text-center"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeSubscription;
