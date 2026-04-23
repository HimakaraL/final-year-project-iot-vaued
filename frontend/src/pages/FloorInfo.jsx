import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LineChart from "../analytics/LineChart";
import GasBarChart from "../analytics/GasBarChart";
import RFIDPieChart from "../analytics/RFIDPieChart";
import AQIGauge from "../analytics/AQIGauge";
import BottleGauge from "../analytics/BottleGauge";
import RFIDTable from "../analytics/RFIDTable";
import TiltCard from "../analytics/TiltCard";

export default function FloorInfo() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/backend/sensor/floor/${id}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [id]);

  const latest = data[data.length - 1];

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen space-y-6">
      <h1 className="text-2xl font-bold text-[#1E3A8A]">
        Floor Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AQIGauge data={latest} />
        <BottleGauge data={latest} />
        <TiltCard data={latest} />
        <RFIDPieChart data={latest} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart data={data} />
        <GasBarChart data={latest} />
      </div>

      <RFIDTable data={latest} />
    </div>
  );
}