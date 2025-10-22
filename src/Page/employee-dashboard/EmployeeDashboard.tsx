// src/pages/employee/EmployeeDashboard.tsx
import { useMemo, useState } from "react";
import {
  Users,
  ClipboardCheck,
  Pause,
  AlertCircle,
  DollarSign,
  Share2,
  FileText,
  Building2,
  MessageSquare,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/Components/ui/dialog";

import {
  useGetEmployeeDashboardQuery,
  useGetEmployeeChartQuery,
} from "@/redux/features/employee/dashboard/dashboard.api";
import { useGetCurrentTaskQuery } from "@/redux/features/employee/subscription/subscription.api";

type TaskItem = {
  id: number;
  name: string;
  status: string;
  total_revenue?: number;
  created_at?: string;
};

type TaskRow = {
  id: number;
  title: string;
  client: string;
  scheduled?: string;
  status: string;
  service_code?: string | number;
  building_name: string;
  description: string;
  region_name: string;
  name: string;
};

const EmployeeDashboard = () => {
  const employeeId = "";

  // API queries
  const { data, isLoading, isError, refetch } = useGetEmployeeDashboardQuery();
  const { data: chartApiData, isLoading: chartLoading } =
    useGetEmployeeChartQuery(employeeId);
  const {
    data: tasksData,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetCurrentTaskQuery();

  const items: TaskItem[] = (data?.results ?? []) as TaskItem[];

  // Summary stats
  const stats = useMemo(() => {
    const totalTask = data?.count ?? items.length;
    const completed = items.filter((i) => i.status === "completed").length;
    const inProgress = items.filter((i) => i.status === "started").length;
    const pending = items.filter((i) => i.status === "pending").length;
    const revenueThisMonth = items.reduce(
      (sum, i) => sum + (Number(i.total_revenue) || 0),
      0
    );
    return { totalTask, completed, inProgress, pending, revenueThisMonth };
  }, [data, items]);

  // Chart data
  const chartData = useMemo(() => {
    if (!chartApiData || !Array.isArray(chartApiData)) return [];
    return chartApiData.map((d: any) => ({
      month: new Date(d.month).toLocaleString("default", { month: "short" }),
      total: d.total_tasks,
      completed: d.completed_tasks,
      pending: d.pending_tasks,
      started: d.started_tasks,
      revenue: d.this_month_revenue,
    }));
  }, [chartApiData]);

  // Current tasks table rows
  const currentTasks: TaskRow[] = useMemo(() => {
    if (!tasksData?.results) return [];
    return tasksData.results.map((t: any) => ({
      id: t.id,
      title: `${t.building_name ?? "Unknown Building"}, ${
        t.region_name ?? "Unknown Region"
      }`,
      client: t.aprtment_number ?? "Unknown Client",
      scheduled: t.scheduled_at ?? undefined,
      status: t.status ?? "Not Started",
      description:
      t.description ??"Not Started",
      region_name:
      t.region_name ??"Not Region Name",
      name:
      t.name ??"Not Region Name",
                         
      
      service_code: t.service_code ?? undefined, // ⬅️ map the service code/id safely
    }));
  }, [tasksData]);

  // Modal state
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskRow | null>(null);

  if (isLoading || chartLoading || tasksLoading) {
    return (
      <div className="py-10 text-center text-gray-500">Loading dashboard…</div>
    );
  }

  if (isError || tasksError) {
    return (
      <div className="py-10 text-center text-red-600">
        Failed to load dashboard.{" "}
        <button onClick={() => refetch()} className="underline text-blue-600">
          Retry
        </button>
      </div>
    );
  }

  // status → badge color + action label
  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("pending")) {
      return {
        statusColor: "bg-yellow-100 text-yellow-700",
        dotColor: "bg-yellow-500",
        action: "Complete",
      };
    }
    if (s.includes("not started")) {
      return {
        statusColor: "bg-gray-100 text-gray-700",
        dotColor: "bg-gray-400",
        action: "Start",
      };
    }
    if (s.includes("completed")) {
      return {
        statusColor: "bg-green-100 text-green-700",
        dotColor: "bg-green-500",
        action: "View Details",
      };
    }
    // default
    return {
      statusColor: "bg-gray-100 text-gray-700",
      dotColor: "bg-gray-400",
      action: "Start",
    };
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-semibold">Welcome, Sarah Miller</h1>
          <Badge className="bg-green-100 text-green-700 border-green-200">
            • Active
          </Badge>
        </div>
        <Button className="gap-2">
          <Share2 size={16} />
          Share
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          {
            label: "Total Task",
            value: String(stats.totalTask),
            icon: Users,
            bgColor: "bg-green-100",
            iconColor: "text-green-600",
          },
          {
            label: "Completed",
            value: String(stats.completed),
            icon: ClipboardCheck,
            bgColor: "bg-green-100",
            iconColor: "text-green-600",
          },
          {
            label: "In Progress",
            value: String(stats.inProgress),
            icon: Pause,
            bgColor: "bg-yellow-100",
            iconColor: "text-yellow-600",
          },
          {
            label: "Pending",
            value: String(stats.pending),
            icon: AlertCircle,
            bgColor: "bg-red-100",
            iconColor: "text-red-600",
          },
          {
            label: "Revenue",
            value: `${stats.revenueThisMonth.toLocaleString()}`,
            icon: DollarSign,
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600",
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-lg border p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div
                className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}
              >
                <stat.icon size={20} className={stat.iconColor} />
              </div>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">Tasks Overview</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{stats.totalTask}</span>
              <span className="text-sm text-green-600">updated now</span>
            </div>
          </div>
          <Select>
            <SelectTrigger className="px-4 w-[96px] py-2 border rounded-lg text-sm">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Current Tasks */}
      <div className="bg-white rounded-lg border mb-6">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">Current Tasks</h2>
          <button className="text-sm text-blue-600 hover:underline">
            View All
          </button>
        </div>

        <div>
          {currentTasks.map((task) => {
            const { statusColor, dotColor, action } = getStatusColor(
              task.status
            );
            return (
              <div
                key={task.id}
                className="flex items-center justify-between border-b border-gray-200 p-4 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                  <div>
                    <div className="font-medium text-sm mb-1">{task.title}</div>
                    <div className="text-xs text-gray-500">
                      Apartment No: {task.client}
                    </div>
                    {task.scheduled && (
                      <div className="text-xs text-gray-400">
                        Scheduled: {new Date(task.scheduled).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={statusColor}>
                    {task.status}
                  </Badge>

                  <Button
                    size="sm"
                    variant={action === "View Details" ? "outline" : "default"}
                    onClick={() => {
                      if (action === "View Details") {
                        setSelectedTask(task);
                        setDetailsOpen(true);
                      } else if (action === "Start") {
                        // TODO: start task handler
                        // e.g. startTask(task.id)
                      } else if (action === "Complete") {
                        // TODO: complete task handler
                        // e.g. completeTask(task.id)
                      }
                    }}
                  >
                    {action}
                  </Button>
                </div>
              </div>
            );
          })}

          {currentTasks.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No tasks assigned.
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Open Assigned Form",
              description: "Complete pending forms",
              icon: FileText,
              bgColor: "bg-blue-100",
              iconColor: "text-blue-600",
            },
            {
              title: "View Apartment History",
              description: "Check past visits and notes",
              icon: Building2,
              bgColor: "bg-green-100",
              iconColor: "text-green-600",
            },
            {
              title: "Send WhatsApp Reply",
              description: "Quick client communication",
              icon: MessageSquare,
              bgColor: "bg-purple-100",
              iconColor: "text-purple-600",
            },
          ].map((action, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border hover:shadow-md transition cursor-pointer flex gap-4 items-center p-4"
            >
              <div
                className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center`}
              >
                <action.icon size={24} className={action.iconColor} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Details Modal ---- */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
            <DialogDescription>
              {selectedTask ? (
               <div className="mt-2">
  {/* Header strip */}
  <div className="rounded-t-lg bg-gray-50 px-4 py-3 border border-b-0 border-gray-200">
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          Task Summary
        </h3>
        <p className="text-xs text-gray-500">
          Quick snapshot of the selected task
        </p>
      </div>

      {/* Status badge */}
      <span
        className={[
          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border",
          selectedTask.status?.toLowerCase().includes("completed")
            ? "bg-green-50 text-green-700 border-green-200"
            : selectedTask.status?.toLowerCase().includes("pending")
            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
            : "bg-gray-50 text-gray-700 border-gray-200",
        ].join(" ")}
      >
        {selectedTask.status}
      </span>
    </div>
  </div>

  {/* Body */}
  <div className="rounded-b-lg border border-gray-200">
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 px-4 py-5">
      <div className="space-y-1">
        <dt className="text-xs uppercase tracking-wide text-gray-500">Name</dt>
        <dd className="text-sm font-medium text-gray-900 break-words">
          {selectedTask.name ?? "—"}
        </dd>
      </div>

      <div className="space-y-1">
        <dt className="text-xs uppercase tracking-wide text-gray-500">Title</dt>
        <dd className="text-sm font-medium text-gray-900 break-words">
          {selectedTask.title ?? "—"}
        </dd>
      </div>

      <div className="space-y-1">
        <dt className="text-xs uppercase tracking-wide text-gray-500">Apartment</dt>
        <dd className="text-sm font-medium text-gray-900">
          {selectedTask.client ?? "—"}
        </dd>
      </div>

      <div className="space-y-1">
        <dt className="text-xs uppercase tracking-wide text-gray-500">Service ID</dt>
        <dd className="text-sm font-medium text-gray-900">
          {selectedTask.service_code ?? "—"}
        </dd>
      </div>

      <div className="space-y-1 sm:col-span-2">
        <dt className="text-xs uppercase tracking-wide text-gray-500">Description</dt>
        <dd className="text-sm text-gray-800 leading-relaxed">
          {selectedTask.description ? (
            <span className="block">{selectedTask.description}</span>
          ) : (
            "—"
          )}
        </dd>
      </div>

      <div className="space-y-1">
        <dt className="text-xs uppercase tracking-wide text-gray-500">Region</dt>
        <dd className="text-sm font-medium text-gray-900">
          {selectedTask.region_name ?? "—"}
        </dd>
      </div>

      {selectedTask.scheduled && (
        <div className="space-y-1">
          <dt className="text-xs uppercase tracking-wide text-gray-500">Scheduled</dt>
          <dd className="text-sm font-medium text-gray-900">
            {new Date(selectedTask.scheduled).toLocaleString()}
          </dd>
        </div>
      )}
    </dl>

    {/* Footer actions (optional) */}
    
  </div>
</div>

              ) : (
                "Loading…"
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>
              Close
            </Button>
            {/* Optional: navigate or perform action */}
            {/* <Button onClick={() => router.push(`/tasks/${selectedTask?.id}`)}>Open</Button> */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeDashboard;
