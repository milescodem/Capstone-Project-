import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Appointment from "./pages/Appointment";

import Geriatric from "./pages/ptClasses/Geriatric";
import Orthopedic from "./pages/ptClasses/Orthopedic";
import Neurological from "./pages/ptClasses/Neurological";

function App() {
  return (
    <BrowserRouter>

      {/* Navigation Bar */}
      <Navbar bg="light" data-bs-theme="light" expand="lg">
        <Container>

          <Navbar.Brand as={Link} to="/">
            Physical Therapy
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>

              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>

              <Nav.Link as={Link} to="/geriatric">
                Geriatric
              </Nav.Link>

              <Nav.Link as={Link} to="/orthopedic">
                Orthopedic
              </Nav.Link>

              <Nav.Link as={Link} to="/neurological">
                Neurological
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>

      {/* Page Routes */}
      <Container className="mt-4">
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path="/geriatric" element={<Geriatric />} />

          <Route path="/orthopedic" element={<Orthopedic />} />

          <Route path="/neurological" element={<Neurological />} />

          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </Container>

      {/* Footer */}
      <Container className="mt-5 mb-3 text-center">
        <p className="text-muted">
          &copy; {new Date().getFullYear()} Physical Therapy. All rights reserved.
        </p>
      </Container>

    </BrowserRouter>
  );
}

export default App;