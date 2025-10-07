import { assets } from "@/assets/assets";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import InvoicesList from "@/Components/InvoicesList";
import { useGetCalculationInvoiceQuery, useGetInvoicesQuery } from "@/redux/api/apiSlice";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";


const Invoices = () => {
  const { data, isLoading, isError } = useGetCalculationInvoiceQuery()

  if(isLoading) return <div>loading...</div>
  console.log(data)
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
      {/* stats */}
      <div className="grid grid-cols-4 gap-8">
      <Card title={`Total`} number={data.total} iconSrc={assets.total_service} iconAlt="Total Service"/>
      <Card title={`Sales`} number={data.sales} iconSrc={assets.overDue} iconAlt="Total Sales"/>
      <Card title={`Expense`} number={` ${data.expense} SAR`} iconSrc={assets.Total_revenue} iconAlt="Total_revenue"/>
      <Card title={`Total Invoice`} number={data.total_invoice} iconSrc={assets.blueInvoice} iconAlt="blueInvoice"/>
      
      </div>
      {/*  Invoice Card */}

      <InvoicesList  />

    </div>
  );
};

export default Invoices;
