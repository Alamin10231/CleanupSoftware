// src/components/TopClients.tsx
import { useGetAdminDashboardQuery } from "@/redux/api/apiSlice";

export default function TopClients() {
  // Fetch the dashboard (you can pass year/month dynamically)
  const { data, isLoading, isError, refetch } = useGetAdminDashboardQuery({
    year: 2025,
    month: "october",
  });

  if (isLoading) return <div>Loading top clients...</div>;
  if (isError) return <div className="text-red-600">Failed to load top clients.</div>;

  // Get top_clients array safely and filter out null names
  const clients = data?.top_clients?.filter((c) => c.client__name) ?? [];

  // Sort by total_sales descending (unchanged logic)
  const sortedClients = clients.sort(
    (a, b) => (b.total_sales ?? 0) - (a.total_sales ?? 0)
  );

  // For progress bar width (visual only, does not change logic)
  const maxSales = Math.max(...sortedClients.map((c) => c.total_sales || 0), 1);

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h10M4 17h7" />
          </svg>
          <h2 className="font-semibold text-gray-800">Top Clients</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="text-sm text-gray-500 hover:underline"
            title="Refresh"
          >
            Refresh ↻
          </button>
          <button className="text-sm text-blue-600 hover:underline">ViewAll</button>
        </div>
      </div>

      {/* List */}
      <div className="mt-4 space-y-4">
        {sortedClients.map((c) => {
          const name = c.client__name as string;
          const initials = name?.trim()?.slice(0, 2) || "Cl";
          const amount = c.total_sales ?? 0;
          const width = Math.min((amount / maxSales) * 100, 100);

          return (
            <div
              key={c.client__id ?? c.client__email ?? name}
              className="flex items-center justify-between"
            >
              {/* Left: avatar + info + progress */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-700 font-semibold">
                  {initials}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">{name}</p>
                  <p className="text-sm text-gray-500">
                    {c.client__email || "—"}
                  </p>
                  <div className="mt-1 h-1 w-40 rounded bg-gray-200">
                    <div
                      className="h-1 rounded bg-blue-500"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right: total sales (rating removed) */}
              <div className="text-right">
                <div className="rounded-full bg-blue-50 px-2 py-1 text-blue-600 inline-block">
                  <span className="font-medium">
                    {amount.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </span>{" "}
                  $
                </div>
                <p className="mt-1 text-xs text-blue-600">total</p>
              </div>
            </div>
          );
        })}

        {sortedClients.length === 0 && (
          <div className="text-sm text-gray-500">No clients found.</div>
        )}
      </div>
    </div>
  );
}
