import { useState, useEffect, useCallback } from "react";
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
import { Eye, Loader2, Search } from "lucide-react";
import { FaEye } from "react-icons/fa";
import { toast } from "sonner";

// Types
type ExpenseStatus = "Approved" | "Submitted" | "Cancel";

interface Expense {
  id: number;
  expense_date: string;
  vendor_name: string;
  category_show_by_name?: string[];
  discription: string;
  amount: number;
  status: ExpenseStatus;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

interface ExpenseListResponse {
  results: Expense[];
  next: string | null;
  previous: string | null;
}

// Constants
const DEBOUNCE_DELAY = 500;
const STATUS_COLORS: Record<ExpenseStatus, string> = {
  Approved: "bg-green-100 text-green-800",
  Submitted: "bg-yellow-100 text-yellow-800",
  Cancel: "bg-red-100 text-red-800",
};

// Utility Functions
const formatDateTime = (dateString: string): string => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
};

const formatFieldName = (key: string): string => {
  return key.replaceAll("_", " ");
};

const formatFieldValue = (value: any): string => {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return value?.toString() || "—";
};

// Components
interface StatusBadgeProps {
  status: ExpenseStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge className={STATUS_COLORS[status] || "bg-gray-100 text-gray-800"}>
      {status}
    </Badge>
  );
}

interface ExpenseActionsProps {
  expense: Expense;
  isUpdating: boolean;
  onView: (expense: Expense) => void;
  onStatusChange: (id: number, status: ExpenseStatus) => void;
}

function ExpenseActions({
  expense,
  isUpdating,
  onView,
  onStatusChange,
}: ExpenseActionsProps) {
  return (
    <div className="flex justify-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => onView(expense)}
      >
        <Eye />
      </Button>
      <Button
        size="sm"
        disabled={isUpdating || expense.status !== "Submitted"}
        onClick={() => onStatusChange(expense.id, "Approved")}
      >
        Approve
      </Button>
      <Button
        size="sm"
        variant="destructive"
        disabled={isUpdating || expense.status !== "Submitted"}
        onClick={() => onStatusChange(expense.id, "Cancel")}
      >
        Cancel
      </Button>
    </div>
  );
}

interface ExpenseDetailsModalProps {
  expense: Expense | null;
  onClose: () => void;
}

function ExpenseDetailsModal({ expense, onClose }: ExpenseDetailsModalProps) {
  if (!expense) return null;

  const excludedFields = ["created_at", "updated_at"];

  return (
    <Dialog open={!!expense} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Expense Details</DialogTitle>
          <DialogDescription>
            Full details for expense #{expense.id}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3 text-sm">
          {Object.entries(expense).map(([key, value]) => {
            if (excludedFields.includes(key)) return null;

            return (
              <div
                key={key}
                className="flex justify-between border-b py-2 gap-4"
              >
                <span className="font-medium text-gray-700 capitalize min-w-[120px]">
                  {formatFieldName(key)}:
                </span>
                <span className="text-gray-800 text-right break-words">
                  {formatFieldValue(value)}
                </span>
              </div>
            );
          })}

          <div className="flex justify-between border-b py-2 gap-4">
            <span className="font-medium text-gray-700 min-w-[120px]">
              Created at:
            </span>
            <span className="text-gray-800 text-right">
              {formatDateTime(expense.created_at)}
            </span>
          </div>

          <div className="flex justify-between border-b py-2 gap-4">
            <span className="font-medium text-gray-700 min-w-[120px]">
              Updated at:
            </span>
            <span className="text-gray-800 text-right">
              {formatDateTime(expense.updated_at)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface PaginationControlsProps {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  isLoading: boolean;
  onNext: () => void;
  onPrev: () => void;
}

function PaginationControls({
  page,
  hasNext,
  hasPrev,
  isLoading,
  onNext,
  onPrev,
}: PaginationControlsProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <Button
        onClick={onPrev}
        disabled={!hasPrev || isLoading}
        variant={hasPrev && !isLoading ? "default" : "secondary"}
        className="px-5"
      >
        Previous
      </Button>

      <span className="text-gray-600 font-medium">Page {page}</span>

      <Button
        onClick={onNext}
        disabled={!hasNext || isLoading}
        variant={hasNext && !isLoading ? "default" : "secondary"}
        className="px-5"
      >
        Next
      </Button>
    </div>
  );
}

// Main Component
export default function ExpenseAdmin() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), DEBOUNCE_DELAY);
    return () => clearTimeout(timeout);
  }, [search]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // API Hooks
  const { data, isLoading, isError, isFetching } = useGetExpensesQuery({
    page,
    search: debouncedSearch,
  });

  const [updateExpenseStatus, { isLoading: isUpdating }] =
    useUpdateExpenseStatusMutation();

  // Data
  const expenses = data?.results || [];
  const hasNext = !!data?.next;
  const hasPrev = !!data?.previous && page > 1;

  // Handlers
  const handleNext = useCallback(() => {
    if (hasNext) setPage((p) => p + 1);
  }, [hasNext]);

  const handlePrev = useCallback(() => {
    if (hasPrev) setPage((p) => p - 1);
  }, [hasPrev]);

  const handleStatusChange = useCallback(
    async (id: number, status: ExpenseStatus) => {
      try {
        await updateExpenseStatus({ id, status }).unwrap();
        toast.success(`Expense #${id} marked as ${status}.`);
      } catch (error) {
        toast.error("Failed to update status. Please try again.");
        console.error("Error updating expense status:", error);
      }
    },
    [updateExpenseStatus]
  );

  const handleViewExpense = useCallback((expense: Expense) => {
    setSelectedExpense(expense);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedExpense(null);
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-red-500 text-lg font-medium">
          Failed to load expenses
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Please try refreshing the page
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
      <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              {/* <TableHead className="w-[60px]">ID</TableHead> */}
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
              expenses.map((expense) => (
                <TableRow key={expense.id}>
                  {/* <TableCell className="font-medium">{expense.id}</TableCell> */}
                  <TableCell>{expense.expense_date}</TableCell>
                  <TableCell>{expense.vendor_name}</TableCell>
                  <TableCell>
                    {expense.category_show_by_name?.join(", ") || "—"}
                  </TableCell>
                  <TableCell className="max-w-[220px] truncate">
                    {expense.discription}
                  </TableCell>
                  <TableCell>${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <StatusBadge status={expense.status} />
                  </TableCell>
                  <TableCell>
                    <ExpenseActions
                      expense={expense}
                      isUpdating={isUpdating}
                      onView={handleViewExpense}
                      onStatusChange={handleStatusChange}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  {search ? "No expenses found matching your search." : "No expenses found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <PaginationControls
        page={page}
        hasNext={hasNext}
        hasPrev={hasPrev}
        isLoading={isFetching}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* Modal */}
      <ExpenseDetailsModal
        expense={selectedExpense}
        onClose={handleCloseModal}
      />
    </div>
  );
}
