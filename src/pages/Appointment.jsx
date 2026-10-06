import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AppointmentForm() {
  return (
    <Container className="py-5">

      <div className="text-center mb-5">
        <h1>Schedule an Appointment</h1>
        <p className="text-muted">
          Choose a physical therapy class and select a date and time
          that works for you.
        </p>
      </div>

      <Row className="justify-content-center">
        <Col md={8} lg={7}>

          <Card className="shadow border-0">
            <Card.Body className="p-4">

              <h3 className="mb-4">
                Appointment Details
              </h3>

              <Form>

                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Therapy Type</Form.Label>

                  <Form.Select>
                    <option>Select a therapy type</option>
                    <option>Geriatric Therapy</option>
                    <option>Orthopedic Therapy</option>
                    <option>Neurological Therapy</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Therapy Class</Form.Label>

                  <Form.Select>
                    <option>Select a class</option>
                    <option>Balance & Mobility</option>
                    <option>Strength Training</option>
                    <option>Fall Prevention</option>
                    <option>Injury Recovery</option>
                    <option>Joint Mobility</option>
                    <option>Strength & Conditioning</option>
                    <option>Balance & Coordination</option>
                    <option>Movement Training</option>
                    <option>Neurological Rehabilitation</option>
                  </Form.Select>
                </Form.Group>

                <Row>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Appointment Date</Form.Label>

                      <Form.Control
                        type="date"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Appointment Time</Form.Label>

                      <Form.Control
                        type="time"
                      />
                    </Form.Group>
                  </Col>

                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Additional Notes</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Add any information you would like your therapist to know..."
                  />
                </Form.Group>

                <div className="d-grid">

                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                  >
                    Schedule Appointment
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