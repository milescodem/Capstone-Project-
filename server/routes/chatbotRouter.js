
import express from "express";

const router = express.Router();

// POST /chatbot
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    // Make sure the user sent a message
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Please enter a message."
      });
    }

    const userMessage = message.trim().toLowerCase();
    let reply;

    // Welcome messages
    if (
      userMessage.includes("hello") ||
      userMessage.includes("hi") ||
      userMessage.includes("hey")
    ) {
      reply =
        "Hello! 👋 Welcome to Physical Therapy. How can I help you today?";
    }

    // Physical therapy services
    else if (
      userMessage.includes("service") ||
      userMessage.includes("therapy") ||
      userMessage.includes("classes")
    ) {
      reply =
        "We offer several physical therapy options, including Geriatric, Orthopedic, and Neurological Physical Therapy. Which service would you like to learn about?";
    }

    // Geriatric therapy
    else if (
      userMessage.includes("geriatric") ||
      userMessage.includes("older") ||
      userMessage.includes("senior")
    ) {
      reply =
        "Geriatric Physical Therapy helps older adults work on balance, mobility, strength, and everyday movement. Visit our Geriatric Physical Therapy page to learn more.";
    }

    // Orthopedic therapy
    else if (
      userMessage.includes("orthopedic") ||
      userMessage.includes("joint") ||
      userMessage.includes("muscle") ||
      userMessage.includes("injury")
    ) {
      reply =
        "Orthopedic Physical Therapy focuses on movement and recovery related to muscles, bones, joints, and injuries. Visit our Orthopedic Physical Therapy page for more information.";
    }

    // Neurological therapy
    else if (
      userMessage.includes("neurological") ||
      userMessage.includes("neurological therapy") ||
      userMessage.includes("nervous system")
    ) {
      reply =
        "Neurological Physical Therapy can help people work on balance, coordination, strength, and mobility related to neurological conditions. A qualified healthcare professional can help determine appropriate care.";
    }

    // Booking an appointment
    else if (
      userMessage.includes("appointment") ||
      userMessage.includes("book") ||
      userMessage.includes("schedule")
    ) {
      reply =
        "You can schedule an appointment by signing in to your account and opening the Schedule an Appointment page. Choose your therapy type, class, date, and time.";
    }

    // Changing an appointment
    else if (
      userMessage.includes("change") ||
      userMessage.includes("reschedule") ||
      userMessage.includes("move my appointment")
    ) {
      reply =
        "To request an appointment change, visit the Manage Appointment page. If your request requires approval, please wait for the administrator to review it.";
    }

    // Cancelling an appointment
    else if (userMessage.includes("cancel")) {
      reply =
        "For help cancelling an appointment, visit the Manage Appointment page or contact your physical therapy provider.";
    }

    // Login and account questions
    else if (
      userMessage.includes("login") ||
      userMessage.includes("log in") ||
      userMessage.includes("sign in") ||
      userMessage.includes("account")
    ) {
      reply =
        "You can sign in using the Login page. If you don't have an account yet, visit the Sign Up page.";
    }

    // Insurance questions
    else if (
      userMessage.includes("insurance") ||
      userMessage.includes("coverage") ||
      userMessage.includes("covered")
    ) {
      reply =
        "Insurance coverage depends on your insurance plan and policy. Please check with your insurance company and physical therapy provider to confirm your benefits.";
    }

    // Cost questions
    else if (
      userMessage.includes("price") ||
      userMessage.includes("cost") ||
      userMessage.includes("payment")
    ) {
      reply =
        "The cost of physical therapy can depend on your provider, insurance coverage, and treatment plan. Contact your provider or insurance company for specific pricing.";
    }

    // Contact and help
    else if (
      userMessage.includes("help") ||
      userMessage.includes("contact")
    ) {
      reply =
        "I'm happy to help! You can ask me about therapy services, appointments, signing in, or insurance coverage.";
    }

    // Default response
    else {
      reply =
        "I'm your Physical Therapy virtual assistant. I can help with therapy services, appointments, login questions, and insurance information. Could you ask your question another way?";
    }

    return res.json({ reply });
  } catch (error) {
    console.error("Chatbot route error:", error);

    return res.status(500).json({
      error: "The chatbot could not process your message."
    });
  }
});

export default router;