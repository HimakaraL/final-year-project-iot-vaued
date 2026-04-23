import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import SensorData from "./models/sensorData.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const runImport = async () => {
  try {
    console.log("🚀 Starting import...");

    await mongoose.connect(process.env.MONGO);
    console.log("✅ MongoDB connected");
    console.log("📦 DB Name:", mongoose.connection.name);
    console.log("🌐 Host:", mongoose.connection.host);
    console.log("📁 Collection:", SensorData.collection.name);

    const safeDate = (value) => {
      const date = new Date(value);
      return isNaN(date.getTime()) ? new Date() : date;
    };

    const deleted = await SensorData.deleteMany({});
    console.log("🧹 Old data cleared:", deleted.deletedCount);

    const filePath = path.join(__dirname, "data.json");

    if (!fs.existsSync(filePath)) {
      throw new Error("data.json file not found at: " + filePath);
    }

    const rawData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    console.log("📊 Raw records loaded:", rawData.length);

    if (!rawData.length) {
      throw new Error("JSON file is empty!");
    }

    const half = Math.floor(rawData.length / 2);
    const floor1Data = rawData.slice(0, half);
    const floor2Data = rawData.slice(half);

    console.log("🏢 Floor 1 records:", floor1Data.length);
    console.log("🏢 Floor 2 records:", floor2Data.length);

    const FLOOR_1_ID = new mongoose.Types.ObjectId(
      "69dd22ab39cd1ab2c18b40ca"
    );

    const FLOOR_2_ID = new mongoose.Types.ObjectId(
      "69dd235d39cd1ab2c18b40cd"
    );

    const transform = (dataset, floorId) =>
      dataset.map((d) => ({
        floor_id: floorId,

        temperature: d.temperature,
        humidity: d.humidity,

        accel: d.accel,
        gyro: d.gyro,
        tilt: d.tilt,
        mpu_temp: d.mpu_temp,

        gas: d.gas,
        cotton: d.cotton,
        bottle: d.bottle,

        rfid: {
          item_count: d.rfid?.item_count || 0,
          in_stock: d.rfid?.in_stock || 0,
          missing: d.rfid?.missing || 0,

          items: (d.rfid?.items || [])
            .filter((i) => i.name && i.tag_id)
            .map((i) => ({
              name: i.name,
              tag_id: i.tag_id,
              in_stock: i.in_stock ?? false,
            })),
        },

        timestamp: safeDate(d.timestamp),
      }));

    const finalData = [
      ...transform(floor1Data, FLOOR_1_ID),
      ...transform(floor2Data, FLOOR_2_ID),
    ];

    console.log("📦 Final records to insert:", finalData.length);

    const result = await SensorData.insertMany(finalData, {
      ordered: false,
    });

    console.log("🎉 Insert completed!");
    console.log("📥 Inserted docs:", result.length);

    const count = await SensorData.countDocuments();
    console.log("🔥 TOTAL IN DB NOW:", count);

    const sample = await SensorData.findOne().lean();
    console.log("🔎 SAMPLE DOC:", sample);

    process.exit();
  } catch (err) {
    console.error("❌ ERROR:", err.message);
    console.error(err);
    process.exit(1);
  }
};

runImport();