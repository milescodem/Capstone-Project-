import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import insuranceRouter from "../Router/insuranceRouter.js";
import clientRouter from "../Router/clientRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

// Insurance login route
app.use("/insurance", insuranceRouter);
app.use("/clients", clientRouter);

mongoose.connect("mongodb://127.0.0.1:27017/ClientsDB")
  .then(() => {
    console.log("Connected to ClientsDB");
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});