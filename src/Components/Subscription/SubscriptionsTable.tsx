import { FaPause, FaPlay, FaRedoAlt } from "react-icons/fa"; // Added FaRedoAlt for 'End Now'
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { MdOutlineFileDownload, MdLocationPin } from "react-icons/md";
// Re-importing the Select components for modern action menus
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { useUpdateSubscriptionMutation } from "@/redux/features/admin/subscription/subscription.api";
import { useSelector } from "react-redux";
import { BiPackage } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";

// --- Type Definitions (No change, but essential) ---
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
  rows: Subscription[];
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
};

// --- Helper Functions (Minor updates for consistency) ---
const formatDateForBackend = (dateStr: string) => {
  const [day, month, year] = dateStr.split("-");
  return `${year}-${month}-${day}`;
};

const formatDateForDisplay = (dateStr: string) => {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    // Assumes YYYY-MM-DD or DD-MM-YYYY format in the source and converts it to MM/DD/YYYY for a clean display
    // If the input is DD-MM-YYYY, this will be [D, M, Y]. If it's YYYY-MM-DD, this will be [Y, M, D].
    // Since your `sub.startDate` and `sub.nextPayment` look like DD-MM-YYYY in the source:
    const [day, month, year] = parts;
    return `${month}/${day}/${year}`;
  }
  return dateStr; // Fallback
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

// --- Component Start ---
export default function SubscriptionsTable({
  rows,
  page,
  pageSize,
  onPageChange,
}: Props) {
  const [updateSubscription] = useUpdateSubscriptionMutation();
  const paged = rows.slice((page - 1) * pageSize, page * pageSize);
  const user = useSelector((state: any) => state.auth.user);

  // ✅ Update handler
  const handleStatusChange = async (sub: Subscription, newStatus: string) => {
    // Normalize newStatus for display
    const formattedNewStatus = newStatus
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    // Determine the next payment date to send to the backend
    let nextPaymentDateForBackend = formatDateForBackend(sub.nextPayment);
    if (newStatus === "paused") {
      // If pausing, set the end date to today
      nextPaymentDateForBackend = new Date().toISOString().slice(0, 10);
    } else if (newStatus === "expired") {
      // If expiring, maybe set it to today or keep the original for record-keeping
      nextPaymentDateForBackend = new Date().toISOString().slice(0, 10);
    }
    // Note: 'Active' or 'Resume' should typically keep the existing nextPayment date.

    try {
      await updateSubscription({
        id: sub.id,
        // Send the status in lowercase as expected by your existing backend logic
        status: newStatus.toLowerCase(),
        current_period_end: nextPaymentDateForBackend,
        // Assuming employee is a list of IDs, ensure it's always an array
        employee: [user?.id].filter(Boolean),
      }).unwrap();

      toast.success(`Subscription for **${sub.name}** updated to **${formattedNewStatus}**`);
    } catch (error) {
      console.error("Failed to update subscription:", error);
      toast.error("Failed to update subscription");
    }
  };

  // ✅ PDF download handler (Unchanged, as it's already well-structured)
  const handleDownload = (sub: Subscription) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    // Header and Title
    doc.setFontSize(28);
    doc.setTextColor("#1f2937");
    doc.text("Subscription Invoice", 40, 50);

    // Client/Subscription Details
    doc.setFontSize(12);
    doc.setTextColor("#374151");
    let y = 80;
    const lineSpacing = 18;

    doc.setFont("helvetica", "bold");
    doc.text("Billed To:", 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${sub.name} (${sub.email})`, 100, y);
    y += lineSpacing;

    doc.setFont("helvetica", "bold");
    doc.text("Subscription ID:", 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${sub.id}`, 140, y);
    y += lineSpacing;

    doc.setFont("helvetica", "bold");
    doc.text("Status:", 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${sub.status}`, 140, y);
    y += lineSpacing;

    doc.setFont("helvetica", "bold");
    doc.text("Location:", 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${sub.location}`, 140, y);
    y += lineSpacing;

    doc.setFont("helvetica", "bold");
    doc.text("Start Date:", 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${formatDateForDisplay(sub.startDate)}`, 140, y);
    y += lineSpacing;

    doc.setFont("helvetica", "bold");
    doc.text("Next Payment:", 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${formatDateForDisplay(sub.nextPayment)}`, 140, y);
    y += lineSpacing;


    // Item Table
    autoTable(doc, {
      startY: y + 20,
      theme: "striped", // Modern theme
      headStyles: {
        fillColor: "#10b981", // Tailwind green-500
        textColor: "#ffffff",
        fontStyle: "bold",
        halign: "center"
      },
      head: [["Description", "Package Name", "Amount"]],
      body: [
        [
          "Monthly/Annual Subscription Fee",
          sub.package,
          "Please refer to your billing portal", // Better text than 'Check billing info'
        ],
      ],
      columnStyles: {
          0: { cellWidth: 200 },
          1: { cellWidth: 150 },
          2: { halign: 'right', cellWidth: 150 },
      }
    });

    doc.save(`invoice_subscription_${sub.id}_${sub.name.replace(/\s/g, '_')}.pdf`);
    toast.info(`Downloading invoice for ${sub.name}...`);
  };

  // --- Rendered Component ---
  return (
    <div className="rounded-xl shadow-2xl border border-gray-100 overflow-hidden bg-white/90 backdrop-blur-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold tracking-wider">
          <tr>
            <th className="px-6 py-4 text-left">Client Details</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-left">Plan Details</th>
            <th className="px-6 py-4 text-left">Dates</th>
            <th className="px-6 py-4 text-center">Actions</th>
            <th className="px-6 py-4 text-center">Invoice</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {paged.map((sub, idx) => (
            <tr
              key={sub.id}
              className={`transition-all duration-300 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50/50`}
            >
              {/* Client Details (Name & Email) */}
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <div className="text-base font-bold text-gray-900 leading-tight">
                    {sub.name}
                  </div>
                  <span className="text-xs text-gray-500 font-medium mt-0.5">
                    {sub.email}
                  </span>
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider min-w-[110px] ${getStatusClasses(
                    sub.status
                  )}`}
                >
                  {sub.status.replace(/_/g, " ")}
                </span>
              </td>

              {/* Plan Details (Location & Package) */}
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

              {/* Dates (Start Date & Next Payment) */}
              <td className="px-6 py-4 space-y-1">
                <div className="flex items-center text-gray-700">
                  <LuCalendarDays className="w-4 h-4 text-green-500 mr-2" />
                  <span className="font-semibold text-xs">Start: {formatDateForDisplay(sub.startDate)}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <LuCalendarDays className="w-4 h-4 text-red-500 mr-2" />
                  <span className="font-medium text-xs">Next: {formatDateForDisplay(sub.nextPayment)}</span>
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-center">
                {/* Pause/Resume Buttons for Active/Paused */}
                {sub.status === "Active" && (
                  <button
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-yellow-500 text-white shadow-md hover:bg-yellow-600 transition-colors flex items-center justify-center gap-1 mx-auto"
                    // onClick={() => handleStatusChange(sub, "Paused")}
                    title="Pause subscription"
                  >
                    <FaPause className="w-3 h-3" /> Pause
                  </button>
                )}
                {sub.status === "Paused" && (
                  <button
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 mx-auto"
                    // onClick={() => handleStatusChange(sub, "Active")}
                    title="Resume subscription"
                  >
                    <FaPlay className="w-3 h-3" /> Resume
                  </button>
                )}

                {/* Dropdown for Past_due and other complex actions */}
                { (sub.status === "Past_due" || sub.status === "Expired" || sub.status === "Pending") && (
                  // <Select
                  //   onValueChange={(value) => handleStatusChange(sub, value)}
                  // >
                  //   <SelectTrigger className="w-[140px] text-xs font-semibold h-9 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50 mx-auto">
                  //     <SelectValue placeholder="Take Action" />
                  //   </SelectTrigger>
                  //   <SelectContent className="bg-white shadow-xl rounded-lg p-1">
                  //       {/* Always offer Resume/Activate if not Active */}
                  //       {sub.status !== "Active" && (
                  //           <SelectItem value="Active" className="flex items-center p-2 rounded-md hover:bg-blue-50 cursor-pointer text-gray-800">
                  //               <FaPlay className="w-3 h-3 mr-2 text-blue-500" /> Resume / Activate
                  //           </SelectItem>
                  //       )}
                  //       {/* Always offer Pause if not Paused */}
                  //       {sub.status !== "Paused" && (
                  //           <SelectItem value="Paused" className="flex items-center p-2 rounded-md hover:bg-yellow-50 cursor-pointer text-gray-800">
                  //               <FaPause className="w-3 h-3 mr-2 text-yellow-500" /> Pause
                  //           </SelectItem>
                  //       )}
                  //       {/* Offer to mark as Expired/End Now */}
                  //       <SelectItem value="Expired" className="flex items-center p-2 rounded-md hover:bg-red-50 cursor-pointer text-red-600">
                  //           <FaRedoAlt className="w-3 h-3 mr-2" /> End Now / Expire
                  //       </SelectItem>
                  //       {/* Option to explicitly mark past due, useful if resuming didn't work */}
                  //        {sub.status !== "Past_due" && (
                  //           <SelectItem value="Past_due" className="flex items-center p-2 rounded-md hover:bg-red-50 cursor-pointer text-gray-800">
                  //               <FaPause className="w-3 h-3 mr-2 text-red-500" /> Mark Past Due
                  //           </SelectItem>
                  //        )}
                  //   </SelectContent>
                  // </Select>

                  "-"
                )}

                {/* Placeholder for Auto-Renew/Pending/Expired (if no dropdown action applies) */}
                {sub.status === "Auto-Renew" && (
                  <span className="text-gray-400 text-xs italic">
                    Auto-managed
                  </span>
                )}
              </td>

              {/* Invoice Download */}
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

      {/* --- Pagination --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50/70">
        <span className="text-sm text-gray-600 mb-2 sm:mb-0 font-medium">
          Showing <span className="font-bold text-gray-800">{paged.length ? (page - 1) * pageSize + 1 : 0}</span> to{" "}
          <span className="font-bold text-gray-800">{(page - 1) * pageSize + paged.length}</span> of <span className="font-bold text-gray-800">{rows.length}</span> results
        </span>
        <div className="flex space-x-3">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            &larr; Previous
          </button>
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            disabled={page * pageSize >= rows.length}
            onClick={() => onPageChange(page + 1)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}