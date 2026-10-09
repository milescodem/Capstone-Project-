
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    therapyType: {
      type: String,
      required: true,
    },

    therapyClass: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    comments: {
      type: String,
      default: "",
    },

    requestedDate: {
      type: String,
      default: "",
    },

    requestedTime: {
      type: String,
      default: "",
    },

    changeRequestStatus: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;