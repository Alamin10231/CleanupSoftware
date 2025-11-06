import { useMemo, useState } from "react";
import { assets, Subscription as KpiCards } from "../../assets/assets";
import SubscriptionsTable from "./SubscriptionsTable";
import {
  useGetCalculationSubscriptionsQuery,
  useGetSubscriptionPageQuery,
} from "@/redux/features/admin/subscription/subscription.api";

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

  // const price = typeof plan?.amount === "number" ? `$${plan.amount}/month` : "";
  const amount = typeof plan?.amount === "number" ? plan.amount : 0;
const pkg = plan?.name ? `${plan.name} Package $${amount.toFixed(2)}/month` : "-";

  const nextPaymentRaw = item?.next_payment_date ?? item?.current_period_end;

  return {
    id: item.id,
    name: user?.name ?? "-",
    email: user?.email ?? "-",
    status: titleCase(item?.status ?? "inactive"),
    location: location || (bld?.location ?? "-"),
    package: pkg,
    startDate: fmtDate(item?.start_date),
    countdown: countdownText(item?.remaining_days),
    nextPayment: fmtDate(nextPaymentRaw),
    invoice: (item?.payment ?? "").toLowerCase() === "prepaid",
  };
}

/* ---------- Component ---------- */
export default function SubscriptionsDashboard() {
  const [statusFilter, setStatusFilter] = useState("All status");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: kpis, isLoading: kpisLoading } =
    useGetCalculationSubscriptionsQuery();

  const { data: pageData, isFetching: subsLoading } =
    useGetSubscriptionPageQuery({
      page,
      page_size: pageSize,
      status: statusFilter,
    });

  const rows: TableRow[] = useMemo(
    () => (pageData?.results ?? []).map(apiToRow),
    [pageData]
  );

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

  const [searchItem, setSearchItem] = useState("");

  const filterrows = useMemo(() => {
    if (!searchItem) return rows;

    return rows.filter(
      (row) =>
        row.name.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()) ||
        row.email
          .toLocaleLowerCase()
          .includes(searchItem.toLocaleLowerCase()) ||
        row.package.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase())
    );
  }, [rows, searchItem]);

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
      <h1 className="text-xl md:text-2xl font-semibold">All Subscribers</h1>
      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
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
                  className="bg-white flex  border border-gray-300 rounded-md p-5 py-8 items-center justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-500 text-sm md:text-base font-semibold">
                      {a.title}
                    </p>
                    <p className="text-black font-bold text-lg md:text-xl">
                      {display}
                    </p>
                  </div>
                  {icon && (
                    <div className="p-3 bg-blue-100 rounded-xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                      <img
                        src={icon}
                        alt={a.iconAlt}
                        className="w-6 h-6 md:w-8 md:h-8"
                      />
                    </div>
                  )}
                </div>
              );
            })}
      </div>

      {/* Table header & filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className=" rounded-md">
            <input
              type="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              name="search"
              placeholder="search"
              id=""
              className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full sm:w-auto"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-600 cursor-pointer w-full sm:w-auto"
          >
            <option value="">All status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="past_due">Past Due</option>
            <option value="inactive">Inactive</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <SubscriptionsTable
          rows={filterrows}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>

      {subsLoading && (
        <p className="text-sm text-gray-500 mt-2">Loading subscriptions…</p>
      )}
    </div>
  );
}
