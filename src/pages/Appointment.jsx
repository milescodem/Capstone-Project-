
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AppointmentForm() {
  const navigate = useNavigate();

  const [therapyType, setTherapyType] = useState("");
  const [therapyClass, setTherapyClass] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAppointment = async (e) => {
    e.preventDefault();

    const clientId = localStorage.getItem("clientId");

    if (!clientId) {
      alert("Please log in before scheduling an appointment.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientId,
            therapyType,
            therapyClass,
            date,
            time,
            comments,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Could not save appointment.");
        return;
      }

      // Save the new appointment ID for the next page
      localStorage.setItem(
        "appointmentId",
        data.appointment._id
      );

      alert("Appointment scheduled successfully!");

      navigate("/manage-appointment");
    } catch (error) {
      console.error("Appointment error:", error);
      alert("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1>Schedule an Appointment</h1>
        <p className="text-muted">
          Choose a physical therapy class and select a date
          and time that works for you.
        </p>
      </div>

      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <h3 className="mb-4">Appointment Details</h3>

              <Form onSubmit={handleAppointment}>
                <Form.Group className="mb-3">
                  <Form.Label>Therapy Type</Form.Label>
                  <Form.Select
                    value={therapyType}
                    onChange={(e) => setTherapyType(e.target.value)}
                    required
                  >
                    <option value="">Select a therapy type</option>
                    <option value="Geriatric Therapy">
                      Geriatric Therapy
                    </option>
                    <option value="Orthopedic Therapy">
                      Orthopedic Therapy
                    </option>
                    <option value="Neurological Therapy">
                      Neurological Therapy
                    </option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Therapy Class</Form.Label>
                  <Form.Select
                    value={therapyClass}
                    onChange={(e) => setTherapyClass(e.target.value)}
                    required
                  >
                    <option value="">Select a class</option>
                    <option value="Balance & Mobility">
                      Balance & Mobility
                    </option>
                    <option value="Strength Training">
                      Strength Training
                    </option>
                    <option value="Fall Prevention">
                      Fall Prevention
                    </option>
                    <option value="Injury Recovery">
                      Injury Recovery
                    </option>
                    <option value="Joint Mobility">
                      Joint Mobility
                    </option>
                    <option value="Strength & Conditioning">
                      Strength & Conditioning
                    </option>
                    <option value="Balance & Coordination">
                      Balance & Coordination
                    </option>
                    <option value="Movement Training">
                      Movement Training
                    </option>
                    <option value="Neurological Rehabilitation">
                      Neurological Rehabilitation
                    </option>
                  </Form.Select>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Appointment Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={date}
                        min={new Date().toLocaleDateString("en-CA")}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Appointment Time</Form.Label>
                      <Form.Control
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Additional Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add any information for your therapist..."
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={loading}
                  >
                    {loading
                      ? "Saving Appointment..."
                      : "Schedule Appointment"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AppointmentForm;


