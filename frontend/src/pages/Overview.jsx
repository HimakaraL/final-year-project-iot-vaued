import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdFilterList } from "react-icons/md";

// Card
function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-sm font-semibold text-gray-500 mb-2">{title}</h2>
      {children}
    </div>
  );
}

export default function Overview() {
  const [floors, setFloors] = useState([]);
  const [searchFloor, setSearchFloor] = useState("");

  const isCriticalGas = (d) => d?.gas?.risk === "CRITICAL";
  const isHighTemp = (d) => d?.temperature > 50;
  const isMissingRFID = (d) => (d?.rfid?.missing ?? 0) > 3;

  const isTiltWarning = (d) => {
    if (!d?.tilt) return false;

    return Math.abs(d.tilt.pitch) > 10 || Math.abs(d.tilt.roll) > 10;
  };

  const isTiltCritical = (d) => {
    if (!d?.tilt) return false;

    return Math.abs(d.tilt.pitch) > 25 || Math.abs(d.tilt.roll) > 25;
  };

  const API_URL = "/backend/floors";
  const navigate = useNavigate();

  const getLatestSensor = (data) => {
    if (!data) return null;

    if (Array.isArray(data)) {
      return data[data.length - 1] || null;
    }

    if (data.data && Array.isArray(data.data)) {
      return data.data[data.data.length - 1] || null;
    }

    return data;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const enriched = await Promise.all(
          (Array.isArray(data) ? data : []).map(async (floor) => {
            try {
              const sensorRes = await fetch(
                `/backend/sensor/floor/${floor._id}`,
              );
              const sensorData = await sensorRes.json();

              return {
                ...floor,
                latest: getLatestSensor(sensorData) || null,
              };
            } catch {
              return { ...floor, latest: null };
            }
          }),
        );

        setFloors(enriched);
      } catch {
        setFloors([]);
      }
    };

    loadData();

    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const getRiskScore = (d) => {
    if (!d) return 30; 

    let score = 0;

    if (isCriticalGas(d)) score += 50;
    if (isHighTemp(d)) score += 20;
    if (isMissingRFID(d)) score += 10;
    if (isTiltCritical(d)) score += 50;
    else if (isTiltWarning(d)) score += 20;

    if (!d.temperature || !d.humidity || !d.gas) score += 30;

    return Math.min(score, 100);
  };

  const getRiskLevel = (score) => {
    if (score >= 70)
      return { label: "Critical", color: "#EF4444", bg: "bg-red-100" };
    if (score >= 30)
      return { label: "Warning", color: "#F59E0B", bg: "bg-yellow-100" };
    return { label: "Stable", color: "#22C55E", bg: "bg-green-100" };
  };

  // stats
  const totalFloors = floors.length;
  const locations = new Set(floors.map((f) => f.location)).size;

  const activeSensors = floors.filter((f) => f.latest && f.latest.gas).length;

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen space-y-6">
      <h1 className="text-3xl md:text-5xl font-bold text-[#1E3A8A]">
        Floors Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total Floors">
          <p className="text-2xl font-bold text-[#1E3A8A]">{totalFloors}</p>
        </Card>

        <Card title="Locations">
          <p className="text-2xl font-bold text-[#3B82F6]">{locations}</p>
        </Card>

        <Card title="Active Monitoring">
          <p className="text-2xl font-bold text-green-600">{activeSensors}</p>
        </Card>

        {/* <Card title="Critical Floors">
          <p className="text-2xl font-bold text-red-500">{inactiveFloors}</p>
        </Card> */}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-[#1E3A8A]">
          Floor Health Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {floors.map((floor) => {
            const d = floor.latest;
            const score = getRiskScore(d);
            const health = getRiskLevel(score);

            return (
              <div
                key={floor._id}
                className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition border-l-4"
                style={{ borderColor: health.color }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-[#1E3A8A]">{floor.name}</h3>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${health.bg}`}
                  >
                    {health.label}
                  </span>
                </div>

                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p>Floor: {floor.floorNumber}</p>
                  <p>Location: {floor.location || "N/A"}</p>

                  <p>
                    Gas Risk:{" "}
                    <span
                      className={
                        isCriticalGas(d)
                          ? "text-red-600 font-bold bg-red-100 px-2 py-1 rounded"
                          : ""
                      }
                    >
                      {d?.gas?.risk || "N/A"}
                    </span>
                  </p>

                  <p>
                    Temp:{" "}
                    <span
                      className={
                        isHighTemp(d)
                          ? "text-red-600 font-bold bg-red-100 px-2 py-1 rounded"
                          : ""
                      }
                    >
                      {d?.temperature ?? "N/A"}°C
                    </span>{" "}
                    | Humidity: {d?.humidity ?? "N/A"}%
                  </p>

                  <p>
                    RFID Missing:{" "}
                    <span
                      className={
                        isMissingRFID(d)
                          ? "text-red-600 font-bold bg-red-100 px-2 py-1 rounded"
                          : ""
                      }
                    >
                      {d?.rfid?.missing ?? 0}
                    </span>
                  </p>

                  <p>
                    Tilt:{" "}
                    <span
                      className={
                        isTiltCritical(d)
                          ? "text-red-600 font-bold bg-red-100 px-2 py-1 rounded"
                          : isTiltWarning(d)
                            ? "text-yellow-600 font-bold bg-yellow-100 px-2 py-1 rounded"
                            : ""
                      }
                    >
                      P: {d?.tilt?.pitch ?? 0}° | R: {d?.tilt?.roll ?? 0}°
                    </span>
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  {health.label === "Stable"
                    ? "All systems operational"
                    : "Attention required"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search by floor number..."
          value={searchFloor}
          onChange={(e) => setSearchFloor(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <MdFilterList className="absolute left-3 top-2.5 text-gray-500 text-xl" />
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
        <h2 className="text-lg font-semibold mb-4 text-[#1E3A8A]">
          All Floors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {floors
            .filter((f) =>
              f.floorNumber
                ?.toString()
                .toLowerCase()
                .includes(searchFloor.toLowerCase()),
            )
            .map((floor) => {
              return (
                <div
                  key={floor._id}
                  className="border rounded-2xl p-5 hover:shadow-xl transition bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-[#1E3A8A]">
                        {floor.name}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600 mt-2">
                      Floor: {floor.floorNumber}
                    </p>

                    <p className="text-sm text-gray-600">
                      Location: {floor.location || "N/A"}
                    </p>
                  </div>

                  <button
                    className="mt-4 text-sm text-[#3B82F6] font-semibold hover:underline self-end"
                    onClick={() => navigate(`/floor/${floor._id}`)}
                  >
                    View Analytics →
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
