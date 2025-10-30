import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Checkbox } from "@/Components/ui/checkbox";
import { useGetEmployeeSubscriptionQuery } from "@/redux/features/employee/subscription/subscription.api";
// <-- adjust path if different

type UiStatus = "active" | "due" | "paused" | "stopped";

type SubscriptionRow = {
  id: number;
  property: string;
  owner: string;
  region: string;
  building: string;
  status: UiStatus;
  daysRemaining: number; // negative => overdue
  totalDays: number;
  autoRenew: boolean | null;
};

const daysBetween = (a: Date, b: Date) =>
  Math.max(0, Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)));

const toUiStatus = (status: string, paused_at: string | null): UiStatus => {
  if (paused_at) return "paused";
  if (status === "active") return "active";
  if (status === "past_due") return "due";
  if (status === "canceled") return "stopped";
  return "active";
};

const getBuildingName = (item: any): string => {
  // Some items have apartment.building, others have top-level building
  const a = item?.apartment;
  const fromApt =
    a && typeof a.building === "object" ? a.building?.name : undefined;
  return fromApt ?? item?.building?.name ?? "";
};

const computeTimeline = (
  startISO: string,
  endISO: string,
  uiStatus: UiStatus
) => {
  const now = new Date();
  const start = new Date(startISO);
  const end = new Date(endISO);

  if (uiStatus === "stopped") {
    // ended
    return {
      totalDays: Math.max(1, daysBetween(start, end)),
      daysRemaining: 0,
    };
  }

  if (now > end) {
    // overdue: negative remaining
    const overdue = Math.ceil(
      (now.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)
    );
    return {
      totalDays: Math.max(1, daysBetween(start, end)),
      daysRemaining: -overdue,
    };
  }

  const totalDays = Math.max(1, daysBetween(start, end));
  const remaining = daysBetween(now, end);
  return { totalDays, daysRemaining: remaining };
};

export default function EmployeeSubscription() {
  const { data, isLoading, isError, error } = useGetEmployeeSubscriptionQuery();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<"All" | UiStatus>("All");

  // Map API -> UI rows
  const rows: SubscriptionRow[] = useMemo(() => {
    const results = data?.results ?? [];
    return results.map((r: any): SubscriptionRow => {
      const uiStatus = toUiStatus(r.status, r.paused_at);
      const buildingName = getBuildingName(r);
      const apartmentNumber = r?.apartment?.apartment_number ?? "";
      const property = [apartmentNumber, buildingName]
        .filter(Boolean)
        .join(", ");

      // Fallback for region: prefer r.region.name, else building/apartment region_name
      const regionName =
        r?.region?.name ??
        r?.building?.region_name ??
        r?.apartment?.building?.region_name ??
        "";

      const ownerName = r?.user?.name ?? "Unknown";
      const owner = `${ownerName} • ${regionName || "Unknown Region"}`;

      const start = r.start_date;
      const end = r.current_period_end;
      const { totalDays, daysRemaining } = computeTimeline(
        start,
        end,
        uiStatus
      );

      return {
        id: r.id,
        property,
        owner,
        region: regionName,
        building: buildingName,
        status: uiStatus,
        daysRemaining,
        totalDays,
        autoRenew: r?.plan?.auto_renewal ?? null,
      };
    });
  }, [data]);

  const filtered = useMemo(() => {
    return rows.filter((s) => {
      const matchesSearch = s.property
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || s.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rows, search, statusFilter]);

  const handleSelectAll = (check: boolean) => {
    if (check) setSelected(filtered.map((s) => s.id));
    else setSelected([]);
  };

  const selectSingle = (id: number, check: boolean) => {
    if (check) setSelected((prev) => [...prev, id]);
    else setSelected((prev) => prev.filter((x) => x !== id));
  };

  if (isLoading) {
    return <div className="p-6">Loading subscriptions…</div>;
  }
  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load subscriptions
        {(error as any)?.status ? ` (status ${(error as any).status})` : ""}.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
      </div>
      <p className="text-gray-500">
        Manage all property subscriptions and billing cycles
      </p>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-2 border rounded-md w-full"
          />
        </div>

        {/* Status Filter */}
        <select
          className="border rounded-md px-3 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="All">All Status</option>
          <option value="active">Active</option>
          <option value="due">Due</option>
          <option value="paused">Paused</option>
          <option value="stopped">Stopped</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">
              </th>
              <th className="p-3">Property & Owner</th>
              <th className="p-3">Timeline</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sub) => {
              const progress = Math.min(
                100,
                ((sub.totalDays - Math.max(0, sub.daysRemaining)) /
                  sub.totalDays) *
                  100
              );

              let progressColor = "bg-blue-600";
              if (sub.status === "active") progressColor = "bg-green-500";
              else if (sub.status === "due") progressColor = "bg-orange-600";
              else if (sub.status === "paused") progressColor = "bg-blue-600";
              else if (sub.status === "stopped") progressColor = "bg-red-600";

              return (
                <tr key={sub.id} className="border-b">
                  <td className="p-3">
                    <Checkbox
                      checked={selected.includes(sub.id)}
                      onCheckedChange={(val) =>
                        selectSingle(sub.id, val as boolean)
                      }
                    />
                  </td>
                  <td className="p-3">
                    <div className="font-medium">{sub.property}</div>
                    <div className="text-xs text-gray-500">{sub.owner}</div>
                  </td>
                  <td className="p-3">
                    <div className="w-full bg-gray-200 rounded-full">
                      <div
                        className={`${progressColor} text-xs text-white text-center p-0 leading-none rounded-full`}
                        style={{ width: `${progress}%` }}
                      >
                        {Math.round(progress)}%
                      </div>
                    </div>
                    {sub.daysRemaining > 0 ? (
                      <span className="text-xs text-blue-600">
                        {sub.daysRemaining} days remaining
                      </span>
                    ) : sub.daysRemaining < 0 ? (
                      <span className="text-xs text-orange-500">
                        {Math.abs(sub.daysRemaining)} days overdue
                      </span>
                    ) : (
                      <span className="text-xs text-red-600">
                        Subscription ended
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td className="p-6 text-center text-gray-500" colSpan={4}>
                  No subscriptions match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
