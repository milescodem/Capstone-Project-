
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import clientRouter from "./routes/clientRouter.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import chatbotRouter from "./routes/chatbotRouter.js";
import adminRouter from "./routes/adminRouter.js";

const app = express();
// Backend test route
app.get("/", (req, res) => {
  res.json({
    message: "Physical Therapy backend is running!"
  });
});

// Allow your deployed frontend and local development frontend
//const allowedOrigins = [
//  "http://localhost:5173",
//  "http://localhost:5174",
//  "https://capstone-project-front-end-zeta.vercel.app"
//];

// CORS middleware
//app.use(cors({
//  origin: allowedOrigins,
//  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//  allowedHeaders: ["Content-Type", "Authorization"]
// }));

app.use(cors());

app.use(express.json());

// Connect to MongoDB when a request arrives
let dbConnectionPromise;

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!dbConnectionPromise) {
    dbConnectionPromise = mongoose
      .connect(process.env.DATABASE_URL)
      .catch((error) => {
        dbConnectionPromise = null;
        throw error;
      });
  }

  await dbConnectionPromise;
}

// Make sure MongoDB is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      error: "Unable to connect to the database."
    });
  }
});

// Application routes
app.use("/clients", clientRouter);
app.use("/appointments", appointmentRouter);
app.use("/chatbot", chatbotRouter);
app.use("/admin", adminRouter);

// Export Express app for Vercel
export default app;

// Start server locally
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
