import {
  useDeleteInvoiceMutation,
  useGetOutgoingInvoicesQuery,
  useGetSearchAllInvoiceQuery,
} from "@/redux/features/admin/invoice/invoice.api";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../admin-dashboard/invoice/InvoicePDF";

interface Invoice {
  id: number;
  invoice_id: string;
  vendor_name: string | null;
  type: "outgoing";
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

const ClientInvoicesList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [sort, setSort] = useState("Default");

  const { data: invoicesData, isLoading, isError, isFetching } =
    useGetOutgoingInvoicesQuery(page);

  const {
    data: searchInvoice,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useGetSearchAllInvoiceQuery(search ? `${search}` : "");

  const [deleteInvoice] = useDeleteInvoiceMutation();

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
          (inv.building_name?.toLowerCase() || "").includes(search.toLowerCase()) ||
          (inv.region_name?.toLowerCase() || "").includes(search.toLowerCase()) ||
          (inv.apartment_name?.join(" ").toLowerCase() || "").includes(search.toLowerCase()) ||
          (inv.client_name?.toString() || "").includes(search) ||
          (inv.invoice_id?.toLowerCase() || "").includes(search.toLowerCase()) ||
          (inv.vendor_name?.toLowerCase() || "").includes(search.toLowerCase()) ||
          (inv.note?.toLowerCase() || "").includes(search.toLowerCase())
      );
    } else {
      result = [...invoices];
    }

    if (status !== "All Status") {
      result = result.filter((inv) => inv.status.toLowerCase() === status.toLowerCase());
    }

    if (sort === "Oldest to New") {
      result.sort(
        (a, b) => new Date(a.date_issued).getTime() - new Date(b.date_issued).getTime()
      );
    } else if (sort === "New to Oldest") {
      result.sort(
        (a, b) => new Date(b.date_issued).getTime() - new Date(a.date_issued).getTime()
      );
    }

    setFilteredInvoices(result);
  }, [search, status, sort, invoices, searchInvoice]);

  if (isLoading || isSearchLoading) return <p>Loading...</p>;
  if (isError || isSearchError) return <p>Error fetching invoices.</p>;

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Invoice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64 text-sm"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm"
          >
            <option>All Status</option>
            <option>Paid</option>
            <option>Unpaid</option>
          </select>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm"
        >
          <option>Default</option>
          <option>Oldest to New</option>
          <option>New to Oldest</option>
        </select>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto hidden md:block">
        <table className="min-w-full border bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="p-3 text-left">Invoice ID</th>
              <th className="p-3 text-left">Building</th>
              <th className="p-3 text-left">Region</th>
              <th className="p-3 text-left">Apartment(s)</th>
              <th className="p-3 text-left">Date Issued</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Total Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Download</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{invoice.invoice_id}</td>
                <td className="p-3">{invoice.building_name}</td>
                <td className="p-3">{invoice.region_name}</td>
                <td className="p-3">{invoice.apartment_name?.join(", ")}</td>
                <td className="p-3">{new Date(invoice.date_issued).toLocaleDateString()}</td>
                <td className="p-3">{invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "—"}</td>
                <td className="p-3 font-semibold text-gray-800">{invoice.total_amount.toFixed(2)} SAR</td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    invoice.status.toLowerCase() === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="p-3">
                  <PDFDownloadLink
                    document={<InvoicePDF invoice={invoice} />}
                    fileName={`invoice-${invoice.invoice_id}.pdf`}
                  >
                    <img src={assets.Download} alt="download" className="w-5 h-5 cursor-pointer" />
                  </PDFDownloadLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="grid gap-3 md:hidden mt-4">
        {filteredInvoices.map((invoice) => (
          <div key={invoice.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <p className="font-semibold">#{invoice.invoice_id}</p>
            <p className="text-sm">{invoice.building_name} - {invoice.region_name}</p>
            <p className="text-sm">Apts: {invoice.apartment_name?.join(", ")}</p>
            <p className="text-sm">Issued: {new Date(invoice.date_issued).toLocaleDateString()}</p>
            <p className="text-sm">Due: {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "—"}</p>

            <div className="flex justify-between items-center mt-2">
              <span className={`text-xs px-2 py-1 rounded ${
                invoice.status.toLowerCase() === "paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {invoice.status}
              </span>

              <PDFDownloadLink
                document={<InvoicePDF invoice={invoice} />}
                fileName={`invoice-${invoice.invoice_id}.pdf`}
              >
                <img src={assets.Download} className="w-5 h-5 cursor-pointer" />
              </PDFDownloadLink>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-2">
        <button
          onClick={() => prevPage && setPage((p) => Math.max(p - 1, 1))}
          disabled={!prevPage || isFetching}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            prevPage ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"
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
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            nextPage ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"
          }`}
        >
          Next
        </button>
      </div>

      {filteredInvoices.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No invoices found</p>
      )}
    </>
  );
};

export default ClientInvoicesList;
