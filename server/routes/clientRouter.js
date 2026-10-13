
import express from "express";
import jwt from "jsonwebtoken";
import Client from "../models/clients.js";

const router = express.Router();

// GET ALL CLIENTS
router.get("/", async (req, res) => {
  console.log("The request is received");

  try {
    // Do not return passwords
    const clients = await Client.find().select("-password");
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not get clients" });
  }
});

// GET ONE CLIENT
router.get("/:id", async (req, res) => {
  console.log("Request received for client with id:", req.params.id);

  try {
    const client = await Client.findById(req.params.id).select("-password");

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not get client" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    console.log("Login attempt:", userName);

    const client = await Client.findOne({ userName });

    if (!client) {
      return res.status(401).json({
        error: "Username not found",
      });
    }

    if (client.password !== password) {
      return res.status(401).json({
        error: "Incorrect password",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from the server .env file");
      return res.status(500).json({
        error: "Server authentication is not configured",
      });
    }

    const role = client.role || "patient";

    const token = jwt.sign(
      {
        clientId: client._id.toString(),
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      token,
      client: {
        id: client._id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        userName: client.userName,
        role: role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      error: "Login failed",
    });
  }
});

export default router;