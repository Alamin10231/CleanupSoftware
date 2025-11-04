import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { assets } from "@/assets/assets";
import Card from "@/Components/Card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { useGetEmployeeTasksQuery } from "@/redux/features/employee/task/task.api";
import EmployeeMap from "./employee-map";

export default function EmployeeTaskDashboard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const { data: taskData, isLoading } = useGetEmployeeTasksQuery(page);

  const tasks =
    taskData?.results?.filter(
      (task: any) =>
        task.name.toLowerCase().includes(search.toLowerCase()) ||
        task.building_name.toLowerCase().includes(search.toLowerCase()) ||
        task.worker_name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const totalTasks = taskData?.count || 0;
  const totalCompleted = tasks.filter((t: any) => t.status === "completed").length;
  const totalActive = tasks.filter((t: any) => t.status === "active").length;

  function BuildingMap({ buildingId }: { buildingId: number }) {
    const { data: building, isLoading } = useGetEmployeeTasksQuery(buildingId);

    if (isLoading) return <p>Loading map...</p>;
    if (!building) return <p>Building not found.</p>;

    return <EmployeeMap building={selectedTask} />;
  }

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
        <Card title="Total Tasks" number={totalTasks} iconSrc={assets.region} />
        <Card title="Active Tasks" number={totalActive} iconSrc={assets.Active} />
        <Card title="Completed Tasks" number={totalCompleted} iconSrc={assets.totalEmployee} />
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-3 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search tasks by name, building, or worker"
            className="w-1/2 px-3 py-2 rounded-md border text-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <p className="text-sm text-gray-600">
            Showing {tasks.length} of {totalTasks} results
          </p>
        </div>

        <table className="w-full text-sm">
          <thead className="text-gray-700">
            <tr>
              <th className="text-left p-3">Task Name</th>
              <th className="text-left p-3">Worker</th>
              <th className="text-left p-3">Building</th>
              <th className="text-left p-3">Region</th>
              <th className="text-left p-3">Apartment</th>
              <th className="text-left p-3">Client Email</th>
              <th className="text-left p-3">Status</th>
              <th className="p-3 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  Loading tasks...
                </td>
              </tr>
            ) : tasks.length > 0 ? (
              tasks.map((task: any) => (
                <tr key={task.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 font-medium text-gray-700">{task.name}</td>
                  <td className="p-3">{task.worker_name}</td>
                  <td className="p-3">{task.building_name}</td>
                  <td className="p-3">{task.region_name}</td>
                  <td className="p-3">{task.apartment?.join(", ") || "N/A"}</td>
                  <td className="p-3">{task.client_email?.join(", ")}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="View Details"
                      onClick={() => setSelectedTask(task)}
                    >
                      <LuEye size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center text-gray-500 py-6">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-3 border-t">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={!taskData?.previous}
            className="px-3 py-1 rounded-md border text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <p className="text-sm">
            Page {page} of {Math.ceil(totalTasks / 10) || 1}
          </p>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!taskData?.next}
            className="px-3 py-1 rounded-md border text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Dialog for Task Details & Map */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedTask?.name || "Task Details"}</DialogTitle>
          </DialogHeader>

          {selectedTask ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <p><span className="font-medium">Task Name:</span> {selectedTask.name}</p>
                <p><span className="font-medium">Worker:</span> {selectedTask.worker_name}</p>
                <p><span className="font-medium">Building:</span> {selectedTask.building_name}</p>
                <p><span className="font-medium">Region:</span> {selectedTask.region_name}</p>
                <p><span className="font-medium">Apartment:</span> {selectedTask.apartment?.join(", ") || "N/A"}</p>
                <p><span className="font-medium">Client Email:</span> {selectedTask.client_email?.join(", ")}</p>
                <p><span className="font-medium">Status:</span> {selectedTask.status}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Map Location</h4>
                {selectedTask.building && <BuildingMap buildingId={selectedTask.building} />}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No task selected.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
