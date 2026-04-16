import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Floor() {
  const [formData, setFormData] = useState({
    name: "",
    floorNumber: "",
    location: "",
    sensor_id: "",
  });

  const navigate = useNavigate();
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "/backend/floors";

  // Fetch floors
  const fetchFloors = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      // console.log("floors:", data);

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

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add floor
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          floorNumber: Number(formData.floorNumber),
        }),
      });

      const data = await res.json();

      setFloors((prev) => [...prev, data]);
      setFormData({
        name: "",
        floorNumber: "",
        location: "",
        sensor_id: "",
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // Delete floor
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
      });

      setFloors(floors.filter((floor) => floor._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // const fetchFloorData = async (id) => {
  //   try {
  //     const res = await fetch(`/backend/sensor/floor/${id}`);
  //     const data = await res.json();
  //     console.log("Floor data:", data);
  //   }
  //   catch (err) {
  //     console.error(err);
  //   } 
  // };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1E3A8A]">
          Floor Management Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Manage smart floors and monitor connected sensor systems
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">Total Floors</p>
          <h2 className="text-2xl font-bold">{floors.length}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">Floors With Sensors</p>
          <h2 className="text-2xl font-bold">
            {floors.filter((f) => f.sensor_id).length}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">System Status</p>
          <h2 className="text-2xl font-bold text-green-600">Online</h2>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Floor</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Floor Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="number"
            name="floorNumber"
            placeholder="Floor Number"
            value={formData.floorNumber}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            name="sensor_id"
            placeholder="Sensor ID (optional)"
            value={formData.sensor_id}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="col-span-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Adding Floor..." : "Add Floor"}
          </button>
        </form>
      </div>

      {/* FLOOR LIST */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">All Floors</h2>

        {floors.length === 0 ? (
          <p className="text-gray-500">No floors added yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
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
                  <button className="text-blue-600 hover:underline" onClick={() => navigate(`/floor/${floor._id}`)}>
                    View Analytics →
                  </button>

                  <button
                    onClick={() => handleDelete(floor._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
