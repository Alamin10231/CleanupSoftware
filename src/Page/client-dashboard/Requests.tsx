// src/Page/client-dashboard/Requests.tsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDeleteClientRequestMutation, useGetClientSubscriptionsQuery } from "@/redux/features/Client/Request.api";
import { Loader2, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


const Requests: React.FC = () => {
  const clientId = useSelector((state: any) => state.auth.user?.id) || 148;
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetClientSubscriptionsQuery({
    page,
    page_size: 5,
  });

  const requests = data?.results?.filter((item: any) => item.client === clientId) || [];
const [deleteClientRequest] = useDeleteClientRequestMutation();
const deleteitem = async (id:number)=>{
  if(window.confirm("Are Your sure to delete this item?"))
try{
await deleteClientRequest(id).unwrap()
toast.success("delete successfully")
console.log("object");
}
catch (error){
toast.error("delete failed")
console.log(error);
}
}
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-7 h-7 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-800">My Requests</h1>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 py-10 justify-center">
          <AlertCircle className="w-5 h-5" />
          <span>Failed to load requests.</span>
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && (
        <>
          {requests.length > 0 ? (
            <div className="overflow-x-auto bg-white shadow rounded-xl">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Form Name</th>
                    <th className="py-3 px-4 text-left">Form Type</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">Time Range</th>
                    <th className="py-3 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req: any, index: number) => (
                    <tr
                      key={req.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{req.form_name || "-"}</td>
                      <td className="py-2 px-4 capitalize">{req.form_type || "-"}</td>
                      <td className="py-2 px-4">{req.description || "-"}</td>
                      <td className="py-2 px-4">{req.time_range || "-"}</td>
                      <td className="py-2 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            req.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : req.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {req.status || "Pending"}
                        </span>
                         <Button 
                         onClick={deleteitem}>
            delete
          </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              You haven’t sent any requests yet.
            </p>
          )}
        </>
      )}

      {/* Pagination */}
      {!isLoading && data?.results?.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={!data?.previous}
          >
            Previous
          </Button>
          <span className="text-gray-600 text-sm">
            Page {page} of {Math.ceil((data?.count || 1) / 5)}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!data?.next}
          >
            Next
          </Button>

         
        </div>
      )}
    </div>
  );
};

export default Requests;
