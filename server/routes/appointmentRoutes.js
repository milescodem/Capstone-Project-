
import express from "express";
import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";
import Client from "../models/clients.js";

const router = express.Router();

// CREATE an appointment
router.post("/", async (req, res) => {
  console.log("Appointment request received:", req.body);

  try {
    const {
      clientId,
      therapyType,
      therapyClass,
      date,
      time,
      comments,
    } = req.body;

    if (
      !clientId ||
      !mongoose.isValidObjectId(clientId) ||
      !therapyType ||
      !therapyClass ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        error: "Please provide a valid client and complete appointment details.",
      });
    }

    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({
        error: "Client account was not found. Please log in again.",
      });
    }

    const appointment = await Appointment.create({
      clientId,
      therapyType,
      therapyClass,
      date,
      time,
      comments,
    });

    res.status(201).json({
      message: "Appointment scheduled successfully",
      appointment,
    });
  } catch (error) {
    console.error("Appointment creation error:", error);

    res.status(500).json({
      error: "Could not save appointment.",
    });
  }
});

// GET an appointment by ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid appointment ID." });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    res.json({ appointment });
  } catch (error) {
    console.error("Get appointment error:", error);
    res.status(500).json({ error: "Could not retrieve appointment." });
  }
});

export default router;