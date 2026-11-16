
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import clientRouter from "./routes/clientRouter.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import chatbotRouter from "./routes/chatbotRouter.js";
import adminRouter from "./routes/adminRouter.js";

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "capstone-project-front-end-zeta.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Application routes
app.use("/clients", clientRouter);
app.use("/appointments", appointmentRouter);
app.use("/chatbot", chatbotRouter);
app.use("/admin", adminRouter);

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to ClientsDB");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
