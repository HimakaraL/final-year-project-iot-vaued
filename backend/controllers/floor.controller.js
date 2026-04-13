import Floor from "../models/floor.model.js";
import { errorHandler } from "../utils/error.js";

// CREATE
export const createFloor = async (req, res, next) => {
  try {
    const floor = new Floor(req.body);
    await floor.save();
    res.status(201).json(floor);
  } catch (error) {
    next(errorHandler(500, "Error creating floor"));
  }
};

// GET ALL
export const getFloors = async (req, res, next) => {
  try {
    const floors = await Floor.find();
    res.status(200).json(floors);
  } catch (error) {
    next(errorHandler(500, "Error fetching floors"));
  }
};

// UPDATE
export const updateFloor = async (req, res, next) => {
  try {
    const updated = await Floor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    next(errorHandler(500, "Error updating floor"));
  }
};

// DELETE
export const deleteFloor = async (req, res, next) => {
  try {
    await Floor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Floor deleted" });
  } catch (error) {
    next(errorHandler(500, "Error deleting floor"));
  }
};