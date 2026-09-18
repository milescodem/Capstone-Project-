import Navbar from "../../components/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Geriatric() {
  return (
    <>
      <Navbar />

      <Container className="py-5">

        {/* Page Header */}
        <div className="text-center mb-5">
          <h1>Geriatric Physical Therapy</h1>

          <p className="lead">
            Physical therapy programs designed to help older adults improve
            strength, balance, mobility, and independence.
          </p>
        </div>

        {/* Classes */}
        <h2 className="mb-4">Available Classes</h2>

        <Row className="g-4">

          {/* Balance */}
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">

                <Card.Title>
                  Balance & Mobility
                </Card.Title>

                <Card.Text>
                  Improve balance, walking, coordination, and everyday
                  movement through guided physical therapy exercises.
                </Card.Text>

                <Button variant="primary" className="mt-auto">
                  Select Class
                </Button>

              </Card.Body>
            </Card>
          </Col>

          {/* Strength */}
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">

                <Card.Title>
                  Strength Training
                </Card.Title>

                <Card.Text>
                  Build strength and improve mobility with exercises designed
                  for older adults.
                </Card.Text>

                <Button variant="primary" className="mt-auto">
                  Select Class
                </Button>

              </Card.Body>
            </Card>
          </Col>

          {/* Fall Prevention */}
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">

                <Card.Title>
                  Fall Prevention
                </Card.Title>

                <Card.Text>
                  Improve stability, coordination, and confidence while
                  reducing the risk of falls.
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

          <Button variant="success">
            Sign In to Book an Appointment
          </Button>

        </div>

      </Container>
    </>
  );
}

export default Geriatric;