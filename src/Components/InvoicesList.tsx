import React, { useEffect, useState } from "react";
import InvoiceCard from "./InvoiceCard";
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

      {/* List */}
      <div>
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <InvoiceCard key={invoice.invoice_id} invoice={invoice} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">No invoices found</p>
        )}
      </div>
    </>
  );
};

export default InvoicesList;
