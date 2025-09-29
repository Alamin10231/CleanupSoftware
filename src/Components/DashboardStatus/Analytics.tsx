import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data02 = [
    { name: "Paid", value: 100 },
    { name: "pending", value: 200 },
    { name: "stopped", value: 100 },
    { name: "paused", value: 100 },
    { name: "paused", value: 100 },
];

const COLORS = ["#009608", "#FF9800", "#D32F2F", "#0288D1"];

export default function Analytics() {
    return (
        <div className="w-full h-12/12 rounded-xl border bg-white shadow border-gray-200 p-4">
            <h2 className="text-lg font-semibold mb-4">Analytics Report</h2>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "0.5rem",
                            padding: "0.5rem",
                        }}
                    />
                    <Legend verticalAlign="bottom" iconType="circle" />

                    <Pie
                        data={data02}
                        dataKey="value"
                        cx="50%"
                        cy="45%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        label={(props) => {
                            const { name, percent } = props as {
                                name?: string;
                                percent?: number;
                            };
                            const p =
                                typeof percent === "number" ? percent * 100 : 0;
                            return `${name ?? ""}: ${p.toFixed(0)}%`;
                        }}
                        labelLine={false}
                    >
                        {data02.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
