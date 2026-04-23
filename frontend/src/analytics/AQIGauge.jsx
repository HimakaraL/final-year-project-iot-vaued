import ReactECharts from "echarts-for-react";
import Card from "./Card";

export default function AQIGauge({ data }) {
  if (!data) return null;

  const option = {
    series: [
      {
        type: "gauge",
        min: 0,
        max: 500,

        radius: "90%", 

        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [0.3, "#22C55E"], 
              [0.7, "#FACC15"], 
              [1, "#EF4444"], 
            ],
          },
        },

        pointer: {
          length: "60%",
          width: 4,
        },

        detail: {
          valueAnimation: true,
          fontSize: 18, 
          offsetCenter: [0, "60%"], 
          color: "#1E3A8A",
        },

        title: {
          offsetCenter: [0, "85%"], 
          fontSize: 12,
        },

        data: [{ value: data.gas.aqi, name: "AQI" }],
      },
    ],
  };

  return (
    <Card title="Air Quality Index">
      <ReactECharts option={option} style={{ height: 200 }} />
      <p className="text-center mt-2 font-semibold text-red-500">
        {data.gas.risk}
      </p>
    </Card>
  );
}
