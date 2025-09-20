import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { time: "10am", sales: 58, mobile: 80 },
  { time: "11am", sales: 35, mobile: 60 },
  { time: "12pm", sales: 45, mobile: 40 },
  { time: "1pm", sales: 28, mobile: 20 },
  { time: "2pm", sales: 66, mobile: 70 },
  { time: "3pm", sales: 30, mobile: 90 },
];

export default function ChartLineDots() {
  return (
    <div className=" rounded-lg border border-[#8E8E8E] bg-white shadow p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Report</h2>
      </div>

      <div className="h-72 ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ left: 12, right: 12  }}>
            <CartesianGrid vertical={false} stroke="#e5e7eb" />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5BC4FF" />
                <stop offset="100%" stopColor="#FF5BEF" />
              </linearGradient>
            </defs>

            {/* Line */}
            <Line
              type="monotone"
              dataKey="sales"
              stroke="url(#lineGradient)"
              strokeWidth={2}
              dot={{ fill: "#fff" }}
              activeDot={{ r: 6 }}
            />

            {/* X & Y Axis + Tooltip */}
            <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} ticks={[0, 20, 40, 60, 80, 100]} domain={[0, 100]} />
            <Tooltip
              cursor={{ stroke: "#94a3b8", strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #AE8FF7",
                borderRadius: "0.375rem",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
