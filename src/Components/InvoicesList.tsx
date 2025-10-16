import React, { useEffect, useState } from "react";
import { useGetInvoicesQuery } from "@/redux/api/apiSlice";

interface Invoice {
  invoice_id: string;
  type: "incoming" | "outgoing";
  date_issued: string;
  due_date: string | null;
  client: number | null;
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
  const { data: invoicesData, isLoading, isError } = useGetInvoicesQuery(undefined);
  const invoices = invoicesData?.results || invoicesData || [];

  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [paymentMethod, setPaymentMethod] = useState("All");
  const [sort, setSort] = useState("Default");

  useEffect(() => {
    let result: Invoice[] = [...invoices];

    // Search filter
    if (search.trim() !== "") {
      result = result.filter(
        (inv) =>
          (inv.building_name?.toLowerCase() || "").includes(search.toLowerCase()) ||
          (inv.region_name?.toLowerCase() || "").includes(search.toLowerCase()) ||
          (inv.apartment_name?.join(" ").toLowerCase() || "").includes(search.toLowerCase()) ||
          (inv.client?.toString() || "").includes(search)
      );
    }

    // Status filter
    if (status !== "All Status") {
      result = result.filter((inv) => inv.status.toLowerCase() === status.toLowerCase());
    }

    // Payment filter
    if (paymentMethod !== "All") {
      result = result.filter((inv) => inv.type.toLowerCase() === paymentMethod.toLowerCase());
    }

    // Sorting
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
  }, [search, status, paymentMethod, sort, invoices]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching invoices.</p>;

  return (
    <>
      {/* Filters */}
      <div className="flex items-center justify-between gap-4 mt-8 p-6 bg-white border border-gray-300 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search Invoice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          >
            <option>All Status</option>
            <option>Paid</option>
            <option>Unpaid</option>
          </select>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          >
            <option>All</option>
            <option value="incoming">Incoming</option>
            <option value="outgoing">Outgoing</option>
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
                {/* <th className="p-3 text-left">Note</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.invoice_id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-semibold text-gray-700">{invoice.invoice_id}</td>
                  <td className="p-3">{invoice.building_name}</td>
                  <td className="p-3">{invoice.region_name}</td>
                  <td className="p-3">{invoice.apartment_name?.join(", ") || "N/A"}</td>
                  <td className="p-3">{invoice.client ?? "N/A"}</td>
                  <td className="p-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${invoice.type === "incoming"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {invoice.type}
                    </span>
                  </td>
                  <td className="p-3">{new Date(invoice.date_issued).toLocaleDateString()}</td>
                  <td className="p-3">
                    {invoice.due_date
                      ? new Date(invoice.due_date).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-3 font-semibold text-gray-800">
                    ${invoice.total_amount.toFixed(2)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${invoice.status.toLowerCase() === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  {/* <td className="p-3 text-gray-600">{invoice.note || "—"}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-6">No invoices found</p>
        )}
      </div>
    </>
  );
};

export default InvoicesList;
