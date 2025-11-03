import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  useGetIncomingInvoicesQuery,
  useUpdateInvoiceStatusMutation,
  useDeleteInvoiceMutation,
} from "@/redux/features/admin/invoice/invoice.api";
import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Trash2, Download } from "lucide-react";

interface Invoice {
  id: number;
  invoice_id: string;
  type: string;
  date_issued: string;
  due_date: string | null;
  vendor_name: string | null;
  note: string;
  total_amount: number;
  status: string;
  building_name: string | null;
  apartment_name: string[];
  region_name: string | null;
  plan_name: string | null;
}

const IncomingInvoiceTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data: apiData, isLoading } = useGetIncomingInvoicesQuery(page);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [updateInvoiceStatus] = useUpdateInvoiceStatusMutation();
  const [deleteInvoice] = useDeleteInvoiceMutation();

  useEffect(() => {
    if (apiData?.results) {
      setInvoices((prevInvoices) => [...prevInvoices, ...apiData.results]);
    }
  }, [apiData]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading && invoices.length === 0) return <div>Loading...</div>;

  const handleStatusChange = (invoiceId: number, newStatus: string) => {
    updateInvoiceStatus({ id: invoiceId, status: newStatus });
  };

  const handleDelete = (invoiceId: number) => {
    deleteInvoice(invoiceId);
  };

  const handleDownloadPDF = (invoiceId: number) => {
    // Logic to download the invoice as PDF
    console.log(`Download PDF for invoice ${invoiceId}`);
  };

  return (
    <div className="w-full p-4">
      <Table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
        <TableHeader className="bg-gray-100 border-b border-gray-300 text-gray-700 text-sm">
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date Issued</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Building</TableHead>
            <TableHead>Apartment(s)</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {invoices.map((invoice: Invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.invoice_id}</TableCell>
              <TableCell className="capitalize">{invoice.type}</TableCell>
              <TableCell>{invoice.date_issued}</TableCell>
              <TableCell>{invoice.vendor_name ?? "—"}</TableCell>
              <TableCell>{invoice.building_name ?? "—"}</TableCell>
              <TableCell>
                {invoice.apartment_name.length
                  ? invoice.apartment_name.join(", ")
                  : "—"}
              </TableCell>
              <TableCell>{invoice.plan_name ?? "—"}</TableCell>
              <TableCell className="text-right font-medium">
                ${invoice.total_amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <select
                  value={invoice.status}
                  onChange={(e) => handleStatusChange(invoice.id, e.target.value)}
                  className={`
                    ${
                      invoice.status === "paid"
                        ? "text-green-600"
                        : invoice.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }
                    font-semibold capitalize bg-transparent border-none focus:ring-0`}
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(invoice.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownloadPDF(invoice.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && <div>Loading more...</div>}
    </div>
  );
};

export default IncomingInvoiceTable;
