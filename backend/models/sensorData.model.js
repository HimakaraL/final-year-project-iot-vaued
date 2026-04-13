import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema(
  {
    floor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
      required: true,
    },

    sensor_id: String,

    temperature: Number,
    humidity: Number,

    gas: {
      aqi: Number,
      risk: String,
    },

    bottle: {
      weight_g: Number,
      fill_pct: Number,
      is_empty: Boolean,
    },

    rfid: {
      item_count: Number,
      in_stock: Number,
      missing: Number,
      items: [
        {
          name: String,
          tag_id: String,
          in_stock: Boolean,
        },
      ],
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const SensorData = mongoose.model("SensorData", sensorDataSchema);

export default SensorData;