import { useGetAdminDashboardQuery } from "@/redux/features/admin/dashboard/dashboard.api";
import React, { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MONTHS = [
  { label: "January", value: "january" },
  { label: "February", value: "february" },
  { label: "March", value: "march" },
  { label: "April", value: "april" },
  { label: "May", value: "may" },
  { label: "June", value: "june" },
  { label: "July", value: "july" },
  { label: "August", value: "august" },
  { label: "September", value: "september" },
  { label: "October", value: "october" },
  { label: "November", value: "november" },
  { label: "December", value: "december" },
];

const YEARS = [2023, 2024, 2025, 2026];

export default function Report() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState("october"); // backend expects lower-case

  const { data, isLoading, isError } = useGetAdminDashboardQuery({
    year,
    month,
  });

  // Build chart from API: X = Saudi hour label, Y = amount
  const chartData = useMemo(() => {
    const rows = data?.outgoing_sales ?? [];

    return rows
      .slice()
      .sort((a, b) => String(a.time).localeCompare(String(b.time)))
      .map((r) => {
        // prefer API label; otherwise derive Riyadh time from `time`
        const label =
          r.soudi_hour ||
          r.saudi_hour ||
          (typeof r.time === "string"
            ? new Date(r.time.replace(" ", "T")).toLocaleTimeString("en-SA", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Riyadh",
              })
            : "");

        return {
          time: label, // X-axis
          sales: Number(r.amount) || 0, // Y-axis
        };
      });
  }, [data]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow p-4">
      {/* Header + Filters */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Report</h2>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Year</label>
          <select
            className="border rounded-md px-3 py-1"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <label className="text-sm text-gray-600">Month</label>
          <select
            className="border rounded-md px-3 py-1"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isError && (
        <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded mb-4">
          Failed to load report data.
        </div>
      )}

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} stroke="#e5e7eb" />
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5BC4FF" />
                <stop offset="100%" stopColor="#FF5BEF" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="sales"
              stroke="url(#lineGradient)"
              strokeWidth={2}
              dot={{ fill: "#fff" }}
              activeDot={{ r: 6 }}
              isAnimationActive={!isLoading}
            />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ stroke: "#94a3b8", strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #AE8FF7",
                borderRadius: "0.375rem",
              }}
              formatter={(v) => [`SAR ${Number(v).toLocaleString()}`, "Amount"]}
              labelFormatter={(label) => `Time: ${label}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {isLoading && (
        <div className="mt-3 text-sm text-gray-500">Loading chart…</div>
      )}
    </div>
  );
}
