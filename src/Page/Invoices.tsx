import { assets, InvoiceTopCard } from "@/assets/assets";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import { FaPlus } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";


const Invoices = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-black text-2xl font-bold">Clients</h2>
          <p className="text-[#808080] text-base mt-1">Manage clients and subscription</p>
        </div>
        <div className="flex gap-2">
          <Button icon={<FiDownload  />} text="Create Invoice" />
          <Button icon={<FaPlus />} text="Export" />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-6">
            {InvoiceTopCard.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                number={card.number}
                iconSrc={assets[card.iconKey]}
                iconAlt={card.iconAlt}
              />
            ))}
      </div>

       {/* Search Functionality */}
      <div className="flex items-center gap-4 mt-8 p-6 bg-white border border-gray-300 rounded-xl shadow-sm">
            <input
              type="text"
              placeholder="Search employees..."
              className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <select className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer">
              <option>All Departments</option>
              <option>HR</option>
              <option>Finance</option>
              <option>IT</option>
            </select>
            <select className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer">
              <option>All Status</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Inactive</option>
            </select>
            <select className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer">
              <option>All Shifts</option>
              <option>Morning</option>
              <option>Evening</option>
              <option>Night</option>
            </select>
          </div>
    </div>
  );
};

export default Invoices;
