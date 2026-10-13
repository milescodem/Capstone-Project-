import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Client from "../models/clients.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// Verify that the request comes from a signed-in admin
function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Please sign in as an administrator.",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        error: "Server authentication is not configured.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin" || !decoded.adminId) {
      return res.status(403).json({
        error: "Administrator access required.",
      });
    }

    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Your admin session is invalid or expired. Please sign in again.",
    });
  }
}

// Admin sign-in
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        error: "Username and password are required.",
      });
    }

    const admin = await Admin.findOne({ userName });

    if (!admin) {
      return res.status(401).json({
        error: "Invalid admin username or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Invalid admin username or password.",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        error: "Server authentication is not configured.",
      });
    }

    const token = jwt.sign(
      {
        adminId: admin._id.toString(),
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      message: "Admin sign-in successful.",
      token,
      userName: admin.userName,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      error: "Could not sign in.",
    });
  }
});

// Get all clients (admin only)
router.get("/clients", requireAdmin, async (req, res) => {
  try {
    const clients = await Client.find()
      .select("-password")
      .lean();

    return res.json(clients);
  } catch (error) {
    console.error("Get clients error:", error);
    return res.status(500).json({
      error: "Could not retrieve clients.",
    });
  }
});

// Get all appointments (admin only)
router.get("/appointments", requireAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("clientId", "firstName lastName userName email")
      .sort({ date: 1, time: 1 })
      .lean();

    return res.json(appointments);
  } catch (error) {
    console.error("Get appointments error:", error);
    return res.status(500).json({
      error: "Could not retrieve appointments.",
    });
  }
});

// Edit an appointment (admin only)
router.put("/appointments/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "Invalid appointment ID.",
      });
    }

    // Only allow these appointment fields to be changed
    const allowedFields = [
      "therapyType",
      "therapyClass",
      "date",
      "time",
      "comments",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    if (
      !updates.therapyType ||
      !updates.therapyClass ||
      !updates.date ||
      !updates.time
    ) {
      return res.status(400).json({
        error: "Therapy type, class, date, and time are required.",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate("clientId", "firstName lastName userName email");

    if (!appointment) {
      return res.status(404).json({
        error: "Appointment not found.",
      });
    }

    return res.json({
      message: "Appointment updated successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Update appointment error:", error);
    return res.status(500).json({
      error: "Could not update appointment.",
    });
  }
});

// Cancel an appointment by deleting its record (admin only)
router.delete("/appointments/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "Invalid appointment ID.",
      });
    }

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({
        error: "Appointment not found.",
      });
    }

    return res.json({
      message: "Appointment cancelled successfully.",
    });
  } catch (error) {
    console.error("Cancel appointment error:", error);
    return res.status(500).json({
      error: "Could not cancel appointment.",
    });
  }
});

export default router;

