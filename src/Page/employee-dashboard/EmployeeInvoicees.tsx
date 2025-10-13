import { useState, useEffect } from "react";
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
import { Button } from "@/Components/ui/button";
import clsx from 'clsx';

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
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [description, setDescription] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

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
    const matchesTab = activeTab === "All" ? true : inv.type === activeTab;
    const matchesSearch =
      inv.vendor.toLowerCase().includes(search.toLowerCase()) ||
      inv.category.toLowerCase().includes(search.toLowerCase()) ||
      inv.status.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const openDialog = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const closeDialog = () => {
    setSelectedInvoice(null);
    setDescription(""); // Reset description
    setReceiptFile(null); // Reset file input
    setIsModalOpen(false);
  };

  const handleSave = () => {
    if (selectedInvoice) {
      const updatedInvoices = invoices.map((inv) =>
        inv.date === selectedInvoice.date ? selectedInvoice : inv
      );
      setInvoices(updatedInvoices);
      closeDialog();
    }
  };

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
                <td className="px-4 py-2 ">
                  <div className="">
                    <Dialog >
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
                      <div className="grid  gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-3">
                          <Label htmlFor="vendor">Vendor Name</Label>
                          <Input
                            id="vendor"
                            name="vendor"
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
                          <Label htmlFor="category"> Expense Category</Label>
                          <Input
                            id="category"
                            name="category"
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
                            name="amount"
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
  <Label htmlFor="status">Status</Label>
  <select
    id="status"
    name="status"
    value={selectedInvoice?.status || ""}
    onChange={(e) => {
      setSelectedInvoice((prev) => ({
        ...prev!,
        status: e.target.value as "Submitted" | "Approved" | "Pending", // Casting the value to ensure it's valid
      }));
    }}
    className="w-full p-2 border rounded-lg"
  >
    <option value="Submitted">Submitted</option>
    <option value="Approved">Approved</option>
    <option value="Pending">Pending</option>
  </select>
</div>

                        {/* Description/Notes */}
                        <div className="grid gap-3">
                          <Label htmlFor="description">Description/Notes</Label>
                          <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded-lg min-h-[150px]"
                            placeholder="Type & Enter"
                            
                          />
                        </div>
                        {/* File Upload */}
                        <div className="grid gap-3 border-dotted border-gray-200 border-3 text-center items-center justify-center py-4">
  <Label htmlFor="receipt" className="text-center mx-auto text-lg font-bold text-black ">
    Attach Receipt
  </Label>
  <div className="flex items-center gap-4 bg-red-400">
    
   
 
    
  </div>

  {/* Show selected file */}
  {receiptFile && (
    <div className=" flex items-center justify-between">
      <span className="text-sm text-gray-500">{receiptFile.name}</span>
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
                        <Button type="button" onClick={handleSave}>
                          Submit
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  </div>
                </td>
              </tr>
            ))}

            {/* Show message when no results */}
            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-600 py-4">
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
