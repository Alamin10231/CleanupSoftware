import React from "react";
import { assets } from "@/assets/assets"; // adjust path if needed

interface Invoice {
  invoice_id: string;
  type: string;
  date_issued: string;
  due_date: string;
  building_name: string;
  total_amount: number;
  status: string;
  apartment_name: string[];
  region_name: string;
  line_items: any[];
}

interface Props {
  invoice: Invoice;
}

const InvoiceCard: React.FC<Props> = ({ invoice }) => {
  return (
    <div className="mt-6 p-6 bg-white border border-gray-300 rounded-xl shadow-sm">
      <div className="flex justify-between w-full">
        {/* Left Info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-6">
            <div>
              <h1 className="font-bold text-3xl">{invoice.invoice_id}</h1>
              <p className="text-base mt-2">{invoice.building_name}</p>
            </div>
            <p
              className={`px-4 py-1 rounded-full ${
                invoice.status === "paid"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {invoice.status}
            </p>
            <p className="px-4 py-1 bg-gray-300 rounded-full text-gray-700">
              {invoice.type}
            </p>
          </div>

          {/* Dates + Location */}
          <div className="flex items-center text-sm text-gray-500 mt-2 gap-6">
            <div className="flex items-center">
              <img src={assets.calender} alt="Issued Date" className="w-4 h-4 mr-2" />
              <p>Issued: {invoice.date_issued}</p>
            </div>
            <div className="flex items-center">
              <img src={assets.Clock} alt="Due Date" className="w-4 h-4 mr-2" />
              <p>Due: {invoice.due_date}</p>
            </div>
            <div className="flex items-center">
              <img src={assets.location} alt="Location" className="w-4 h-4 mr-2" />
              <p>{invoice.region_name}</p>
            </div>
            <div className="flex items-center">
              <p>Apartments: {invoice.apartment_name.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div>
          <img src={assets.eye} alt="view" className="inline mr-4 cursor-pointer w-6 h-6" />
          <img src={assets.Edit} alt="edit" className="inline mr-4 cursor-pointer w-6 h-6" />
          <img src={assets.print} alt="print" className="inline mr-4 cursor-pointer w-6 h-6" />
          <img src={assets.Delete} alt="delete" className="inline cursor-pointer w-6 h-6" />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-6 mt-8 ">
        <div className="p-8 bg-amber-50 rounded-xl shadow-sm">
          <h3>Total</h3>
          <p className="text-xl font-bold text-black mt-1">{`SAR ${invoice.total_amount}`}</p>
        </div>
      </div>

      {/* Line Items */}
      {invoice.line_items && invoice.line_items.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Line Items</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2 font-medium text-gray-700">Service</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Description</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Quantity</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Unit Price</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Line Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.line_items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-2">{item.service}</td>
                  <td className="py-2 px-2">{item.description}</td>
                  <td className="py-2 px-2">{item.quantity}</td>
                  <td className="py-2 px-2">{item.unit_price}</td>
                  <td className="py-2 px-2">{item.line_total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default InvoiceCard;
