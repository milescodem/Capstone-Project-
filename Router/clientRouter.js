import express from "express";
import Client from "../server/clients.js";

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

export default router;