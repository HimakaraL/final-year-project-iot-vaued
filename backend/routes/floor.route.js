import express from "express";
import {
  createFloor,
  getFloors,
  updateFloor,
  deleteFloor,
} from "../controllers/floor.controller.js";

const router = express.Router();

router.post("/create", createFloor);
router.get("/", getFloors);
router.put("/update/:id", updateFloor);
router.delete("/delete/:id", deleteFloor);

export default router;
