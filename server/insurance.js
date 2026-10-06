import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema({
  courseId: Number,
  therapySession: String,
  clientName: String,
  userName: String,
  userInfo: Array
});

const Insurance = mongoose.model(
  "Insurance",
  insuranceSchema,
  "Insurance"
);

export default Insurance;import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema({
  courseId: Number,
  therapySession: String,
  clientName: String,
  userName: String,
  userInfo: Array
});

const Insurance = mongoose.model(
  "Insurance",
  insuranceSchema,
  "Insurance"
);

export default Insurance;