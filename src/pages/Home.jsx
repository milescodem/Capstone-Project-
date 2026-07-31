import Navbar from "../components/Navbar";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import "./Home.css";
import { Link } from "react-router-dom";

function CardExample() {
  return (
    <div className="container">

  <Navbar />

  <div className="row">
        
        <h1 className="text-center mt-4">
  Physical Therapy Insurance Plans
</h1>

<p className="text-center">
  Find insurance providers that help cover your physical therapy needs.
</p>

        {/* UnitedHealthcare Card */}
        <div className="col-md-4">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://skylinebenefit.com/wp-content/uploads/2022/07/UnitedHealthcare.jpg"
              style={{ height: "200px", objectFit: "cover" }}
            />

            <Card.Body>
              <Card.Title>United Healthcare</Card.Title>
              <Card.Text>
                Learn about United Healthcare physical therapy coverage and benefits.
              </Card.Text>

              <Link to="/signup">
                <Button variant="primary">
                  Sign Up
                </Button>
              </Link>

            </Card.Body>
          </Card>
        </div>


        {/* Aetna Card */}
        <div className="col-md-4">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://healthcareinsider.com/wp-content/uploads/2025/09/aetna-health-insurance-logo.png"
              style={{ height: "200px", objectFit: "cover" }}
            />

            <Card.Body>
              <Card.Title>Aetna</Card.Title>
              <Card.Text>
                Explore Aetna insurance options for physical therapy services.
              </Card.Text>

            <Link to="/signup">
              <Button variant="primary">
                 Sign Up
              </Button>
            </Link>

            </Card.Body>
          </Card>
        </div>


        {/* Blue Cross Blue Shield Card */}
        <div className="col-md-4">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://news.ibx.com/wp-content/uploads/2020/10/blue-cross-blue-shield-logo-vector_Newsroom.jpg"
              style={{ height: "200px", objectFit: "cover" }}
            />

            <Card.Body>
              <Card.Title>Blue Cross Blue Shield</Card.Title>
              <Card.Text>
                Find information about Blue Cross Blue Shield therapy coverage.
              </Card.Text>

            <Link to="/signup">
              <Button variant="primary">
                Sign Up
              </Button>
            </Link>

            </Card.Body>
          </Card>
        </div>

      </div>
    </div>
  );
}

export default CardExample;