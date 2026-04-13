import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import floorRoutes from "./routes/floor.route.js";
import sensorRoutes from "./routes/sensor.route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(err)
    });
    
const __dirname = path.resolve();

const app = express();

app.use(express.json())
app.use(cookieParser());

app.use("/backend/user", userRoutes)
app.use("/backend/auth", authRoutes)
app.use("/backend/floors", floorRoutes);
app.use("/backend/sensor", sensorRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(3002, () => {
    console.log("Server is listening")
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})