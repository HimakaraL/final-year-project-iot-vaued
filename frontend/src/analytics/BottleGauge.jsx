import ReactECharts from "echarts-for-react";
import Card from "./Card";

export default function BottleGauge({ data }) {
  if (!data) return null;

  const option = {
    series: [
      {
        type: "gauge",
        max: 100,

        radius: "90%",

        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [0.3, "#EF4444"], 
              [0.6, "#FACC15"], 
              [1, "#22C55E"], 
            ],
          },
        },

        pointer: {
          length: "60%",
          width: 4,
        },

        detail: {
          formatter: "{value}%",
          fontSize: 16, 
          offsetCenter: [0, "60%"], 
          color: "#1E3A8A",
        },

        title: {
          offsetCenter: [0, "85%"],
          fontSize: 12,
        },

        data: [{ value: data.bottle.fill_pct, name: "Level" }],
      },
    ],
  };

  return (
    <Card title="Bottle Level">
      <ReactECharts option={option} style={{ height: 200 }} />
    </Card>
  );
}
