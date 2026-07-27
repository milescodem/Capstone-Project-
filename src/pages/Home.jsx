import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Navbar from "../components/Navbar";

function ShapeExample() {
  return (
    <>
      <Navbar />

      <Container>
        <Row>
          <Col xs={6} md={4}>
            <Image 
              src="https://www.ctortho.com/wp-content/uploads/2023/02/istockphoto-186873165-612x612-1-300x300.jpg" 
              rounded 
            />
          </Col>

          <Col xs={6} md={4}>
            <Image 
              src="https://www.fairviewrehab.com/wp-content/uploads/2021/02/neurological-diseases.jpg" 
              roundedCircle 
            />
          </Col>

          <Col xs={6} md={4}>
            <Image 
              src="https://cdn.residencyadvisor.com/images/articles_v1_rewrite/v1_MEDICAL_SCHOOL_LIFE_AND_EXAMS_CHOOSING_A_SPECIALTY_pediatrics_geriatrics_comparative_analys-step1-pediatrics-vs-geriatrics-medical-special-1836.png" 
              thumbnail 
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ShapeExample;