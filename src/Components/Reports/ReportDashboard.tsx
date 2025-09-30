import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', uv: 8000, pv: 5000, amt: 7000 },
  { name: 'Feb', uv: 12000, pv: 10000, amt: 11000 },
  { name: 'Mar', uv: 6000, pv: 9000, amt: 8000 },
  { name: 'Apr', uv: 15000, pv: 12000, amt: 14000 },
  { name: 'May', uv: 10000, pv: 7000, amt: 9000 },
  { name: 'Jun', uv: 18000, pv: 15000, amt: 17000 },
  { name: 'Jul', uv: 14000, pv: 13000, amt: 16000 },
  { name: 'Aug', uv: 20000, pv: 17000, amt: 19000 },
  { name: 'Sep', uv: 22000, pv: 21000, amt: 20000 },
  { name: 'Oct', uv: 25000, pv: 23000, amt: 24000 },
  { name: 'Nov', uv: 28000, pv: 26000, amt: 27000 },
  { name: 'Dec', uv: 30000, pv: 28000, amt: 29000 },
];

const ReportDashboard = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
        barCategoryGap="20%" // spacing between groups of bars
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          ticks={[0, 10000, 20000, 30000]}
          tickFormatter={(value) => (value === 0 ? '0' : `${value / 1000}k`)}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="pv"
          fill="#8884d8"
          radius={[10, 10, 0, 0]} // rounded top corners
          barSize={20} // width of each bar
          activeBar={<Rectangle fill="pink" stroke="blue" radius={[10, 10, 0, 0]} />}
        />
        <Bar
          dataKey="uv"
          fill="#82ca9d"
          radius={[10, 10, 0, 0]}
          barSize={20}
          activeBar={<Rectangle fill="gold" stroke="purple" radius={[10, 10, 0, 0]} />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReportDashboard;
