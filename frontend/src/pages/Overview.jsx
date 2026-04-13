import { useEffect, useState } from "react";

export default function Overview() {
  const [floors, setFloors] = useState([]);

  const API_URL = "/backend/floors";

  // Fetch floors
  const fetchFloors = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      console.log("floors:", data);

      if (Array.isArray(data)) {
        setFloors(data);
      } else {
        setFloors([]);
      }
    } catch (err) {
      console.error(err);
      setFloors([]);
    }
  };

  useEffect(() => {
    fetchFloors();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-5xl font-bold text-[#1E3A8A]">
          Floors Overview
        </h1>
      </div>

      <div className="flex justify-between items-center gap-6 px-12">
        <div className="border-4 h-[40vh] rounded-lg flex-1 flex items-center justify-center text-xl font-semibold text-gray-500"></div>

        <div className="border-4 h-[40vh] rounded-lg flex-1 flex items-center justify-center text-xl font-semibold text-gray-500"></div>
      </div>

      <div className="w-full px-4 md:px-12 mt-1">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
          <h2 className="text-lg font-semibold mb-4">All Floors</h2>

          {floors.length === 0 ? (
            <p className="text-gray-500">No floors added yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {floors.map((floor) => (
                <div
                  key={floor._id}
                  className="border rounded-xl p-5 hover:shadow-lg transition bg-white"
                >
                  <h3 className="text-lg font-bold text-[#1E3A8A]">
                    {floor.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    Floor: {floor.floorNumber}
                  </p>

                  <p className="text-sm text-gray-600">
                    Location: {floor.location || "N/A"}
                  </p>

                  {/* <p className="text-sm text-gray-600">
                    Sensor: {floor.sensor_id || "N/A"}
                  </p> */}

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-4">
                    <button className="text-blue-600 hover:underline">
                      View Analytics →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
