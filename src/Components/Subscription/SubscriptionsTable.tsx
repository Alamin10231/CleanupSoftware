import { FaPause, FaPlay } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { MdOutlineFileDownload } from "react-icons/md";
// import { SlActionRedo } from "react-icons/sl";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
import { toast } from "sonner";
import { useUpdateSubscriptionMutation } from "@/redux/features/admin/subscription/subscription.api";
import { useSelector } from "react-redux";

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

// Helper to format date for backend (yyyy-mm-dd)
const formatDateForBackend = (dateStr: string) => {
  const [day, month, year] = dateStr.split("-");
  return `${year}-${month}-${day}`;
};

// Helper to format date for display (YYYY-MM-DD)
const formatDateForDisplay = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-");
  return `${year}-${month}-${day}`;
};

// Helper function to get status badge classes
const getStatusClasses = (status: SubscriptionStatus) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Auto-Renew":
      return "bg-blue-100 text-blue-800";
    case "Paused":
      return "bg-gray-100 text-gray-800";
    case "Expired":
    case "Past_due":
    default:
      return "bg-red-100 text-red-800";
  }
};


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
    try {
      await updateSubscription({
        id: sub.id,
        status: newStatus.toLowerCase(),
        current_period_end:
          newStatus === "paused"
            ? new Date().toISOString().slice(0, 10)
            : formatDateForBackend(sub.nextPayment),
        employee: [user?.id],
      }).unwrap();

      toast.success(`Subscription "${sub.name}" updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update subscription:", error);
      toast.error("Failed to update subscription");
    }
  };

  // ✅ PDF download handler
  const handleDownload = (sub: Subscription) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    doc.setFontSize(22);
    doc.setTextColor("#1f2937");
    doc.text("Invoice", 40, 50);

    doc.setFontSize(12);
    doc.setTextColor("#374151");
    doc.text(`Subscription ID: ${sub.id}`, 40, 80);
    doc.text(`Client Name: ${sub.name}`, 40, 100);
    doc.text(`Email: ${sub.email}`, 40, 120);
    doc.text(`Status: ${sub.status}`, 40, 140);
    doc.text(`Location: ${sub.location}`, 40, 160);
    doc.text(`Start Date: ${formatDateForDisplay(sub.startDate)}`, 40, 180);
    doc.text(`Next Payment: ${formatDateForDisplay(sub.nextPayment)}`, 40, 200);

    autoTable(doc, {
      startY: 230,
      theme: "grid",
      headStyles: {
        fillColor: "#2563eb",
        textColor: "#ffffff",
        fontStyle: "bold",
      },
      head: [["Item", "Amount"]],
      body: [[sub.package, "Check billing info"]],
    });

    doc.save(`invoice_subscription_${sub.id}.pdf`);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wide">
          <tr>
            <th className="px-6 py-3 text-left">Client</th>
            {/* 🌟 NEW STATUS COLUMN */}
            <th className="px-6 py-3 text-center">Status</th> 
            <th className="px-6 py-3 text-left">Location</th>
            <th className="px-6 py-3 text-left">Package</th>
            <th className="px-6 py-3 text-left">Start Date</th>
            {/* Renamed Actions column for clarity */}
            <th className="px-6 py-3 text-center">Actions</th> 
            <th className="px-6 py-3 text-left">Next Payment</th>
            <th className="px-6 py-3 text-center">Invoice</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {paged.map((sub, idx) => (
            <tr
              key={sub.id}
              className={`transition-colors duration-300 ${
                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50`}
            >
              {/* Client */}
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <div className="text-lg font-semibold text-gray-900">
                    {sub.name}
                  </div>
                  <span className="text-xs text-gray-500">{sub.email}</span>
                </div>
              </td>

              {/* 🌟 NEW STATUS CELL */}
              <td className="px-6 py-4 text-center">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold w-full max-w-[120px] mx-auto ${getStatusClasses(sub.status)}`}
                >
                    {sub.status}
                </span>
              </td>

              {/* Location */}
              <td className="px-6 py-4 text-gray-700">{sub.location}</td>

              {/* Package */}
              <td className="px-6 py-4 text-gray-700">{sub.package}</td>

              {/* Start Date */}
              <td className="px-6 py-4 text-gray-700">
                {formatDateForDisplay(sub.startDate)}
              </td>

              {/* Actions (Moved status badge out, kept actions) */}
              <td className="px-6 py-4 text-center space-y-2">
                {/* Actions based on Status */}
                {sub.status === "Active" && (
                  <button
                    className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors flex items-center justify-center gap-1 mx-auto"
                    onClick={() => handleStatusChange(sub, "Paused")}
                    title="Pause subscription"
                  >
                    <FaPause className="w-4 h-4" /> Pause
                  </button>
                )}
               
{sub.status === "Paused" && (
  <button
    className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 mx-auto"
    onClick={() => handleStatusChange(sub, "Active")} // Changed 'resumed' to 'Active' based on typical flow
    title="Resume subscription"
  >
    <FaPlay className="w-4 h-4" /> Resume
  </button>
)}
{/* || sub.status === "" */}
                {(sub.status === "Past_due" ) && (
                  // <Select
                  //   onValueChange={(value) => handleStatusChange(sub, value)}
                  // >
                  //   <SelectTrigger className="w-[130px] flex items-center justify-between mx-auto">
                  //     <SelectValue placeholder="Action" />
                  //   </SelectTrigger>
                  //   <SelectContent>
                  //     {sub.status === "Past_due" ? (
                  //       <>
                  //         <SelectItem value="Active">
                  //           <FaPlay className="w-4 h-4 mr-2" /> Resume
                  //         </SelectItem>
                  //         <SelectItem value="Expired">
                  //           <SlActionRedo className="w-4 h-4 mr-2" /> End Now
                  //         </SelectItem>
                  //         <SelectItem value="Past_due">
                  //           <FaPause className="w-4 h-4 mr-2" /> Mark Past Due
                  //         </SelectItem>
                  //       </>
                  //     ) : ( // sub.status === "Past_due"
                  //       <>
                  //         <SelectItem value="Active">
                  //           <FaPlay className="w-4 h-4 mr-2" /> Resume
                  //         </SelectItem>
                  //         <SelectItem value="Paused">
                  //           <FaPause className="w-4 h-4 mr-2" /> Pause
                  //         </SelectItem>
                  //         <SelectItem value="Expired">
                  //           <SlActionRedo className="w-4 h-4 mr-2" /> End Now
                  //         </SelectItem>
                  //       </>
                  //     )}
                  //   </SelectContent>
                  // </Select>
                  "-"
                )}
                {/* Add a placeholder if no action is immediately available */}
                {sub.status !== "Active" && sub.status !== "Paused" && sub.status !== "Past_due" && (
                     <span className="text-gray-400 text-xs">No action needed</span>
                )}
              </td>

              {/* Next Payment */}
              <td className="px-6 py-4 text-gray-700">
                {formatDateForDisplay(sub.nextPayment)}
              </td>

              {/* Invoice */}
              <td className="px-6 py-4 text-center">
                {sub.invoice ? (
                  <button
                    onClick={() => handleDownload(sub)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Download Invoice"
                  >
                    <MdOutlineFileDownload className="w-6 h-6 mx-auto" />
                  </button>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-4 py-2 border-t border-gray-200">
        <span className="text-sm text-gray-600 mb-2 sm:mb-0">
          Showing {paged.length ? (page - 1) * pageSize + 1 : 0} to{" "}
          {(page - 1) * pageSize + paged.length} of {rows.length} results
        </span>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
            disabled={page * pageSize >= rows.length}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}