
import express from "express";
import Client from "../models/clients.js";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("The request is received");

  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not get clients" });
  }
});


router.get("/:id", async (req, res) => {
  console.log("Request received for client with id:", req.params.id);

  try {
    const client = await Client.findById(req.params.id);

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

    // Find the client
    const client = await Client.findOne({ userName });

    if (!client) {
      return res.status(401).json({
        error: "Username not found"
      });
    }

    // Check password
    if (client.password !== password) {
      return res.status(401).json({
        error: "Incorrect password"
      });
    }

    // Login successful
    res.json({
      message: "Login successful",

      client: {
        id: client._id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        userName: client.userName
      }
    });

  } catch (error) {

    console.error("Login error:", error);

    res.status(500).json({
      error: "Login failed"
    });

  }

});

export default router;

