import ReactECharts from "echarts-for-react";

export default function PieChart({ data }) {
  const latest = data[data.length - 1];

  const option = {
    title: { text: "Inventory Status" },
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
        data: [
          { value: latest?.rfid?.in_stock || 0, name: "In Stock" },
          { value: latest?.rfid?.missing || 0, name: "Missing" },
        ],
      },
    ],
  };

  return <ReactECharts option={option} />;
}