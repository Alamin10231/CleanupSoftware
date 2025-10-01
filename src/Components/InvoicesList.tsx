import React, { useEffect, useState } from "react";
import InvoiceCard from "./InvoiceCard";

interface Invoice {
  id: string;
  title: string;
  status: string;
  paymentMethod: string;
  issuedDate: string; // format: YYYY-MM-DD
  dueDate: string;
  location: string;
  summary: { subtotal: number; tax: number; total: number };
  services: { count: number; discount: string };
}

const InvoicesList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);

  // Filters state
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [paymentMethod, setPaymentMethod] = useState("All Payment Method");
  const [sort, setSort] = useState("Default");

  useEffect(() => {
    fetch("/Invoice.json")
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data.invoices);
        setFilteredInvoices(data.invoices);
      })
      .catch((err) => console.error("Error loading invoices:", err));
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...invoices];

    // Search filter
    if (search.trim() !== "") {
      result = result.filter(
        (inv) =>
          inv.title.toLowerCase().includes(search.toLowerCase()) ||
          inv.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status filter
    if (status !== "All Status") {
      result = result.filter((inv) => inv.status === status);
    }

    // Payment filter
    if (paymentMethod !== "All") {
      result = result.filter((inv) => inv.paymentMethod === paymentMethod);
    }




    // Sorting
    if (sort === "Oldest to New") {
      result.sort(
        (a, b) =>
          new Date(a.issuedDate).getTime() - new Date(b.issuedDate).getTime()
      );
    } else if (sort === "New to Oldest") {
      result.sort(
        (a, b) =>
          new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime()
      );
    }

    setFilteredInvoices(result);
  }, [search, status, paymentMethod, sort, invoices]);

  return (
    <>
      {/* Filters */}
      <div className="flex items-center justify-between gap-4 mt-8 p-6 bg-white border border-gray-300 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search Invoice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          >
            <option>All Status</option>
            <option>Paid</option>
            <option>Unpaid</option>
          </select>

          {/* Payment Method */}
          {/* Payment Method */}
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          >
            <option>All</option>
            <option>Incomming</option>
            <option>Outgoing</option>
          </select>



        </div>

        {/* Sort */}
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
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">No invoices found</p>
        )}
      </div>
    </>
  );
};

export default InvoicesList;
