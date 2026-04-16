import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema(
  {
    floor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
      required: true,
      index: true,
    },

    sensor_id: {
      type: String,
      default: "unknown",
    },

    temperature: {
      type: Number,
      default: 0,
    },

    humidity: {
      type: Number,
      default: 0,
    },

    accel: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      z: { type: Number, default: 0 },
    },

    gyro: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      z: { type: Number, default: 0 },
    },

    tilt: {
      pitch: { type: Number, default: 0 },
      roll: { type: Number, default: 0 },
    },

    mpu_temp: {
      type: Number,
      default: 0,
    },

    gas: {
      ethanol: { type: Number, default: 0 },
      nh3: { type: Number, default: 0 },
      co2: { type: Number, default: 0 },
      acetone: { type: Number, default: 0 },
      formalin: { type: Number, default: 0 },
      chlorof: { type: Number, default: 0 },
      h2o2: { type: Number, default: 0 },

      aqi: { type: Number, default: 0 },
      risk: { type: String, default: "SAFE" },

      co2_pct: { type: Number, default: 0 },
      o2_pct: { type: Number, default: 20.95 },
      saturated: { type: Boolean, default: false },
      alert: { type: Boolean, default: false },
    },

    cotton: {
      present: { type: Boolean, default: false },
      count: { type: Number, default: 0 },
      channels: { type: [Boolean], default: [] },
    },

    bottle: {
      weight_g: { type: Number, default: 0 },
      fill_pct: { type: Number, default: 0 },
      is_empty: { type: Boolean, default: false },
      scale_ready: { type: Boolean, default: false },
    },

    rfid: {
      item_count: { type: Number, default: 0 },
      in_stock: { type: Number, default: 0 },
      missing: { type: Number, default: 0 },

      items: [
        {
          name: { type: String, default: "" },
          tag_id: { type: String, default: "" },
          in_stock: { type: Boolean, default: false },
        },
      ],
    },

    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

sensorDataSchema.index(
  { timestamp: 1 },
  { expireAfterSeconds: 604800 }
);

sensorDataSchema.index({ floor_id: 1, timestamp: 1 });

const SensorData = mongoose.model("SensorData", sensorDataSchema);

export default SensorData;