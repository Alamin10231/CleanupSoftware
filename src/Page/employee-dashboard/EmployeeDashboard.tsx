import { useMemo } from "react";
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
  useGetEmployeeDashboardQuery,
  useGetEmployeeChartQuery,
} from "@/redux/features/employee/dashboard/dashboard.api";
import { useGetCurrentTaskQuery } from "@/redux/features/employee/subscription/subscription.api";

const EmployeeDashboard = () => {
  const employeeId = "126";
  const { data, isLoading, isError, refetch } = useGetEmployeeDashboardQuery();
  const { data: chartApiData, isLoading: chartLoading } =
    useGetEmployeeChartQuery(employeeId);
  const {
    data: tasksData,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetCurrentTaskQuery();

  // ---- Stats & Chart (existing code)
  type TaskItem = {
    id: number;
    name: string;
    status: string;
    total_revenue?: number;
    created_at?: string;
  };
  const items: TaskItem[] = (data?.results ?? []) as TaskItem[];

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

  // -------------------------------
  // Dynamic Current Tasks
  // -------------------------------
  type TaskRow = {
    id: number;
    title: string;
    client: string;
    scheduled: string;
    status: string;
  };

  const currentTasks: TaskRow[] = useMemo(() => {
    if (!tasksData?.results) return [];
    return tasksData.results.map((t: any) => ({
      id: t.id,
      title: t.aprtment_number?.[0] ?? "Unknown Apartment",
      client: t.client_name?.[0] ?? "Unknown Client",
      // If API has scheduled time
      status: t.status ?? "Not Started",
    }));
  }, [tasksData]);

  if (isLoading || chartLoading || tasksLoading)
    return (
      <div className="py-10 text-center text-gray-500">Loading dashboard…</div>
    );

  if (isError || tasksError)
    return (
      <div className="py-10 text-center text-red-600">
        Failed to load dashboard.{" "}
        <button onClick={() => refetch()} className="underline text-blue-600">
          Retry
        </button>
      </div>
    );

  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes("in progress"))
      return {
        statusColor: "bg-yellow-100 text-yellow-700",
        dotColor: "bg-yellow-500",
        action: "Complete",
      };
    if (status.toLowerCase().includes("not started"))
      return {
        statusColor: "bg-gray-100 text-gray-700",
        dotColor: "bg-gray-400",
        action: "Start",
      };
    if (status.toLowerCase().includes("completed"))
      return {
        statusColor: "bg-green-100 text-green-700",
        dotColor: "bg-green-500",
        action: "View Details",
      };
    return {
      statusColor: "bg-gray-100 text-gray-700",
      dotColor: "bg-gray-400",
      action: "Update",
    };
  };

  return (
    <div>
      {/* Header & Stats (same as existing) */}
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

      {/* Current Tasks - Dynamic API */}
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
                  <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                  <div>
                    <div className="font-medium text-sm mb-1">{task.title}</div>
                    <div className="text-xs text-gray-500">
                      Client: {task.client}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={statusColor}>
                    {task.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant={action === "View Details" ? "outline" : "default"}
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
    </div>
  );
};

export default EmployeeDashboard;
