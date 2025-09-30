import React from "react";
import { assets } from "@/assets/assets"; // adjust path if needed

interface Invoice {
  id: string;
  title: string;
  status: string;
  paymentMethod: string;
  issuedDate: string;
  dueDate: string;
  location: string;
  summary: {
    subtotal: number;
    tax: number;
    total: number;
  };
  services: {
    count: number;
    discount: string;
  };
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
              <h1 className="font-bold text-3xl">{invoice.id}</h1>
              <p className="text-base mt-2">{invoice.title}</p>
            </div>
            <p
              className={`px-4 py-1 rounded-full ${
                invoice.status === "Paid"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {invoice.status}
            </p>
            <p className="px-4 py-1 bg-gray-300 rounded-full text-gray-700">
              {invoice.paymentMethod}
            </p>
          </div>

          {/* Dates + Location */}
          <div className="flex items-center text-sm text-gray-500 mt-2 gap-6">
            <div className="flex items-center">
              <img src={assets.Calendar} alt="Issued Date" className="w-4 h-4 mr-2" />
              <p>Issued: {invoice.issuedDate}</p>
            </div>
            <div className="flex items-center">
              <img src={assets.Clock} alt="Due Date" className="w-4 h-4 mr-2" />
              <p>Due: {invoice.dueDate}</p>
            </div>
            <div className="flex items-center">
              <img src={assets.location} alt="Location" className="w-4 h-4 mr-2" />
              <p>{invoice.location}</p>
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
          <h3>Subtotal</h3>
          <p className="text-xl font-bold text-black mt-1">{`SAR ${invoice.summary.subtotal}`}</p>
        </div>
        <div className="p-8 bg-amber-50 rounded-xl shadow-sm">
          <h3>Tax (15%)</h3>
          <p className="text-xl font-bold text-black mt-1">{`SAR ${invoice.summary.tax}`}</p>
        </div>
        <div className="p-8 bg-amber-50 rounded-xl shadow-sm">
          <h3>Total</h3>
          <p className="text-xl font-bold text-black mt-1">{`SAR ${invoice.summary.total}`}</p>
        </div>
      </div>

      {/* Services */}
      <div className="mt-8">
        <div className="flex justify-between items-center ">
          <p>{`${invoice.services.count} services`}</p>
          <p className="bg-green-200 text-green-600 text-sm px-4 py-1 rounded-full">
            {`${invoice.services.discount} discount`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
