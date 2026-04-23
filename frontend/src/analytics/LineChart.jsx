import ReactECharts from "echarts-for-react";
import Card from "./Card";

export default function LineChart({ data }) {
  const option = {
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: data.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Temperature",
        type: "line",
        data: data.map((d) => d.temperature),
        smooth: true,
        color: "#EF4444",
      },
      {
        name: "Humidity",
        type: "line",
        data: data.map((d) => d.humidity),
        smooth: true,
        color: "#3B82F6",
      },
    ],
  };

  return (
    <Card title="Temperature & Humidity Trend">
      <ReactECharts option={option} style={{ height: 300 }} />
    </Card>
  );
}