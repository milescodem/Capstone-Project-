
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import clientRouter from "./routes/clientRouter.js";
import appointmentRouter from "./routes/appointmentRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Client routes
app.use("/clients", clientRouter);
app.use("/appointments", appointmentRouter);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/ClientsDB")
  .then(() => {
    console.log("Connected to ClientsDB");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });