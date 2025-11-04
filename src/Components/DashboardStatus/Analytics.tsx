import { useState } from "react";
import { useGetAdminDashboardQuery } from "@/redux/features/admin/dashboard/dashboard.api";

type Slice = { name: string; value: number; color: string };

// Helper: Convert slices to conic-gradient string
function toConicGradient(slices: Slice[], total: number) {
  if (total === 0) return "conic-gradient(#e5e7eb 0deg 360deg)"; // neutral gray if no data
  let acc = 0;
  const parts = slices.map((s) => {
    const start = (acc / total) * 360;
    acc += s.value;
    const end = (acc / total) * 360;
    return `${s.color} ${start}deg ${end}deg`;
  });
  return `conic-gradient(${parts.join(", ")})`;
}

function percent(n: number, total: number) {
  return total ? Math.round((n / total) * 100) : 0;
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function Analytics() {
  const [month, setMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );

  // ✅ refetchOnMountOrArgChange is passed in the hook options (second argument)
  const { data, isLoading, isError } = useGetAdminDashboardQuery(
    {
      year: new Date().getFullYear(),
      month: month.toLowerCase(),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const analitycs = data?.analitycs || { stopped: 0, paused: 0, new_active: 0 };

  const analyticsData: Slice[] = [
    { name: "Stopped", value: analitycs.stopped || 0, color: "#D32F2F" },
    { name: "Paused", value: analitycs.paused || 0, color: "#0288D1" },
    { name: "Active", value: analitycs.new_active || 0, color: "#FF9800" },
  ];

  const total = analyticsData.reduce((s, x) => s + x.value, 0);
  const bg = toConicGradient(analyticsData, total);

  if (isLoading) return <div>Loading analytics...</div>;
  if (isError)
    return <div className="text-red-600">Failed to load analytics.</div>;

  return (
    <div className="w-full rounded-xl border bg-white p-4 shadow-sm dark:bg-gray-900 dark:border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Subscription Analytics
        </h2>
        <select
          className="border px-2 py-1 rounded text-sm"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {MONTHS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Donut Chart */}
        <div className="flex items-center justify-center">
          <div
            className="relative aspect-square w-[220px] rounded-full flex items-center justify-center"
            style={{ background: bg }}
            role="img"
            aria-label="Analytics distribution donut chart"
          >
            <div className="absolute inset-6 rounded-full bg-white shadow-inner dark:bg-gray-900" />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              {total > 0 ? (
                <>
                  <div className="text-4xl font-semibold">{total}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Total
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  No data available for {month}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <ul className="flex flex-wrap justify-center gap-3 text-sm">
          {analyticsData.map((s) => (
            <li
              key={s.name}
              className="flex items-center gap-2 rounded-lg px-3 py-1 transition hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              title={`${s.name}: ${percent(s.value, total)}%`}
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="font-medium text-gray-800 dark:text-gray-100">
                {s.name}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {percent(s.value, total)}%
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
        Hover on labels to view percentage.
      </p>
    </div>
  );
}
