import {
  LineChart as LC,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function LineChart({ data }) {
  const chartData = data.map(d => ({
    time: new Date(d.timestamp).toLocaleTimeString(),
    temperature: d.temperature,
    humidity: d.humidity,
  }));

  return (
    <LC width={600} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
    </LC>
  );
}