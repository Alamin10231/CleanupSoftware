import {
   useDeleteInvoiceMutation,
  useGetInvoicesQuery,
  useGetSearchAllInvoiceQuery,
} from "@/redux/features/admin/invoice/invoice.api";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

interface Invoice {
  id: number;
  invoice_id: string;
  vendor_name: string | null;
  type: "incoming" | "outgoing";
  date_issued: string;
  due_date: string | null;
  client_name: string | null;
  building_name: string;
  region_name: string;
  status: string;
  total_amount: number;
  note: string;
  plan: number;
  apartments: number[];
  apartment_name: string[];
  vendor: string | null;
  vendor_invoice_file: string | null;
  line_items: any[];
  file: string | null;
}

const InvoicesList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [sort, setSort] = useState("Default");

  const {
    data: invoicesData,
    isLoading,
    isError,
    isFetching,
  } = useGetInvoicesQuery(`?page=${page}`);
  const {
    data: searchInvoice,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useGetSearchAllInvoiceQuery(search ? `${search}` : "");
  const [deleteInvoice] = useDeleteInvoiceMutation()
  const invoices = invoicesData?.results || [];
  const totalCount = invoicesData?.count || 0;
  const nextPage = invoicesData?.next;
  const prevPage = invoicesData?.previous;

  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    let result: Invoice[] = [];

    if (search.trim() !== "") {
      result = searchInvoice?.results || invoices || [];
      result = result.filter(
        (inv) =>
          (inv.building_name?.toLowerCase() || "").includes(
            search.toLowerCase()
          ) ||
          (inv.region_name?.toLowerCase() || "").includes(
            search.toLowerCase()
          ) ||
          (inv.apartment_name?.join(" ").toLowerCase() || "").includes(
            search.toLowerCase()
          ) ||
          (inv.client_name?.toString() || "").includes(search) ||
          (inv.invoice_id?.toLowerCase() || "").includes(
            search.toLowerCase()
          ) ||
          (inv.vendor_name?.toLowerCase() || "").includes(
            search.toLowerCase()
          ) ||
          (inv.note?.toLowerCase() || "").includes(search.toLowerCase())
      );
    } else {
      result = [...invoices];
    }

    // Apply status filter
    if (status !== "All Status") {
      result = result.filter(
        (inv) => inv.status.toLowerCase() === status.toLowerCase()
      );
    }

    // Apply sorting
    if (sort === "Oldest to New") {
      result.sort(
        (a, b) =>
          new Date(a.date_issued).getTime() - new Date(b.date_issued).getTime()
      );
    } else if (sort === "New to Oldest") {
      result.sort(
        (a, b) =>
          new Date(b.date_issued).getTime() - new Date(a.date_issued).getTime()
      );
    }

    setFilteredInvoices(result);
  }, [search, status, sort, invoices, searchInvoice]);

  const handleDownload = (invoice: Invoice) => {
   //  toast.loading("Dowloading Invoice...")
  };

  const handleDelete = async (invoice: Invoice) => {
   try {
      await deleteInvoice(invoice.id).unwrap();
      toast.success(`Invoice ${invoice.invoice_id} deleted`);
   } catch (error) {
      toast.error(`Failed to delete invoice ${invoice}`);
      // console.error(error);
   }
  };

  if (isLoading || isSearchLoading) return <p>Loading...</p>;
  if (isError || isSearchError) return <p>Error fetching invoices.</p>;

  return (
    <>
      {/* Filters */}
      <div className="flex items-center justify-between gap-4 mt-8">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search Invoice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          >
            <option>All Status</option>
            <option>Paid</option>
            <option>Unpaid</option>
          </select>
        </div>

        <div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          >
            <option>Default</option>
            <option>Oldest to New</option>
            <option>New to Oldest</option>
          </select>
        </div>
      </div>

      {/* Table List */}
      <div className="overflow-x-auto mt-6">
        {filteredInvoices.length > 0 ? (
          <>
            <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
              <thead className="bg-gray-100 border-b border-gray-300 text-gray-700 text-sm">
                <tr>
                  <th className="p-3 text-left">Invoice ID</th>
                  <th className="p-3 text-left">Building</th>
                  <th className="p-3 text-left">Region</th>
                  <th className="p-3 text-left">Apartment(s)</th>
                  <th className="p-3 text-left">Client</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Date Issued</th>
                  <th className="p-3 text-left">Due Date</th>
                  <th className="p-3 text-left">Total Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-semibold text-gray-700">
                      {invoice.invoice_id}
                    </td>
                    <td className="p-3">{invoice.building_name}</td>
                    <td className="p-3">{invoice.region_name}</td>
                    <td className="p-3">
                      {invoice.apartment_name?.join(", ") || "N/A"}
                    </td>
                    <td className="p-3">{invoice.client_name ?? "N/A"}</td>
                    <td className="p-3 capitalize">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.type === "incoming"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {invoice.type}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(invoice.date_issued).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      {invoice.due_date
                        ? new Date(invoice.due_date).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-3 font-semibold text-gray-800">
                      {invoice.total_amount.toFixed(2)} SAR
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.status.toLowerCase() === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={assets.Download}
                        alt="download"
                        className="cursor-pointer w-5 h-5"
                        onClick={() => handleDownload(invoice)}
                      />

                      {/* Delete Alert Dialog */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="bg-white text-red-600 hover:bg-red-50 transition">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Invoice</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete invoice{" "}
                              <span className="font-semibold">
                                {invoice.invoice_id}
                              </span>
                              ? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(invoice)}
                              >
                                Delete
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4 px-2">
              <button
                onClick={() => prevPage && setPage((p) => Math.max(p - 1, 1))}
                disabled={!prevPage || isFetching}
                className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium ${
                  prevPage
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page} of {Math.ceil(totalCount / 10)}
              </span>

              <button
                onClick={() => nextPage && setPage((p) => p + 1)}
                disabled={!nextPage || isFetching}
                className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium ${
                  nextPage
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-6">No invoices found</p>
        )}
      </div>
    </>
  );
};

export default InvoicesList;
