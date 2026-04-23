export const generateNotifications = (floors) => {
  const notifications = [];

  const isCriticalGas = (d) => d?.gas?.risk === "CRITICAL";
  const isHighTemp = (d) => d?.temperature > 50;
  const isMissingRFID = (d) => (d?.rfid?.missing ?? 0) > 3;

  const isTiltCritical = (d) =>
    Math.abs(d?.tilt?.pitch || 0) > 25 ||
    Math.abs(d?.tilt?.roll || 0) > 25;

  floors.forEach((floor) => {
    const d = floor.latest;

    if (!d) {
      notifications.push({
        type: "warning",
        title: floor.name,
        message: "No sensor data available",
      });
      return;
    }

    if (!floor.sensor_id) {
      notifications.push({
        type: "warning",
        title: floor.name,
        message: "Sensor not connected",
      });
    }

    if (isCriticalGas(d)) {
      notifications.push({
        type: "danger",
        title: floor.name,
        message: "CRITICAL gas levels detected",
      });
    }

    if (isHighTemp(d)) {
      notifications.push({
        type: "danger",
        title: floor.name,
        message: `High temperature (${d.temperature}°C)`,
      });
    }

    if (isMissingRFID(d)) {
      notifications.push({
        type: "warning",
        title: floor.name,
        message: `Missing items (${d.rfid.missing})`,
      });
    }

    if (isTiltCritical(d)) {
      notifications.push({
        type: "danger",
        title: floor.name,
        message: "Tilt anomaly detected",
      });
    }
  });

  return notifications;
};