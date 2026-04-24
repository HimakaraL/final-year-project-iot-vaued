import { GoogleGenerativeAI } from "@google/generative-ai";
import { getIoTData } from "../utils/chat.js";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAssistant = async (req, res, next) => {
  try {
    const { message } = req.body;

    const data = await getIoTData();

    const prompt = `
      You are an AI assistant for a Smart First Aid IoT Dashboard.

      Response important rules:

      - You are an assistant for an IoT-based Smart First Aid Dashboard.

      - The system includes:
        - Floors
        - Sensor readings (temperature, humidity, gas)
        - Inventory (medical supplies)
        - Safety anomalies

      - any question about:
        - floors
        - comparisons between floors
        - criticality
        - safety levels
        - anomalies
        - risk
        - “most / least / highest / lowest”
      is considered valid IoT question.

      - Only refuse if the question is completely unrelated (e.g. sports, politics, entertainment).

      - If unrelated, respond:
      "I can only assist with IoT dashboard data. Ask me about floors, sensors, inventory, or safety metrics."

      Critical floor definition:

        A floor is considered more critical if it has:
        - High CO2 levels
        - High missing medical items
        - High number of empty bottles
        - Abnormal temperature or humidity

        you should:
        - Compare ALL floors
        - Rank them
        - Return ONLY the most critical floor
        - Explain why using metrics

      System data:
      - Total Floors: ${data.totalFloors}

      Floor data:
      ${data.floors.map(f => `
      Floor: ${f.floor}
      Location: ${f.location}
      Avg Temp: ${f.avgTemp.toFixed(1)}°C
      Avg Humidity: ${f.avgHumidity.toFixed(1)}%
      Empty Bottles: ${f.emptyBottles}
      Missing Items: ${f.missingItems}
      CO2 Level: ${f.avgCO2.toFixed(1)}
      `).join("\n")}

      Latest sensor:
      ${JSON.stringify(data.globalLatest, null, 2)}

      Instructions:
      - Only answer if relevant to IoT system
      - If unrelated, refuse politely
      - If related, explain clearly and give insights
      `;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      role: "assistant",
      content: text,
    });
  } catch (error) {
    console.error("GEMINI CHAT ERROR:", error);
    next(errorHandler(500, error.message));
  }
};