import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

interface Invoice {
  FormName: string;
  Client: string;
  Apartment: string;
  Region: string;
   Status: "Submitted" | "Draft"; 
  LastUpdated: string;
}

const EmployeeForms = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [tab, setTab] = useState("all");
const [active,setactive] = useState(null)

  useEffect(() => {
    fetch("/FormData.json")
      .then((res) => res.json())
      .then((data) => setInvoices(data.FormData));
  }, []);

  const filteredInvoices = invoices.filter((fo) => {
    const matchTab =
      tab == "all"
        ? true
        : tab === "Submitted" 
        ? fo.Status === "Submitted"
        : tab === "Draft"
        ? fo.Status=== "Draft"
        : true;

    return matchTab;
  });

  const statuscolor = {
    Submitted : "text-green-500 bg-[#E2F5EC] px-4 py-2 rounded-md",
    Draft : "text-[#F5A926] bg-[#F7F1E4] px-9 py-2 rounded-md",
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Invoices</h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" value={tab} onValueChange={setTab}>
        <TabsList>
        
          
          {
            ["all","Submitted","Draft"].map((t)=>(
              <TabsTrigger  key={t} value={t}>{t === "all"? "All":t}</TabsTrigger>
            ))
          }
          
          
         
          
        </TabsList>

        {/* Table */}
        <TabsContent value={tab} className="">
          <div className="overflow-x-auto border rounded-lg mt-4 ">
            <table className="w-full border-collapse text-md bg-[#F7FAFC]">
              <thead className=" text-black ">
                <tr className="text-black  ">
                  <th className="px-4 py-2 text-left">FormName</th>
                  <th className="px-4 py-2 text-left">Client</th>
                  <th className="px-4 py-2 text-left">Appartment</th>
                  <th className="px-4 py-2 text-left">Region</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Last Updates</th>
                </tr>
              </thead>
              <tbody className="bg-[#F7FAFC] text-gray-500">
                {filteredInvoices.map((invoice, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-4 ">{invoice.FormName}</td>
                    <td className="px-4 py-4 ">{invoice.Client}</td>
                    <td className="px-4 py-4 ">{invoice.Apartment}</td>
                    <td className="px-4 py-4 ">{invoice.Region}</td>
                    <td className={`px-4 py-4 
                      `}><span className={` ${statuscolor[invoice.Status] || ""}`}>{invoice.Status}</span></td>
                    <td className="px-4 py-4 ">{invoice.LastUpdated}</td>
                    <td className="px-4 py-4  text-blue-600 cursor-pointer hover:underline"></td>
                  </tr>
                ))}

                {filteredInvoices.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center text-gray-500 py-4">
                      No invoices found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeForms;
