import { useMemo, useState } from "react";
import { Link } from "react-router";
import { assets, Subscription as KpiCards } from "../../assets/assets";
import SubscriptionsTable from "./SubscriptionsTable";
import { useGetCalculationSubscriptionsQuery, useGetSubscriptionPageQuery } from "@/redux/features/admin/subscription/subscription.api";
import { Button } from "../ui/button";

type TableRow = {
  id: number;
  name: string;
  email: string;
  status: string;
  location: string;
  package: string;
  startDate: string;
  countdown: string;
  nextPayment: string;
  invoice: boolean;
};

/* ---------- Helpers ---------- */
const titleCase = (s: string) =>
  s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s;

const parseISO = (s?: string | null) => (s ? new Date(s) : null);

const fmtDate = (s?: string | null) => {
  const d = parseISO(s);
  return d
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(d)
    : "-";
};

const countdownText = (days?: number | null) => {
  if (typeof days !== "number") return "";
  if (days <= 0) return "Due";
  if (days === 1) return "1 Day Left";
  return `${days} Days Left`;
};

/* ---------- API → Table row mapper ---------- */
function apiToRow(item: any): TableRow {
  const user = item?.user;
  const plan = item?.plan;
  const bld = item?.building;
  const apt = item?.apartment;

  const aptLabel = apt?.apartment_number ? `Apt ${apt.apartment_number}` : "";
  const bldLabel = bld?.name ? `, ${bld.name}` : "";
  const regionLabel = bld?.region_name ? ` ${bld.region_name} Region` : "";
  const location = `${aptLabel}${bldLabel}${regionLabel}`
    .trim()
    .replace(/^, /, "");

  const price = typeof plan?.amount === "number" ? `$${plan.amount}/month` : "";
  const pkg = plan?.name ? `${plan.name} Package ${price}` : "-";

  // Prefer explicit next_payment_date; fall back to current_period_end
  const nextPaymentRaw = item?.next_payment_date ?? item?.current_period_end;

  return {
    id: item.id,
    name: user?.name ?? "-",
    email: user?.email ?? "-",
    status: titleCase(item?.status ?? "inactive"),
    location: location || (bld?.location ?? "-"),
    package: pkg,
    startDate: fmtDate(item?.start_date), // ✅ from payload
    countdown: countdownText(item?.remaining_days), // ✅ from payload
    nextPayment: fmtDate(nextPaymentRaw), // ✅ next_payment_date or fallback
    invoice: (item?.payment ?? "").toLowerCase() === "prepaid",
  };
}

/* ---------- Component ---------- */
export default function SubscriptionsDashboard() {
  const [statusFilter, setStatusFilter] = useState("All status");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // KPI cards
  const { data: kpis, isLoading: kpisLoading } =
    useGetCalculationSubscriptionsQuery();

  // Server-paginated table data
  const {
    data: pageData,
    isFetching: subsLoading,
    isError: subsError,
  } = useGetSubscriptionPageQuery({
    page,
    page_size: pageSize,
    status: statusFilter,
  });

  const rows: TableRow[] = useMemo(
    () => (pageData?.results ?? []).map(apiToRow),
    [pageData]
  );

  // KPI mapping to your card titles
  const valueByTitle: Record<string, number> = {
    "Active Subscriptions": Number(kpis?.active ?? kpis?.Active ?? 0),
    "Pending Renewals": Number(kpis?.pending ?? kpis?.Pending ?? 0),
    Inactive: Number(kpis?.inactive ?? kpis?.Inactive ?? 0),
    Expired: Number(kpis?.expired ?? kpis?.Expired ?? 0),
    "Revenue This Month": Number(
      kpis?.total_revinew_last_month ??
        kpis?.total_revenue_last_month ??
        kpis?.revenue_this_month ??
        0
    ),
  };

  return (
    <div className="p-6 space-y-8">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpisLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white shadow rounded-md p-5 py-10 animate-pulse h-[112px]"
              />
            ))
          : KpiCards.map((a, index) => {
              const icon = assets[a.iconKey as keyof typeof assets];
              const raw = valueByTitle[a.title] ?? 0;
              const display =
                a.title === "Revenue This Month"
                  ? `$ ${raw.toLocaleString()}`
                  : raw.toLocaleString();
              return (
                <div
                  key={index}
                  className="bg-white shadow rounded-md p-5 py-10 flex items-center justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-500 font-semibold">{a.title}</p>
                    <p className="text-black font-bold text-xl">{display}</p>
                  </div>
                  {icon && (
                    <div className="p-3 bg-blue-100 rounded-xl w-12 h-12 flex items-center justify-center">
                      <img src={icon} alt={a.iconAlt} className="w-8 h-8" />
                    </div>
                  )}
                </div>
              );
            })}
      </div>

      {/* Table controls */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">All Subscribers</h1>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          >
            <option value={''}>All status</option>
            <option value={'active'}>Active</option>
            <option>Pending</option>
            <option>Expired</option>
            <option>Inactive</option>
          </select>

          <Link to="/subscriptionplan">
            <Button>
              View Plan
            </Button>
          </Link>
        </div>
      </div>

      {/* Error + Table + Loading hint */}
      {subsError && (
        <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded mb-3">
          Failed to load subscriptions.
        </div>
      )}

      <SubscriptionsTable
        rows={rows}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      {subsLoading && (
        <p className="text-sm text-gray-500 mt-2">Loading subscriptions…</p>
      )}
    </div>
  );
}
