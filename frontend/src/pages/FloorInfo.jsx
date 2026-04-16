import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LineChart from "../analytics/LineChart";
import BarChart from "../analytics/BarChart";
import PieChart from "../analytics/PieChart";
import GaugeChart from "../analytics/Gauge";
import Table from "../analytics/Table";

export default function FloorInfo() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/backend/sensor/floor/${id}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [id]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Floor Analytics</h1>

      <LineChart data={data} />
      <BarChart data={data} />
      <PieChart data={data} />
      <GaugeChart data={data} />
      <Table data={data} />
    </div>
  );
}