import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ClientsDB");
    console.log("Connected to ClientsDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

export default connectToDB;