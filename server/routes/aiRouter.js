import express from "express";
import { askClaude } from "../services/claude.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await askClaude(prompt);

    res.json({ response });
  } catch (error) {
    console.error("Claude error:", error);
    res.status(500).json({ error: "Something went wrong with Claude" });
  }
});

export default router;