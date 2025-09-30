import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group C', value: 300, label: 'Basic' },
  { name: 'Group A', value: 400, label: 'Premium' },
  { name: 'Group B', value: 300, label: 'Standard' },
 
];

const RADIAN = Math.PI / 180;
const COLORS = ['#2463EA', '#009608', '#FFBB28', '#FF9800'];

const renderCustomizedLabel = ({
  cx, cy, midAngle,  outerRadius, index
}: any) => {
  const radius = outerRadius + 20; 
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // line start and end
  const lineX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const lineY = cy + outerRadius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      {/* line from slice to label */}
      <line x1={lineX} y1={lineY} x2={x} y2={y} stroke="gray" />
      {/* label text */}
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {data[index].label} 
      </text>
    </>
  );
};

export default function PieReport() {
  return (
    <ResponsiveContainer width="100%" height={400} >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
