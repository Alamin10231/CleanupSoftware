import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  useAddEmployeeExpenseMutation,
  useEditEmployeeExpenseMutation,
  useGetEmployeeInvoiceQuery,
} from "@/redux/features/employee/invoice/invoice.api";

import { useGetCategoryQuery } from "@/redux/features/employee/invoice/category.api";
import { MultiSelect } from "@/Components/ui/multi-select";
import { format } from "date-fns";

interface Invoice {
  id?: number;
  date: string;
  vendor: string;
  category: string;
  amount: number;
  status: "Submitted" | "Approved" | "Pending" | "Cancel";
  type: "Expense" | "Sales";
  description?: string;
  categoryIds?: number[];
}

const EmployeeInvoicees = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [description, setDescription] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "new">("new");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {
    data: apiData,
    isLoading,
    error,
  } = useGetEmployeeInvoiceQuery({
    search,
    page,
  });

  const [uploadExpense, { isLoading: isUploading }] =
    useAddEmployeeExpenseMutation();


    // const [editExpense, { isLoading: isEditing }] = useEditEmployeeExpenseMutation();
    const [editExpense, { isLoading: isEditing }] = useEditEmployeeExpenseMutation();

  const { data: categoryData, isLoading: isLoadingCategories } =
    useGetCategoryQuery();

  useEffect(() => {
    // Reset to first page when search changes
    console.log("Category data changed:", categoryData);
  }, [categoryData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error loading invoices.</div>;

  const invoices: Invoice[] =
    (apiData?.results || []).map((inv: any) => ({
      id: inv.id,
      date: inv.expense_date,
      categoryIds: inv.expense_category,
      vendor: inv.vendor_name,
      category: Array.isArray(inv.category_show_by_name)
        ? inv.category_show_by_name.join(", ")
        : inv.category_show_by_name || "",
      amount: inv.amount,
      status: inv.status as "Submitted" | "Approved" | "Pending" | "Cancel",
      type: "Expense",
      description: inv.discription,
    })) || [];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-100 text-blue-600";
      case "Approved":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Cancel":
        return "bg-red-100 text-red-600";
      default:
        return "";
    }
  };

  // Open modal for editing an existing invoice
  const openEditDialog = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setDescription(invoice.description || "");
    console.log("Selected invoice for editing:", invoice.categoryIds);
    setSelectedCategories((invoice as any).categoryIds);
    setReceiptFile(null);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  // Open modal for creating a new expense
  const openNewExpenseDialog = () => {
    setSelectedInvoice(null);

    setDescription("");
    setReceiptFile(null);
    setModalMode("new");
    setIsModalOpen(true);
  };

  const closeDialog = () => {
    setSelectedInvoice(null);
    setDescription("");
    setReceiptFile(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    console.log("Saving invoice:", selectedInvoice, description, receiptFile);

    if (modalMode === "edit") {
      editExpense({
        id: selectedInvoice?.id,
        vendor_name: selectedInvoice?.vendor || "",
        expense_category: selectedCategories || [],
        expense_date: format(Date.now(), "MM/dd/yyyy"),
        discription: description,
        amount: selectedInvoice?.amount || 0,
      });
      closeDialog();
      return;
    }

    uploadExpense({
      vendor_name: selectedInvoice?.vendor || "",
      expense_category: selectedCategories || [],
      expense_date: format(Date.now(), "MM/dd/yyyy"),
      discription: description,
      amount: selectedInvoice?.amount || 0,
    });
    setSelectedCategories([]);
    closeDialog();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Button onClick={openNewExpenseDialog}>
          <FiPlus /> Upload Expense
        </Button>
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
            {invoices.length > 0 ? (
              invoices.map((invoice, index) => (
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
                    <Button
                      variant="outline"
                      disabled={invoice.status !== "Pending"}
                      onClick={() => openEditDialog(invoice)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
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
          onClick={() => apiData?.previous && setPage(page - 1)}
          disabled={!apiData?.previous}
          className="px-4 py-2 font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-600"
        >
          Previous
        </Button>

        <span className="px-3 py-1 font-medium">
          Page {page} of {Math.ceil(apiData?.count / 10) || 1}
        </span>

        <Button
          onClick={() => apiData?.next && setPage(page + 1)}
          disabled={!apiData?.next}
          className="px-4 py-2 font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-600"
        >
          Next
        </Button>
      </div>

      {/* Single Modal for Editing or Uploading */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[825px] md:min-h-[700px]">
          <DialogHeader>
            <DialogTitle>
              {modalMode === "edit" ? "Edit Invoice" : "Upload Expense"}
            </DialogTitle>
            <DialogDescription>
              {modalMode === "edit"
                ? "Update the details of this invoice."
                : "Fill out the details to upload a new expense."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="vendor">Vendor Name</Label>
                <Input
                  id="vendor"
                  value={selectedInvoice?.vendor || ""}
                  placeholder={modalMode === "new" ? "Enter vendor name" : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedInvoice((prev) =>
                      prev
                        ? ({ ...prev, vendor: value } as any)
                        : {
                            vendor: value,
                            category: "",
                            amount: 0,
                            status: "Pending",
                            type: "Expense",
                          }
                    );
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Expense Category</Label>
                {!isLoadingCategories && (
                  <MultiSelect
                    onValueChange={(values) => setSelectedCategories(values)}
                    value={selectedCategories}
                    defaultValue={selectedCategories}
                    options={categoryData.map((c: any) => ({
                      value: c.id,
                      label: c.name,
                    }))}
                  />
                )}
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={selectedInvoice?.amount || ""}
                placeholder={modalMode === "new" ? "Enter amount" : ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setSelectedInvoice((prev) =>
                    prev
                      ? ({ ...prev, amount: value } as any)
                      : {
                          vendor: "",
                          category: "",
                          amount: value,
                          status: "Pending",
                          type: "Expense",
                        }
                  );
                }}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description/Notes</Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-lg min-h-[150px]"
                placeholder={
                  modalMode === "new" ? "Enter description or notes" : ""
                }
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
              <input
                id="receipt"
                type="file"
                className="hidden"
                onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
              />
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
            <Button onClick={handleSave}>{modalMode==="edit" ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeInvoicees;
