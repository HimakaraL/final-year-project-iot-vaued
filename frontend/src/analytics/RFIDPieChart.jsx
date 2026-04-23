import ReactECharts from "echarts-for-react";
import Card from "./Card";

export default function RFIDPieChart({ data }) {
  if (!data) return null;

  const option = {
    series: [
      {
        type: "pie",
        radius: "70%",
        data: [
          { value: data.rfid.in_stock, name: "In Stock" },
          { value: data.rfid.missing, name: "Missing" },
        ],
      },
    ],
  };

  return (
    <Card title="Inventory Status">
      <ReactECharts option={option} style={{ height: 200 }} />
    </Card>
  );
}