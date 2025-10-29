import { assets } from "@/assets/assets";
import Card from "@/Components/Card";
import InvoicesList from "@/Page/admin-dashboard/invoice/InvoicesList";
import { Button } from "@/Components/ui/button";
import { useGetCalculationInvoiceQuery } from "@/redux/features/admin/invoice/invoice.api";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Invoices = () => {
  const { data, isLoading } = useGetCalculationInvoiceQuery(undefined);

  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-black text-2xl font-bold">Invoices</h2>
          <p className="text-[#808080] text-base mt-1">
            Manage clients and subscription
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/create-invoice">
            <Button>
              <FaPlus />
              Create Invoice
            </Button>
          </Link>
        </div>
      </div>
      {/* stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          title={`Total`}
          number={data.total}
          iconSrc={assets.total_service}
          iconAlt="Total Service"
        />
        <Card
          title={`Sales`}
          number={data.sales}
          iconSrc={assets.overDue}
          iconAlt="Total Sales"
        />
        <Card
          title={`Expense`}
          number={` ${data.expense} SAR`}
          iconSrc={assets.Total_revenue}
          iconAlt="Total_revenue"
        />
        <Card
          title={`Total Invoice`}
          number={data.total_invoice}
          iconSrc={assets.blueInvoice}
          iconAlt="blueInvoice"
        />
      </div>

      {/*  Invoice table */}
      <InvoicesList />
    </div>
  );
};

export default Invoices;
