import { assets, InvoiceTopCard } from "@/assets/assets";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import InvoicesList from "@/Components/InvoicesList";
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
          <Button icon={<FiDownload />} text="Export" />
          <Button icon={<FaPlus />} text="Create Invoice" />
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



      {/*  Invoice Card */}

      <InvoicesList  />

    </div>
  );
};

export default Invoices;
