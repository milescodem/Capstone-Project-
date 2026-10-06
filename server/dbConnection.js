```js
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
```

import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ClientsDB");

    console.log("Connected to ClientsDB");
    console.log("Mongoose readyState:", mongoose.connection.readyState);
    console.log("Database name:", mongoose.connection.name);

  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

export default connectToDB;

