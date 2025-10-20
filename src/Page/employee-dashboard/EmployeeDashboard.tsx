import  { useMemo } from "react";
import {
  Users, ClipboardCheck, Pause, AlertCircle, DollarSign,
  Share2
} from "lucide-react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from "recharts";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useGetEmployeeDashboardQuery, useGetEmployeeChartQuery } from "@/redux/features/employee/dashboard/dashboard.api";

const EmployeeDashboard = () => {
  const employeeId = "121"; // 👈 dynamic ID can come from login or context
  const { data, isLoading, isError, refetch } = useGetEmployeeDashboardQuery();
  const { data: chartApiData, isLoading: chartLoading } = useGetEmployeeChartQuery(employeeId);

  // ---- Types
  type TaskItem = {
    id: number;
    name: string;
    description?: string | null;
    status: "completed" | "pending" | "started" | string;
    total_revenue?: number | null;
    created_at?: string | null;
  };

  type EmployeeDashResponse = {
    count?: number;
    results?: TaskItem[];
  };

  // Normalize response
  const items: TaskItem[] = (data as EmployeeDashResponse)?.results ?? [];

  const stats = useMemo(() => {
    const totalTask = (data as EmployeeDashResponse)?.count ?? items.length;
    const completed = items.filter(i => i.status === "completed").length;
    const inProgress = items.filter(i => i.status === "started").length;
    const pending = items.filter(i => i.status === "pending").length;
    const revenueThisMonth = items.reduce((sum, i) => sum + (Number(i.total_revenue) || 0), 0);

    return { totalTask, completed, inProgress, pending, revenueThisMonth };
  }, [data, items]);

  // --- Chart Data (from API)
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

  if (isLoading || chartLoading)
    return <div className="py-10 text-center text-gray-500">Loading dashboard…</div>;

  if (isError)
    return (
      <div className="py-10 text-center text-red-600">
        Failed to load employee dashboard.{" "}
        <button onClick={() => refetch()} className="underline text-blue-600">
          Retry
        </button>
      </div>
    );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-semibold">Welcome, Sarah Miller</h1>
          <Badge className="bg-green-100 text-green-700 border-green-200">• Active</Badge>
        </div>
        <Button className="gap-2">
          <Share2 size={16} />
          Share
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: "Total Task", value: String(stats.totalTask), icon: Users, bgColor: "bg-green-100", iconColor: "text-green-600" },
          { label: "Completed", value: String(stats.completed), icon: ClipboardCheck, bgColor: "bg-green-100", iconColor: "text-green-600" },
          { label: "In Progress", value: String(stats.inProgress), icon: Pause, bgColor: "bg-yellow-100", iconColor: "text-yellow-600" },
          { label: "Pending", value: String(stats.pending), icon: AlertCircle, bgColor: "bg-red-100", iconColor: "text-red-600" },
          { label: "Revenue", value: `৳${stats.revenueThisMonth.toLocaleString()}`, icon: DollarSign, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-lg border p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon size={20} className={stat.iconColor} />
              </div>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tasks Overview Chart (Dynamic Data) */}
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
              <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
