import { useState, useEffect, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./Chatbot.css";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const [chatHistory, setChatHistory] = useState([
    {
      sender: "bot",
      text: "Hi there! 👋",
      time: "Welcome to Physical Therapy",
    },
    {
      sender: "bot",
      text: "I'm your virtual assistant. I can help you learn about our physical therapy services, appointments, and therapy classes. What can I help you with today?",
      time: "",
    },
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const handleSend = async (e) => {
    e.preventDefault();

    const userMessage = message.trim();

    if (!userMessage || loading) return;

    setChatHistory((previous) => [
      ...previous,
      { sender: "user", text: userMessage },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Chatbot request failed.");
      }

      const reply =
        data.reply ||
        data.response ||
        data.message ||
        "Sorry, I couldn't find an answer.";

      setChatHistory((previous) => [
        ...previous,
        { sender: "bot", text: reply },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setChatHistory((previous) => [
        ...previous,
        {
          sender: "bot",
          text: "I'm having trouble connecting right now. Please check that the server is running and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="chatbot-page">
      <div className="chatbot-card">
        <div className="chatbot-header">
          <div className="bot-avatar">💙</div>

          <div>
            <h2>PT Virtual Assistant</h2>
            <p>
              <span className="online-dot"></span>
              Here to help you feel better
            </p>
          </div>
        </div>

        <div className="chatbot-messages">
          <div className="date-divider">
            <span>YOUR THERAPY ASSISTANT</span>
          </div>

          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`message-row ${
                chat.sender === "user" ? "user-row" : "bot-row"
              }`}
            >
              {chat.sender === "bot" && (
                <div className="small-bot-avatar">💙</div>
              )}

              <div
                className={`message-bubble ${
                  chat.sender === "user" ? "user-bubble" : "bot-bubble"
                }`}
              >
                {chat.time && (
                  <strong className="welcome-title">{chat.time}</strong>
                )}
                <p>{chat.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-row bot-row">
              <div className="small-bot-avatar">💙</div>
              <div className="message-bubble bot-bubble typing">
                Typing...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="chatbot-footer">
          <Form onSubmit={handleSend}>
            <div className="chat-input-area">
              <Form.Control
                className="chat-input"
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
              />

              <Button
                className="chat-send-button"
                type="submit"
                disabled={loading || !message.trim()}
              >
                Send ➤
              </Button>
            </div>
          </Form>

          <p className="chatbot-note">
            Your journey to better movement starts here.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default Chatbot;