import React, { useState } from "react";
import {
  useGetClientSubscriptionsQuery,
  useUpdateClientRequestMutation,
} from "@/redux/features/Client/Request.api";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteClientMutation } from "@/redux/features/admin/users/clients.api";
import { toast } from "sonner";

const ReceiveRequest: React.FC = () => {
  const [page, setPage] = useState(1);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState("");

  // Fetch user info from Redux
  const user = useSelector((state: any) => state.auth.user);
  console.log("userrrrr", user);
  const isAdmin = user?.user_type === "admin";

  // Fetch 5 items per page
  const { data, isLoading, error } = useGetClientSubscriptionsQuery({
    page,
    page_size: 5,
  });

  const [updateClientRequest] = useUpdateClientRequestMutation();
const [deleteClientRequest] = useDeleteClientMutation();
const deleteitem = async(id:number)=>{
  try{
    await deleteClientRequest(id).unwrap()
    toast.success("delete successfully")
  }
  catch (error){
     toast.error("delete successfully")
console.log(error)
  }
}
  const handleEditClick = (item: any) => {
    if (!isAdmin) return;
    setEditRowId(item.id);
    setEditDescription(item.description);
  };

  const handleUpdateClick = async (id: number) => {
    if (!isAdmin) return alert("Only admin can update!");
    try {
      await updateClientRequest({
        id,
        body: { description: editDescription },
      }).unwrap();
      alert("✅ Updated successfully!");
      setEditRowId(null);
    } catch (err) {
      console.error(err);
      alert("❌ Update failed!");
    }
  };

  if (isLoading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load client requests!
      </p>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Client Requests</h1>

      <div className="overflow-x-auto rounded-lg border bg-white shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Form Name</th>
              <th className="p-3 text-left">Subscription</th>
              <th className="p-3 text-left">Special Service</th>
              <th className="p-3 text-left">Time Range</th>
              <th className="p-3 text-left">Form Type</th>
              <th className="p-3 text-left">Description</th>
              {isAdmin && <th className="p-3 text-left">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {data?.results?.map((item: any) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.client}</td>
                <td className="p-3">{item.form_name}</td>
                <td className="p-3">{item.subscription}</td>
                <td className="p-3">
                  {item.special_service ? `#${item.special_service}` : "-"}
                </td>
                <td className="p-3">{item.time_range}</td>
                <td className="p-3 capitalize">{item.form_type}</td>
                <td className="p-3">
                  {editRowId === item.id ? (
                    <Input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    item.description
                  )}
                </td>
                {isAdmin && (
                  <td className="p-3 flex gap-2">
                    {editRowId === item.id ? (
                      <Button
                        variant="default"
                        onClick={() => handleUpdateClick(item.id)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </Button>
                    )}
                      <Button
                        variant="secondary"
                        onClick={() => deleteitem(item.id)}
                      >
                        Delete
                      </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-4">
        <Button
          variant="outline"
          disabled={!data?.previous}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>

        <span className="flex items-center px-3">Page {page}</span>

        <Button
          variant="outline"
          disabled={!data?.next}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ReceiveRequest;
