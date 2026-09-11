import express from "express";
import Insurance from "../server/insurance.js";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("Insurance request received");

  try {
    const insurance = await Insurance.find();
    res.json(insurance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not get insurance" });
  }
});

export default router;