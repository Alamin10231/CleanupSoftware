import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { useGetEmployeeTasksQuery } from "@/redux/features/employee/EmployeeTask.api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/Components/ui/dialog";

export default function EmployeeTaskDashboard() {
  const [page, setPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const pageSize = 10;

  const { data: employeeTasks, isLoading, isError } = useGetEmployeeTasksQuery(page);

  const tasks = employeeTasks?.results || [];
  const totalPages = Math.ceil((employeeTasks?.count || 0) / pageSize);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to fetch data.</p>;

  return (
    <div className="space-y-6 p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Employee Tasks</h1>
        <p className="text-gray-600 text-sm mt-1">
          View and manage all tasks assigned to employees. You can check task status, pricing, and details using the
          action button below.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
        <div className="p-3 bg-gray-100 border-b">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full px-3 py-2 rounded-md border text-sm outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-3 text-left font-medium">Task Name</th>
              <th className="p-3 text-left font-medium">Building</th>
              <th className="p-3 text-left font-medium">Bill Cycle</th>
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-left font-medium">Price</th>
              <th className="p-3 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task: any, i: number) => (
                <tr key={i} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 font-medium text-gray-800">{task.name}</td>
                  <td className="p-3">{task.building_name}</td>
                  <td className="p-3">{task.bill_cycle}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === "started"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3">{task.discounted_price || task.base_price} SAR</td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="View Details"
                    >
                      <LuEye size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-3 text-center text-gray-500">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-3 bg-gray-50 border-t">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={!employeeTasks?.previous}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <p className="text-sm font-medium text-gray-700">
            Page {page} of {totalPages}
          </p>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!employeeTasks?.next}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{selectedTask?.name}</DialogTitle>
            <DialogDescription>{selectedTask?.description}</DialogDescription>
          </DialogHeader>

          <div className="mt-3 space-y-2 text-sm">
            <p><strong>Building:</strong> {selectedTask?.building_name}</p>
            <p><strong>Location:</strong> {selectedTask?.building_location}</p>
            <p><strong>Region:</strong> {selectedTask?.region_name}</p>
            <p><strong>Bill Cycle:</strong> {selectedTask?.bill_cycle}</p>
            <p><strong>Discounted Price:</strong> {selectedTask?.discounted_price} SAR</p>
            <p><strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                selectedTask?.status === "started"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}>
                {selectedTask?.status}
              </span>
            </p>
            <p><strong>Created At:</strong> {selectedTask?.created_at}</p>
            <p><strong>Client(s):</strong> {selectedTask?.client_name?.join(", ") || "N/A"}</p>
            <p><strong>Apartment(s):</strong> {selectedTask?.aprtment_number?.join(", ") || "N/A"}</p>
          </div>

          <DialogClose asChild>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Close
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
