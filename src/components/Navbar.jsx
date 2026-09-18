import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function MyNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>

        {/* Website Name */}
        <Navbar.Brand as={Link} to="/">
          Physical Therapy
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {/* Home */}
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {/* Login */}
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>

            {/* More Menu */}
            <NavDropdown title="More" id="basic-nav-dropdown">

              <NavDropdown.Item as={Link} to="/geriatric">
                Geriatric Therapy
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/orthopedic">
                Orthopedic Therapy
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/neurological">
                Neurological Therapy
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item as={Link} to="/signup">
                Sign Up
              </NavDropdown.Item>

            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;