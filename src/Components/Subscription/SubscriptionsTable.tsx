import { FaPause, FaPlay } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineFileDownload, MdLocationPin } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { BiPackage } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { useUpdateSubscriptionMutation } from "@/redux/features/admin/subscription/subscription.api";
import { useState } from "react";

/* ---------- Types ---------- */
type SubscriptionStatus =
  | "Active"
  | "Pending"
  | "Auto-Renew"
  | "Expired"
  | "Paused"
  | "Past_due";

type Subscription = {
  id: number;
  name: string;
  email: string;
  status: SubscriptionStatus;
  location: string;
  package: string;
  startDate: string;
  countdown: string;
  nextPayment: string;
  invoice: boolean;
  employee: any;
};

type Props = {
  data: {
    results: Subscription[];
    count: number;
    next?: string | null;
    previous?: string | null;
  };
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
};

/* ---------- Helpers ---------- */
const formatDateForDisplay = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
const getRemainingDays = (nextPayment: string) => {
  if (!nextPayment) return "-";
  const today = new Date();
  const next = new Date(nextPayment);
  const diff = next.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};


const getStatusClasses = (status: SubscriptionStatus) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border border-green-200";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    case "Auto-Renew":
      return "bg-blue-100 text-blue-800 border border-blue-200";
    case "Paused":
      return "bg-gray-100 text-gray-800 border border-gray-200";
    case "Expired":
    case "Past_due":
      return "bg-red-100 text-red-800 border border-red-200";
    default:
      return "bg-purple-100 text-purple-800 border border-purple-200";
  }
};

/* ---------- Component ---------- */
export default function SubscriptionsTable({
  data,
  page,
  pageSize,
  onPageChange,
}: Props) {
  const [updateSubscription] = useUpdateSubscriptionMutation();
  const rows = data?.results || [];
  const user = useSelector((state: any) => state.auth.user);

  const [showCalendarFor, setShowCalendarFor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  /* ---------- Handlers ---------- */
  const handleStatusChange = async (sub: Subscription, newStatus: string) => {
    try {
      await updateSubscription({
        id: sub.id,
        status: newStatus.toLowerCase(),
        employee: [user?.id].filter(Boolean),
      }).unwrap();

      toast.success(`Subscription for ${sub.name} updated to ${newStatus}`);
    } catch (error: any) {
      console.error(error);
      const message =
        error?.data?.detail || "Failed to update subscription";
      toast.error(message);
    }
  };

  const handleSetEndDate = async (sub: Subscription, date: Date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
      await updateSubscription({
        id: sub.id,
        status: sub.status.toLowerCase(), // keep current status
        current_period_end: formattedDate,
        employee: [user?.id].filter(Boolean),
      }).unwrap();

      toast.success(`End date set for ${sub.name}`);
    } catch (error: any) {
      console.error(error);
      const message =
        error?.data?.current_period_end?.[0] ||
        error?.data?.detail ||
        "Failed to set end date";
      toast.error(message);
    }
  };

  const handleDownload = (sub: Subscription) => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    doc.setFontSize(28);
    doc.text("Subscription Invoice", 40, 50);

    doc.setFontSize(12);
    let y = 80;
    const lineSpacing = 18;

    doc.setFont("helvetica", "bold");
    doc.text("Billed To:", 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${sub.name} (${sub.email})`, 120, y);
    y += lineSpacing;

    doc.setFont("helvetica", "bold");
    doc.text("Subscription ID:", 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${sub.id}`, 150, y);
    y += lineSpacing;

    doc.setFont("helvetica", "bold");
    doc.text("Status:", 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${sub.status}`, 150, y);
    y += lineSpacing;

    doc.setFont("helvetica", "bold");
    doc.text("Location:", 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${sub.location}`, 150, y);
    y += lineSpacing;

    doc.setFont("helvetica", "bold");
    doc.text("Start Date:", 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${formatDateForDisplay(sub.startDate)}`, 150, y);
    y += lineSpacing;

    doc.setFont("helvetica", "bold");
    doc.text("Next Payment:", 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${formatDateForDisplay(sub.nextPayment)}`, 150, y);
    y += lineSpacing;

    autoTable(doc, {
      startY: y + 20,
      theme: "striped",
      headStyles: { fillColor: "#10b981", textColor: "#fff", fontStyle: "bold", halign: "center" },
      head: [["Description", "Package Name", "Amount"]],
      body: [["Monthly/Annual Subscription Fee", sub.package, "Refer to your billing portal"]],
      columnStyles: { 0: { cellWidth: 200 }, 1: { cellWidth: 150 }, 2: { halign: "right", cellWidth: 150 } },
    });

    doc.save(`invoice_subscription_${sub.id}_${sub.name.replace(/\s/g, "_")}.pdf`);
    toast.info(`Downloading invoice for ${sub.name}...`);
  };

  /* ---------- Pagination ---------- */
  const totalCount = data?.count || rows.length;
  const startIdx = (page - 1) * pageSize + 1;
  const endIdx = Math.min(startIdx + rows.length - 1, totalCount);
  const totalPages = Math.ceil(totalCount / pageSize);

  /* ---------- Render ---------- */
  return (
    <div className="rounded-xl shadow-2xl border border-gray-100 overflow-hidden bg-white/90 backdrop-blur-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold tracking-wider">
          <tr>
            <th className="px-6 py-4 text-left">Client Details</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-left">Plan Details</th>
            <th className="px-6 py-4 text-left">Dates</th>
            <th className="px-6 py-4 text-left">Remaining Dates</th>
            <th className="px-6 py-4 text-center">Actions</th>
            <th className="px-6 py-4 text-center">Invoice</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {rows.map((sub, idx) => (
            <tr key={sub.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50/50`}>
              {/* Client */}
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <div className="text-base font-bold text-gray-900">{sub.name}</div>
                  <span className="text-xs text-gray-500 font-medium mt-0.5">{sub.email}</span>
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4 text-center">
                <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider min-w-[110px] ${getStatusClasses(sub.status)}`}>
                  {sub.status.replace(/_/g, " ")}
                </span>
              </td>

              {/* Plan */}
              <td className="px-6 py-4 space-y-1">
                <div className="flex items-center text-gray-700">
                  <BiPackage className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="font-medium">{sub.package}</span>
                </div>
                <div className="flex items-center text-gray-500 text-xs">
                  <MdLocationPin className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{sub.location}</span>
                </div>
              </td>

              {/* Dates */}
              <td className="px-6 py-4 space-y-1">
                <div className="flex items-center text-gray-700">
                  <LuCalendarDays className="w-4 h-4 text-green-500 mr-2" />
                  <span className="font-semibold text-xs">Start: {formatDateForDisplay(sub.startDate)}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <LuCalendarDays className="w-4 h-4 text-red-500 mr-2" />
                  <span className="font-medium text-xs">Next: {formatDateForDisplay(sub?.nextPayment)}</span>
                </div>
              </td>
              <div className="flex items-center text-gray-600">
                <LuCalendarDays className="w-4 h-4 text-blue-500 mr-2" />
                <span className="font-medium text-xs">
                  Remaining: {getRemainingDays(sub?.nextPayment)} days
                </span>
              </div>

              {/* Actions */}
              <td className="px-6 py-4 text-center">
                {sub.status === "Active" ? (
                  <button
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-yellow-500 text-white shadow-md hover:bg-yellow-600 flex items-center justify-center gap-1 mx-auto"
                    onClick={() => handleStatusChange(sub, "Paused")}
                  >
                    <FaPause className="w-3 h-3" /> Pause
                  </button>
                ) : sub.status === "Paused" ? (
                  <button
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 flex items-center justify-center gap-1 mx-auto"
                    onClick={() => handleStatusChange(sub, "Active")}
                  >
                    <FaPlay className="w-3 h-3" /> Resume
                  </button>
                ) : sub.status === "Past_due" ? (
                  <div className="flex flex-col items-center space-y-2">
                    <Select
                      onValueChange={(newValue) => {
                        if (newValue === "Active") handleStatusChange(sub, "Active");
                        else if (newValue === "set_end_date") setShowCalendarFor(sub.id);
                      }}
                    >
                      <SelectTrigger className="w-[140px] text-xs font-semibold border-gray-300 bg-white hover:bg-gray-50 shadow-sm">
                        <SelectValue placeholder="Change Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Set Active</SelectItem>
                        <SelectItem value="set_end_date">Set End Date</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Calendar */}
                    {showCalendarFor === sub.id && (
                      <div className="mt-2">
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date: Date) => {
                            setSelectedDate(date);
                            setShowCalendarFor(null);
                            handleSetEndDate(sub, date);
                          }}
                          dateFormat="dd-MMM-yyyy"
                          className="border rounded px-2 py-1"
                        />
                      </div>
                    )}

                    <span className="text-[10px] text-gray-400 italic">Past due — requires action</span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs italic">-</span>
                )}
              </td>

              {/* Invoice */}
              <td className="px-6 py-4 text-center">
                {sub.invoice ? (
                  <button
                    onClick={() => handleDownload(sub)}
                    className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110 p-2 rounded-full bg-blue-50/50"
                    title="Download Invoice"
                  >
                    <MdOutlineFileDownload className="w-6 h-6 mx-auto" />
                  </button>
                ) : (
                  <span className="text-gray-400 text-base font-semibold">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50/70">
        <span className="text-sm text-gray-600 mb-2 sm:mb-0 font-medium">
          Showing{" "}
          <span className="font-bold text-gray-800">{rows.length ? startIdx : 0}</span>{" "}
          to <span className="font-bold text-gray-800">{rows.length ? endIdx : 0}</span> of{" "}
          <span className="font-bold text-gray-800">{totalCount}</span> results
        </span>
        <div className="flex items-center space-x-3">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            &larr; Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages || 1}
          </span>
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
