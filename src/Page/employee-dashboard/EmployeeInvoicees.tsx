import { useEffect, useState } from "react";
import Button from "@/Components/Button";
import { FiPlus } from "react-icons/fi";
import UploadExpenseModal from "@/Components/UploadExpenseModal";

interface Invoice {
  date: string;
  vendor: string;
  category: string;
  amount: number;
  status: "Submitted" | "Approved" | "Pending";
  type: "Expense" | "Sales";
}

const EmployeeInvoicees = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetch("/employeeinvoices.json")
      .then((res) => res.json())
      .then((data) => setInvoices(data));
  }, []);

  const getStatusClass = (status: string) => {
    if (status === "Submitted") {
      return "bg-blue-100 text-blue-600";
    } else if (status === "Approved") {
      return "bg-green-100 text-green-600";
    } else if (status === "Pending") {
      return "bg-yellow-100 text-yellow-600";
    } else {
      return "";
    }
  };

  // Filter invoices by tab + search
  const filteredInvoices = invoices.filter((inv) => {
    const matchesTab =
      activeTab === "All" ? true : inv.type === activeTab;
    const matchesSearch =
      inv.vendor.toLowerCase().includes(search.toLowerCase()) ||
      inv.category.toLowerCase().includes(search.toLowerCase()) ||
      inv.status.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div>
      {/* Header with Upload button */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <Button
            icon={<FiPlus />}
            text="Upload Expense"
            onClick={() => setIsModalOpen(true)} // open modal
          />
        </div>

        {/* Modal */}
        <UploadExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-4">
        {["All", "Expense", "Sales"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-medium ${activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
              }`}
          >
            {tab} Invoices
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by vendor, category or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Invoice Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Vendor</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{invoice.date}</td>
                <td className="px-4 py-2">{invoice.vendor}</td>
                <td className="px-4 py-2">{invoice.category}</td>
                <td className="px-4 py-2">${invoice.amount.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                      invoice.status
                    )}`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-4 py-2">{invoice.type}</td>
                <td className="px-4 py-2 text-blue-600 cursor-pointer">
                  View
                </td>
              </tr>
            ))}

            {/* Show message when no results */}
            {filteredInvoices.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-gray-600 py-4"
                >
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeInvoicees;
