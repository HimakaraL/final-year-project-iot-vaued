import SensorData from "../models/sensorData.model.js";
import Floor from "../models/floor.model.js";

export const getIoTData = async () => {
  const data = await SensorData.find()
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();

  if (!data.length) return {};

  const floors = await Floor.find().lean();

  // Build rich floor map
  const floorMap = {};
  floors.forEach((f) => {
    floorMap[f._id.toString()] = {
      name: f.name,
      floorNumber: f.floorNumber,
      location: f.location || "Unknown Location",
    };
  });

  // Aggregate data
  const enriched = data.map((d) => {
    const floor = floorMap[d.floor_id];

    return {
      ...d,
      floorName: floor?.name || "Unknown Floor",
      floorNumber: floor?.floorNumber ?? null,
      floorLocation: floor?.location || "Unknown",
    };
  });

  const latest = enriched[0];

  // Group by 
  const grouped = {};

  enriched.forEach((d) => {
    const key = `${d.floorName} (Floor ${d.floorNumber ?? "?"})`;

    if (!grouped[key]) grouped[key] = [];

    grouped[key].push(d);
  });

  const floorSummaries = Object.keys(grouped).map((floorLabel) => {
    const fData = grouped[floorLabel];

    return {
      floor: floorLabel,
      location: fData[0].floorLocation,

      totalRecords: fData.length,

      avgTemp:
        fData.reduce((s, d) => s + (d.temperature || 0), 0) /
        fData.length,

      avgHumidity:
        fData.reduce((s, d) => s + (d.humidity || 0), 0) /
        fData.length,

      emptyBottles: fData.filter((d) => d.bottle?.is_empty).length,

      noCotton: fData.filter((d) => !d.cotton?.present).length,

      missingItems: fData.reduce(
        (s, d) => s + (d.rfid?.missing || 0),
        0
      ),

      avgCO2:
        fData.reduce((s, d) => s + (d.gas?.co2 || 0), 0) /
        fData.length,

      latest: fData[0],
    };
  });

  return {
    totalFloors: floorSummaries.length,
    floors: floorSummaries,
    globalLatest: latest,
  };
};