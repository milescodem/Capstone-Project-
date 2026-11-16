
import express from "express";
import { askClaude } from "../server/Services/claude.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Please enter a question."
      });
    }

    const prompt = `
You are the AI assistant for a Physical Therapy website.

Our website provides these services:

1. Geriatric Physical Therapy
   - Helps older adults improve strength, balance, mobility, and independence.

2. Orthopedic Physical Therapy
   - Helps with injuries and conditions involving muscles, bones, joints, and movement.

3. Neurological Physical Therapy
   - Helps improve movement, balance, coordination, and strength for people with neurological conditions.

The website also allows users to:
- Create an account
- Log in
- Learn about physical therapy classes
- Book appointments
- Learn about insurance

Answer the user's question in a friendly and easy-to-understand way.

Do not diagnose medical conditions.
Do not provide emergency medical advice.
If a question requires a medical professional, recommend that the user speak with a qualified healthcare professional.

User's question:
${question}
`;

    const answer = await askClaude(prompt);

    res.json({
      answer: answer
    });

  } catch (error) {
    console.error("AI error:", error);

    res.status(500).json({
      error: "The AI assistant could not respond."
    });
  }
});

export default router;