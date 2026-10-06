import express from "express";
import Insurance from "../server/insurance.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userName } = req.body;

  try {
    const user = await Insurance.findOne({ userName });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    res.json({
      message: "Login successful",
      user: user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;