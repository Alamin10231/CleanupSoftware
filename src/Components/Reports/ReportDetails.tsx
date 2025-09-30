import { useState } from "react";
import { FiFileText } from "react-icons/fi";

type Subscription = {
  code: string;
  client: string;
  apartment: string;
  package: string;
  status: "Active" | "Pending" | "Expired";
  nextBilling: string;
};

const sampleData: Subscription[] = [
  { code: "SUB-001", client: "John Smith", apartment: "A-101", package: "Premium", status: "Active", nextBilling: "2024-02-15" },
  { code: "SUB-002", client: "Sarah Johnson", apartment: "B-205", package: "Basic", status: "Pending", nextBilling: "2024-01-28" },
  { code: "SUB-003", client: "Mike Wilson", apartment: "C-312", package: "Standard", status: "Expired", nextBilling: "2024-01-10" },
  { code: "SUB-004", client: "Emily Davis", apartment: "D-408", package: "Premium", status: "Active", nextBilling: "2024-03-01" },
  { code: "SUB-005", client: "Robert Brown", apartment: "A-503", package: "Basic", status: "Active", nextBilling: "2024-02-20" },
];

export default function ReportDetails() {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const paged = sampleData.slice((page - 1) * pageSize, page * pageSize);

  const statusColors: Record<string, string> = {
    Active: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Expired: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg my-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Subscription Report</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Schedule Report</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-medium">
            <tr>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Apartment</th>
              <th className="px-4 py-3 text-left">Package</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Next Billing</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {paged.map((sub) => (
              <tr key={sub.code} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3  font-bold">{sub.code}</td>
                <td className="px-4 py-3 text-gray-500">{sub.client}</td>
                <td className="px-4 py-3 text-gray-500">{sub.apartment}</td>
                <td className="px-4 py-3 text-gray-500">{sub.package}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[sub.status]}`}>
                    {sub.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{sub.nextBilling}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FiFileText size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <span className="text-gray-500">
          Showing {(page - 1) * pageSize + 1} to {(page - 1) * pageSize + paged.length} of {sampleData.length} results
        </span>
        <div className="space-x-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page * pageSize >= sampleData.length}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
