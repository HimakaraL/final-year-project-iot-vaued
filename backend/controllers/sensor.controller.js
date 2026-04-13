import SensorData from "../models/sensorData.model.js";
import { errorHandler } from "../utils/error.js";

// INSERT DATA 
export const createSensorData = async (req, res, next) => {
  try {
    const data = new SensorData(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    next(errorHandler(500, "Error saving sensor data"));
  }
};

// GET BY FLOOR
export const getSensorDataByFloor = async (req, res, next) => {
  try {
    const data = await SensorData.find({
      floor_id: req.params.floorId,
    }).sort({ timestamp: 1 });

    res.status(200).json(data);
  } catch (error) {
    next(errorHandler(500, "Error fetching data"));
  }
};

// GET LATEST
export const getLatestData = async (req, res, next) => {
  try {
    const data = await SensorData.findOne({
      floor_id: req.params.floorId,
    }).sort({ timestamp: -1 });

    res.status(200).json(data);
  } catch (error) {
    next(errorHandler(500, "Error fetching latest data"));
  }
};