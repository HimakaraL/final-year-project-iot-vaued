import express from "express";
import {
  createSensorData,
  getSensorDataByFloor,
  getLatestData,
} from "../controllers/sensor.controller.js";

const router = express.Router();

router.post("/create", createSensorData);
router.get("/floor/:floorId", getSensorDataByFloor);
router.get("/latest/:floorId", getLatestData);

export default router;