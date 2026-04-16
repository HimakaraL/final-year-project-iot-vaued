import ReactECharts from "echarts-for-react";

export default function Gauge({ data }) {
  const latest = data[data.length - 1];

  const option = {
    series: [
      {
        type: "gauge",
        progress: { show: true },
        detail: { valueAnimation: true },
        data: [{ value: latest?.gas?.aqi || 0 }],
      },
    ],
  };

  return <ReactECharts option={option} />;
}