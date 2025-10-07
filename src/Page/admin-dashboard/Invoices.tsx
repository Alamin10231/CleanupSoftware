import Button from "@/Components/Button";
import InvoicesList from "@/Components/InvoicesList";
import { useGetInvoicesQuery } from "@/redux/api/apiSlice";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";


const Invoices = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-black text-2xl font-bold">Clients</h2>
          <p className="text-[#808080] text-base mt-1">Manage clients and subscription</p>
        </div>
        <div className="flex gap-2">
          <Link to="/create-invoice">
               <Button icon={<FaPlus />} text="Create Invoice" />
          </Link>

        </div>
      </div>

      {/*  Invoice Card */}

      <InvoicesList  />

    </div>
  );
};

export default Invoices;
