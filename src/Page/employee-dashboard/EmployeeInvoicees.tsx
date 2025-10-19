import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { useGetEmployeeInvoiceQuery } from "@/redux/api/apiSlice";
import { Button } from "@/Components/ui/button";

interface Invoice {
  date: string;
  vendor: string;
  category: string;
  amount: number;
  status: "Submitted" | "Approved" | "Pending";
  type: "Expense" | "Sales";
  description?: string;
}

const EmployeeInvoicees = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [description, setDescription] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  // Server-side search
  const { data: apiData, isLoading } = useGetEmployeeInvoiceQuery(search);

  if (isLoading) return <div>Loading...</div>;

  // Map API response to Invoice
  const allInvoices: Invoice[] =
    apiData?.results.map((inv) => ({
      date: inv.expense_date,
      vendor: inv.vendor_name,
      category: inv.category_show_by_name.join(", "),
      amount: inv.amount,
      status: inv.status as "Submitted" | "Approved" | "Pending",
      type: "Expense",
      description: inv.discription,
    })) || [];

  // Client-side pagination
  const pageSize = 10;
  const totalPages = Math.ceil(allInvoices.length / pageSize);
  const invoices = allInvoices.slice((page - 1) * pageSize, page * pageSize);

  const getStatusClass = (status: string) => {
    if (status === "Submitted") return "bg-blue-100 text-blue-600";
    if (status === "Approved") return "bg-green-100 text-green-600";
    if (status === "Pending") return "bg-yellow-100 text-yellow-600";
    if (status === "Cancel") return "bg-red-100 text-red-600";
    return "";
  };

  const openDialog = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setDescription(invoice.description || "");
    setIsModalOpen(true);
  };

  const closeDialog = () => {
    setSelectedInvoice(null);
    setDescription("");
    setReceiptFile(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    if (selectedInvoice) {
      // TODO: API call to save updates
      closeDialog();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // reset page on new search
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <FiPlus /> Upload Expense
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-4">
        {["All", "Expense", "Sales"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            {tab} Invoices
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by vendor, category or status..."
          value={search}
          onChange={handleSearchChange}
          className="w-full md:w-1/3"
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
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
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
                <td className="px-4 py-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => openDialog(invoice)}
                      >
                        View/Edit
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px] md:max-w-[825px] md:min-h-[700px]">
                      <DialogHeader>
                        <DialogTitle>Edit Invoice</DialogTitle>
                        <DialogDescription>
                          Update the details of this invoice.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-3">
                            <Label htmlFor="vendor">Vendor Name</Label>
                            <Input
                              id="vendor"
                              value={selectedInvoice?.vendor || ""}
                              onChange={(e) =>
                                setSelectedInvoice((prev) => ({
                                  ...prev!,
                                  vendor: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="category">Expense Category</Label>
                            <Input
                              id="category"
                              value={selectedInvoice?.category || ""}
                              onChange={(e) =>
                                setSelectedInvoice((prev) => ({
                                  ...prev!,
                                  category: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div className="grid gap-3">
                          <Label htmlFor="amount">Amount</Label>
                          <Input
                            id="amount"
                            type="number"
                            value={selectedInvoice?.amount || ""}
                            onChange={(e) =>
                              setSelectedInvoice((prev) => ({
                                ...prev!,
                                amount: parseFloat(e.target.value),
                              }))
                            }
                          />
                        </div>

                        <div className="grid gap-3">
                          <Label htmlFor="description">Description/Notes</Label>
                          <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded-lg min-h-[150px]"
                          />
                        </div>

                        <div className="grid gap-3 border-dotted border-gray-200 border-3 text-center py-4">
                          <Label className="text-lg font-bold">Attach Receipt</Label>

                          {receiptFile && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                {receiptFile.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => setReceiptFile(null)}
                                className="text-sm text-red-600 hover:text-red-800"
                              >
                                Remove
                              </button>
                            </div>
                          )}

                          <div className="text-sm text-black mt-2">
                            Accepted formats: PDF, JPG, PNG. Max size: 5MB
                          </div>

                          <label
                            htmlFor="receipt"
                            className="cursor-pointer px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                          >
                            Upload File
                          </label>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSave}>Submit</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}

            {invoices.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-600 py-4">
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4 items-center">
  <Button
    onClick={() => handlePageChange(page - 1)}
    disabled={page === 1}
    className={`px-4 py-2  font-semibold ${
      page === 1
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
  >
    Previous
  </Button>

  <span className="px-3 py-1 font-medium">
    Page {page} of {totalPages}
  </span>

  <Button
    onClick={() => handlePageChange(page + 1)}
    disabled={page === totalPages || invoices.length === 0}
    className={`px-4 py-2  font-semibold ${
      page === totalPages || invoices.length === 0
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
  >
    Next
  </Button>
</div>

    </div>
  );
};

export default EmployeeInvoicees;
