import Navbar from "../../components/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./Orthopedic.css";

function Orthopedic() {
  return (
    <>
      <Navbar />

      {/* Blue Hero Section */}
      <div className="bg-primary text-white p-1.5 shadow">
        <Container>
          <Row className="align-items-center">

            <Col md={8}>
              <h1 className="display-5 fw-bold">
                Orthopedic Physical Therapy
              </h1>

              <p className="lead mt-3">
                Recover from injuries, improve mobility, and build strength
                with physical therapy programs designed around your needs.
              </p>

              <Button variant="light" size="lg">
                Explore Classes
              </Button>
            </Col>

            <Col md={4} className="text-center">
              <div className="display-1">
                🦴
              </div>

              <p className="mb-0">
                Move Better. Feel Stronger.
              </p>
            </Col>

          </Row>
        </Container>
      </div>

      {/* Rest of Page */}
      <Container className="orthopedic-container py-5">

        {/* Information Section */}
        <Alert variant="info" className="mb-5">
          <Alert.Heading>
            Who Can Benefit From Orthopedic Therapy?
          </Alert.Heading>

          <p className="mb-0">
            Our programs can help people recovering from sports injuries,
            joint problems, muscle injuries, surgeries, and other
            musculoskeletal conditions.
          </p>
        </Alert>


        {/* Classes */}
        <div className="text-center mb-4">
          <h2>Choose Your Program</h2>

          <p className="text-muted">
            Select a class that matches your recovery and fitness goals.
          </p>
        </div>


        <Row className="g-4">

          {/* Injury Recovery */}
          <Col md={4}>
            <Card className="h-100 border-0 shadow">

              <Card.Header className="bg-dark text-white text-center">
                Recovery
              </Card.Header>

              <Card.Body className="p-4">

                <Card.Title className="fs-3">
                  Injury Recovery
                </Card.Title>

                <Card.Text>
                  Work on rebuilding strength and movement after an injury
                  involving muscles, bones, joints, or ligaments.
                </Card.Text>

                <ul>
                  <li>Mobility exercises</li>
                  <li>Strength development</li>
                  <li>Movement training</li>
                </ul>

                <Button variant="outline-primary" className="w-100">
                  Select Program
                </Button>

              </Card.Body>
            </Card>
          </Col>


          {/* Joint Mobility */}
          <Col md={4}>
            <Card className="h-100 border-0 shadow">

              <Card.Header className="bg-dark text-white text-center">
                Mobility
              </Card.Header>

              <Card.Body className="p-4">

                <Card.Title className="fs-3">
                  Joint Mobility
                </Card.Title>

                <Card.Text>
                  Improve flexibility and range of motion in your knees,
                  hips, shoulders, and other joints.
                </Card.Text>

                <ul>
                  <li>Flexibility exercises</li>
                  <li>Range-of-motion training</li>
                  <li>Joint movement</li>
                </ul>

                <Button variant="outline-primary" className="w-100">
                  Select Program
                </Button>

              </Card.Body>
            </Card>
          </Col>


          {/* Strength */}
          <Col md={4}>
            <Card className="h-100 border-0 shadow">

              <Card.Header className="bg-dark text-white text-center">
                Strength
              </Card.Header>

              <Card.Body className="p-4">

                <Card.Title className="fs-3">
                  Strength & Conditioning
                </Card.Title>

                <Card.Text>
                  Build strength and improve physical performance through
                  structured exercises.
                </Card.Text>

                <ul>
                  <li>Strength exercises</li>
                  <li>Core training</li>
                  <li>Functional movement</li>
                </ul>

                <Button variant="outline-primary" className="w-100">
                  Select Program
                </Button>

              </Card.Body>
            </Card>
          </Col>

        </Row>


        {/* Appointment Section */}
        <div className="text-center mt-5 p-5 bg-light rounded-4">

          <h2>Ready to Start Your Recovery?</h2>

          <p className="text-muted">
            Sign in to your account before scheduling an orthopedic
            physical therapy appointment.
          </p>

          <Button variant="success" size="lg">
            Sign In to Book an Appointment
          </Button>

        </div>

      </Container>
    </>
  );
}

export default Orthopedic;