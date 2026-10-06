import Navbar from "../../components/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Geriatric() {
  return (
    <>
      <Navbar />

      <Container className="py-5">

        {/* Page Title */}
        <div className="text-center mb-5">
          <h1>Geriatric Physical Therapy</h1>

          <p className="lead">
            Physical therapy programs designed to help older adults
            improve strength, balance, mobility, and independence.
          </p>
        </div>

        {/* Classes */}
        <h2 className="text-center mb-4">
          Available Classes
        </h2>

        <Row className="g-4">

          {/* Balance & Mobility */}
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <h3>Balance & Mobility</h3>

                <p>
                  Improve balance, walking, coordination, and everyday
                  movement.
                </p>

                <Button variant="primary">
                  Select Class
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Strength Training */}
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <h3>Strength Training</h3>

                <p>
                  Build strength and improve mobility with exercises
                  designed for older adults.
                </p>

                <Button variant="primary">
                  Select Class
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Fall Prevention */}
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <h3>Fall Prevention</h3>

                <p>
                  Improve stability, coordination, and confidence while
                  reducing the risk of falls.
                </p>

                <Button variant="primary">
                  Select Class
                </Button>
              </Card.Body>
            </Card>
          </Col>

        </Row>

        {/* Appointment Section */}
        <div className="text-center mt-5 p-5 bg-light rounded">
          <h2>Ready to Schedule?</h2>

          <p>
            Sign in to your account to schedule a physical therapy
            appointment.
          </p>

          <Link to="/login">
  <Button variant="success">
    Sign In to Book an Appointment
  </Button>
</Link>
        </div>

      </Container>
    </>
  );
}

export default Geriatric;