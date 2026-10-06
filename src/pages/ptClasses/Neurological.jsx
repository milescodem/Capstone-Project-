import Navbar from "../../components/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Neurological.css";
import { Link } from "react-router-dom";

function Neurological() {
  return (
    <>
      <Navbar />

      <Container className="py-5">

        {/* Page Header */}
        <div className="text-center mb-5">
          <h1>Neurological Physical Therapy</h1>

          <p className="lead">
            Physical therapy programs focused on improving movement, balance,
            coordination, and independence for people with neurological
            conditions.
          </p>
        </div>

        {/* Classes */}
        <h2 className="mb-4">Available Classes</h2>

        <Row className="g-4">

          {/* Balance & Coordination */}
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">

                <Card.Title>
                  Balance & Coordination
                </Card.Title>

                <Card.Text>
                  Improve balance, coordination, and body control through
                  guided therapeutic exercises.
                </Card.Text>

                <Button variant="primary" className="mt-auto">
                  Select Class
                </Button>

              </Card.Body>
            </Card>
          </Col>

          {/* Movement Training */}
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">

                <Card.Title>
                  Movement Training
                </Card.Title>

                <Card.Text>
                  Practice safe movement patterns to improve walking,
                  flexibility, and everyday activities.
                </Card.Text>

                <Button variant="primary" className="mt-auto">
                  Select Class
                </Button>

              </Card.Body>
            </Card>
          </Col>

          {/* Neurological Rehabilitation */}
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">

                <Card.Title>
                  Neurological Rehabilitation
                </Card.Title>

                <Card.Text>
                  Focus on improving strength, mobility, and independence
                  through personalized therapeutic exercises.
                </Card.Text>

                <Button variant="primary" className="mt-auto">
                  Select Class
                </Button>

              </Card.Body>
            </Card>
          </Col>

        </Row>

        {/* Appointment Section */}
        <div className="text-center mt-5 p-4 bg-light rounded">

          <h2>Ready to Schedule?</h2>

          <p>
            Sign in to your account to schedule a physical therapy appointment.
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

export default Neurological;