import React, { useState, useEffect } from "react";
import {
  useGetExpensesQuery,
  useUpdateExpenseStatusMutation,
} from "@/redux/features/admin/Expense-request/expenserequest.api";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { Loader2, Search } from "lucide-react";
import { FaEye } from "react-icons/fa";
// import { useToast } from "@/hooks/use-toast";

const ExpenseAdmin = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  // const { toast } = useToast();

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timeout);
  }, [search]);

  // Fetch all expenses
  const { data, isLoading, isError, isFetching } = useGetExpensesQuery({
    page,
    search: debouncedSearch,
  });

  const [updateExpenseStatus, { isLoading: isUpdating }] =
    useUpdateExpenseStatusMutation();

  const expenses = data?.results || [];
  const nextPage = data?.next;
  const prevPage = data?.previous;

  const handleNext = () => {
    if (nextPage) setPage((p) => p + 1);
  };
  const handlePrev = () => {
    if (prevPage && page > 1) setPage((p) => p - 1);
  };
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // ✅ Handle status change
  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateExpenseStatus({ id, status }).unwrap();
      // toast({
      //   title: "Status Updated",
      //   description: `Expense #${id} marked as ${status}.`,
      //   variant: "success",
      // });
    } catch (err: any) {
      // toast({
      //   title: "Error",
      //   description: "Failed to update status.",
      //   variant: "destructive",
      // });
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load expenses 😢
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Expense Requests
        </h2>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by vendor or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableCaption>A list of submitted expense requests</TableCaption>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[60px]">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {expenses.length > 0 ? (
              expenses.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.expense_date}</TableCell>
                  <TableCell>{item.vendor_name}</TableCell>
                  <TableCell>
                    {item.category_show_by_name?.join(", ") || "—"}
                  </TableCell>
                  <TableCell className="max-w-[220px] truncate">
                    {item.discription}
                  </TableCell>
                  <TableCell>${item.amount}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Submitted"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>

                  {/* Action Buttons */}
                  <TableCell className="text-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600 border-blue-600 hover:bg-transparent hover:text-blue-700 transition"
                      onClick={() => setSelectedExpense(item)}
                    >
                      <FaEye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isUpdating}
                      className="text-blue-600 border-blue-600 hover:bg-transparent hover:text-blue-700 transition"
                      onClick={() =>
                        handleStatusChange(item.id, "Approved")
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isUpdating}
                      className="text-blue-600 border-blue-600 hover:bg-transparent hover:text-blue-700 transition"
                      onClick={() =>
                        handleStatusChange(item.id, "Cancel")
                      }
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 text-gray-500"
                >
                  No expenses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={handlePrev}
          disabled={!prevPage || page === 1 || isFetching}
          className={`px-5 ${
            !prevPage || page === 1 || isFetching
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </Button>

        <span className="text-gray-600 font-medium">Page {page}</span>

        <Button
          onClick={handleNext}
          disabled={!nextPage || isFetching || expenses.length === 0}
          className={`px-5 ${
            !nextPage || isFetching || expenses.length === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </Button>
      </div>

      {/* Modal */}
      <Dialog
        open={!!selectedExpense}
        onOpenChange={() => setSelectedExpense(null)}
      >
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Expense Details</DialogTitle>
            <DialogDescription>
              Full details for expense #{selectedExpense?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedExpense && (
            <div className="mt-4 space-y-3 text-sm">
              {Object.entries(selectedExpense).map(([key, value]) => {
                if (["created_at", "updated_at"].includes(key)) return null; // skip duplicate display
                return (
                  <p key={key} className="flex justify-between border-b py-1">
                    <span className="font-medium text-gray-700 capitalize">
                      {key.replaceAll("_", " ")}:
                    </span>
                    <span className="text-gray-800">
                      {Array.isArray(value)
                        ? value.join(", ")
                        : typeof value === "object" && value !== null
                        ? JSON.stringify(value)
                        : value?.toString() || "—"}
                    </span>
                  </p>
                );
              })}

              {/* ✅ Human-readable timestamps */}
              <p className="flex justify-between border-b py-1">
                <span className="font-medium text-gray-700">Created at:</span>
                <span className="text-gray-800">
                  {formatDateTime(selectedExpense.created_at)}
                </span>
              </p>
              <p className="flex justify-between border-b py-1">
                <span className="font-medium text-gray-700">Updated at:</span>
                <span className="text-gray-800">
                  {formatDateTime(selectedExpense.updated_at)}
                </span>
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseAdmin;
