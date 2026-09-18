import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Home.css";
import { Link } from "react-router-dom";

function CardExample() {
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="row">

          <h1 className="text-center mt-4">
            Physical Therapy Sessions for All Ages and Conditions
          </h1>

          <p className="text-center">
            Find providers that help cover your physical therapy needs.
          </p>

          {/* Geriatric Therapy Card */}
          <div className="col-md-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://www.news-medical.net/images/Article_Images/ImageForArticle_25184_17243368774423972.jpg"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <Card.Body>
                <Card.Title>Geriatric Therapy</Card.Title>

                <Card.Text>
                  Specialized care for older adults with age-related physical
                  challenges.
                </Card.Text>

                <Link to="/geriatric">
                  <Button variant="primary">
                    View Geriatric Classes
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          {/* Orthopedic Therapy Card */}
          <div className="col-md-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://irp.cdn-website.com/b174dce8/dms3rep/multi/bb-a94f4f13.PNG"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <Card.Body>
                <Card.Title>Orthopedic Therapy</Card.Title>

                <Card.Text>
                  Treatment for injuries affecting muscles, bones, joints,
                  and ligaments.
                </Card.Text>

                <Link to="/orthopedic">
                  <Button variant="primary">
                    View Orthopedic Classes
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          {/* Neurological Therapy Card */}
          <div className="col-md-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://petersenpt.com/wp-content/uploads/2018/05/Neurological-Rehabilitation-768x512.jpeg"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <Card.Body>
                <Card.Title>Neurological Therapy</Card.Title>

                <Card.Text>
                  Helps improve movement, balance, and coordination for people
                  with neurological conditions.
                </Card.Text>

                <Link to="/neurological">
                  <Button variant="primary">
                    View Neurological Classes
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div>

        </div>
      </div>
    </>
  );
}

export default CardExample;