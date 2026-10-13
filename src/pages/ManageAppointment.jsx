
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import "./ManageAppointment.css";

function ManageAppointment() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Use the .env URL, with localhost as a fallback.
  const apiUrl = (
    import.meta.env.REACT_APP_API_URL || "http://localhost:3000"
  ).replace(/\/+$/, "");

  useEffect(() => {
    const clientId = localStorage.getItem("clientId");

    if (!clientId) {
      navigate("/login");
      return;
    }

    loadAppointments(clientId);
  }, [navigate]);

  async function loadAppointments(clientId) {
    setLoading(true);
    setError("");

    try {
      if (!clientId) {
        throw new Error(
          "Your client ID is missing. Please log in again."
        );
      }

      const requestUrl = new URL(`${apiUrl}/appointments`);
      requestUrl.searchParams.set("clientId", clientId);

      console.log("Loading appointments from:", requestUrl.toString());

      const response = await fetch(requestUrl.toString());
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Could not load your appointments."
        );
      }

      const appointmentList = Array.isArray(data)
        ? data
        : data.appointments || [];

      setAppointments(appointmentList);
    } catch (err) {
      console.error("Could not load appointments:", err);

      setError(
        err.message ||
          "Could not connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date) {
    if (!date) {
      return "Not selected";
    }

    const dateString = String(date).slice(0, 10);
    const parts = dateString.split("-");

    if (parts.length !== 3) {
      return dateString;
    }

    return new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2])
    ).toLocaleDateString();
  }

  function formatTime(time) {
    if (!time) {
      return "Not selected";
    }

    const parts = String(time).split(":");

    if (parts.length < 2) {
      return time;
    }

    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    if (
      !Number.isInteger(hours) ||
      !Number.isInteger(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      return time;
    }

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <Container className="manage-appointments-page">
        <Spinner animation="border" role="status" />
        <p>Loading your appointments...</p>
      </Container>
    );
  }

  return (
    <Container className="manage-appointments-page">
      <h1>Manage Your Appointments</h1>

      <p className="manage-subtitle">
        View your scheduled physical therapy appointments.
      </p>

      {message && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setMessage("")}
        >
          {message}
        </Alert>
      )}

      {error && (
        <Alert variant="danger">
          {error}
          <hr />

          <Button
            variant="outline-danger"
            onClick={() =>
              loadAppointments(localStorage.getItem("clientId"))
            }
          >
            Try Again
          </Button>
        </Alert>
      )}

      {!error && appointments.length === 0 && (
        <Card className="appointment-empty-card">
          <Card.Body>
            <h4>No appointments found</h4>

            <p>
              You do not have any appointments saved to your account yet.
            </p>

            <Button
              variant="success"
              onClick={() => navigate("/appointment")}
            >
              Schedule an Appointment
            </Button>
          </Card.Body>
        </Card>
      )}

      {appointments.map((appointment) => (
        <Card
          className="managed-appointment-card"
          key={appointment._id}
        >
          <Card.Body>
            <h3>{appointment.therapyType}</h3>

            <p>
              <strong>Therapy Class:</strong>{" "}
              {appointment.therapyClass}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {formatDate(appointment.date)}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {formatTime(appointment.time)}
            </p>

            <p>
              <strong>Comments:</strong>{" "}
              {appointment.comments || "No comments added"}
            </p>
          </Card.Body>
        </Card>
      ))}

      <Button
        variant="success"
        className="back-to-booking-button"
        onClick={() => navigate("/appointment")}
      >
        Schedule Another Appointment
      </Button>
    </Container>
  );
}

export default ManageAppointment;

