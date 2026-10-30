
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Client from "../models/clients.js";

const router = express.Router();

// REGISTER NEW CLIENT
router.post("/register", async (req, res) => {
  console.log("1. REGISTRATION REQUEST RECEIVED");

  try {
    const { firstName, lastName, email, userName, password } = req.body;

    console.log("2. FORM INFORMATION RECEIVED:", {
      firstName,
      lastName,
      email,
      userName
    });

    // Check required fields
    if (!firstName || !lastName || !email || !userName || !password) {
      return res.status(400).json({
        error: "Please fill in all required fields."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters."
      });
    }

    console.log("3. CHECKING FOR EXISTING USER");

    // Check for duplicate username or email
    const existingClient = await Client.findOne({
      $or: [
        { userName: userName.trim() },
        { email: email.trim().toLowerCase() }
      ]
    });

    console.log("4. DATABASE CHECK COMPLETED");

    if (existingClient) {
      return res.status(409).json({
        error: "Username or email already exists."
      });
    }

    console.log("5. HASHING PASSWORD");

    // Securely hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newClient = new Client({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      userName: userName.trim(),
      password: hashedPassword
    });

    console.log("6. SAVING USER TO MONGODB");

    await newClient.save();

    console.log("7. USER SUCCESSFULLY SAVED!");

    return res.status(201).json({
      message: "Account created successfully!",
      client: {
        id: newClient._id,
        firstName: newClient.firstName,
        lastName: newClient.lastName,
        email: newClient.email,
        userName: newClient.userName
      }
    });

  } catch (error) {
    console.error("REGISTRATION ERROR:", error);

    return res.status(500).json({
      error: "Unable to create account."
    });
  }
});

// GET ALL CLIENTS
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().select("-password");
    res.json(clients);

  } catch (error) {
    console.error("Get clients error:", error);

    res.status(500).json({
      error: "Could not get clients"
    });
  }
});

// GET ONE CLIENT
router.get("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).select("-password");

    if (!client) {
      return res.status(404).json({
        error: "Client not found"
      });
    }

    res.json(client);

  } catch (error) {
    console.error("Get client error:", error);

    res.status(500).json({
      error: "Could not get client"
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  console.log("LOGIN REQUEST RECEIVED");

  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        error: "Please enter your username and password."
      });
    }

    const client = await Client.findOne({
      userName: userName.trim()
    });

    if (!client) {
      return res.status(401).json({
        error: "Username not found."
      });
    }

    // Check hashed password or migrate older plain-text password
    const isHashed = client.password.startsWith("$2");

    let passwordMatches;

    if (isHashed) {
      passwordMatches = await bcrypt.compare(password, client.password);
    } else {
      passwordMatches = client.password === password;

      if (passwordMatches) {
        client.password = await bcrypt.hash(password, 12);
        await client.save();
      }
    }

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Incorrect password."
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        error: "Server authentication is not configured."
      });
    }

    const role = client.role || "patient";

    const token = jwt.sign(
      {
        clientId: client._id.toString(),
        role: role
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log("LOGIN SUCCESSFUL:", userName);

    res.json({
      message: "Login successful!",
      token,
      client: {
        id: client._id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        userName: client.userName,
        role: role
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      error: "Login failed."
    });
  }
});

export default router;
