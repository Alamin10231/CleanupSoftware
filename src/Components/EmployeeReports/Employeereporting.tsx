

type Kpi = {
  title: string;
  value: string;
  delta: string;        // e.g., "+12.5%"
  positive?: boolean;   // color the delta green if true, red if false
  suffix?: string;      // optional unit suffix for value (e.g., "%")
};

const KPICard = ({ title, value, delta, positive = true, suffix }: Kpi) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5">
    <div className="text-gray-600 text-sm">{title}</div>
    <div className="mt-2 text-2xl font-semibold text-gray-900">
      {value}
      {suffix ? <span className="text-lg align-top ml-0.5">{suffix}</span> : null}
    </div>
    <div className="mt-2 text-xs text-gray-500">
      <span className={positive ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
        {delta}
      </span>{" "}
      <span className="text-gray-400">vs last month</span>
    </div>
  </div>
);

export default function Employeereporting() {
  const kpis: Kpi[] = [
    { title: "Total Tasks",        value: "120", delta: "+12.5%", positive: true },
    { title: "Completed Tasks",    value: "95",  delta: "+12.5%", positive: true },
    { title: "Average Attendance", value: "92",  delta: "-2%",    positive: false, suffix: "%" },
    { title: "Average Rating",     value: "4.5", delta: "+12.5%", positive: true },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Supervisor Reporting
        </h1>
       
      </div>

      {/* Subheading */}
      <h2 className="text-lg font-semibold text-gray-900">Summary KPIs</h2>

      {/* KPI Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <KPICard key={i} {...k} />
        ))}
      </div>
    </div>
  );
}
