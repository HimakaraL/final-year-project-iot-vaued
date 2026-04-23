import ReactECharts from "echarts-for-react";
import Card from "./Card";

export default function GasBarChart({ data }) {
  if (!data) return null;

  const gases = data.gas;

  const option = {
    xAxis: {
      type: "category",
      data: ["CO2", "NH3", "Ethanol", "Acetone"],
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: [
          gases.co2,
          gases.nh3,
          gases.ethanol,
          gases.acetone,
        ],
        color: "#3B82F6",
      },
    ],
  };

  return (
    <Card title="Gas Levels">
      <ReactECharts option={option} style={{ height: 300 }} />
    </Card>
  );
}