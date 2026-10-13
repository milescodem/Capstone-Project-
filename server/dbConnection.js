```js
import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ClientsDB");

    console.log("Connected to ClientsDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);

    throw error;
  }
}

export default connectToDB;
```


const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = dbConnection;

