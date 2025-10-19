import { useGetAdminDashboardQuery } from "@/redux/api/apiSlice";

type Slice = { name: string; value: number; color: string };

// Helper: Convert slices to conic-gradient string
function toConicGradient(slices: Slice[]) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  let acc = 0;
  const parts = slices.map((s) => {
    const start = (acc / total) * 360;
    acc += s.value;
    const end = (acc / total) * 360;
    return `${s.color} ${start}deg ${end}deg`;
  });
  return `conic-gradient(${parts.join(", ")})`;
}

// Helper: Calculate percentage
function percent(n: number, total: number) {
  return total ? Math.round((n / total) * 100) : 0;
}

export default function Analytics() {
  // 🔹 Fetch Admin Dashboard (replace year/month with dynamic if needed)
  const { data, isLoading, isError } = useGetAdminDashboardQuery({
    year: new Date().getFullYear(),
    month: "october", // example: current month lowercase
  });

  // 🔹 Extract analytics data or fallback to 0
  const analitycs = data?.analitycs || { stopped: 0, paused: 0, new_active: 0 };

  // 🔹 Build slices dynamically
  const analyticsData: Slice[] = [
    { name: "Stopped", value: analitycs.stopped || 0, color: "#D32F2F" },
    { name: "Paused", value: analitycs.paused || 0, color: "#0288D1" },
    { name: "Active", value: analitycs.new_active || 0, color: "#FF9800" },
  ];

  const total = analyticsData.reduce((s, x) => s + x.value, 0);
  const bg = toConicGradient(analyticsData);

  if (isLoading) return <div>Loading analytics...</div>;
  if (isError)
    return <div className="text-red-600">Failed to load analytics.</div>;

  return (
    <div className="w-full rounded-xl border bg-white p-4 shadow-sm dark:bg-gray-900 dark:border-gray-700">
      <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
        Subscription Analytics
      </h2>

      <div className="flex flex-col items-center gap-4">
        {/* Donut Chart */}
        <div className="flex items-center justify-center">
          <div
            className="relative aspect-square w-[220px] rounded-full"
            style={{ background: bg }}
            role="img"
            aria-label="Analytics distribution donut chart"
          >
            {/* Inner white circle */}
            <div className="absolute inset-6 rounded-full bg-white shadow-inner dark:bg-gray-900" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-semibold">{total}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Total
                </div>
              </div>
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
