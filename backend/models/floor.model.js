
import mongoose from "mongoose";

const floorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  floorNumber: {
    type: Number,
    required: true
  },
  location: {
    type: String
  },
  sensor_id: {
    type: String 
  }
}, { timestamps: true });

const Floor = mongoose.model("Floor", floorSchema);

export default Floor;