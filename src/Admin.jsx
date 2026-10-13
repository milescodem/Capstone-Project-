
import { useState } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  Alert,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

const API_URL = (
  import.meta.env.REACT_APP_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");

function Admin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(
    sessionStorage.getItem("adminToken") || ""
  );
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editForm, setEditForm] = useState({});

  async function apiRequest(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) logout();
      throw new Error(data.error || "The request failed.");
    }

    return data;
  }

  async function login(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Admin login failed.");
      }

      sessionStorage.setItem("adminToken", data.token);
      setToken(data.token);
      setPassword("");
      setMessage(`Welcome, ${data.userName}!`);
      await loadDashboard(data.token);
    } catch (error) {
      setMessage(error.message || "Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  async function loadDashboard(currentToken = token) {
    setLoading(true);
    setMessage("");

    try {
      const [clientResponse, appointmentResponse] = await Promise.all([
        fetch(`${API_URL}/admin/clients`, {
          headers: { Authorization: `Bearer ${currentToken}` },
        }),
        fetch(`${API_URL}/admin/appointments`, {
          headers: { Authorization: `Bearer ${currentToken}` },
        }),
      ]);

      const clientData = await clientResponse.json();
      const appointmentData = await appointmentResponse.json();

      if (!clientResponse.ok) {
        throw new Error(clientData.error || "Could not load clients.");
      }

      if (!appointmentResponse.ok) {
        throw new Error(
          appointmentData.error || "Could not load appointments."
        );
      }

      setClients(clientData);
      setAppointments(appointmentData);
      setMessage(
        `Loaded ${clientData.length} clients and ${appointmentData.length} appointments.`
      );
    } catch (error) {
      setMessage(error.message || "Could not load dashboard information.");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    sessionStorage.removeItem("adminToken");
    setToken("");
    setClients([]);
    setAppointments([]);
    setMessage("You have signed out.");
  }

  function startEditing(appointment) {
    setEditingId(appointment._id);
    setEditForm({
      therapyType: appointment.therapyType || "",
      therapyClass: appointment.therapyClass || "",
      date: appointment.date
        ? String(appointment.date).slice(0, 10)
        : "",
      time: appointment.time || "",
      comments: appointment.comments || "",
    });
  }

  function changeEditField(event) {
    setEditForm({
      ...editForm,
      [event.target.name]: event.target.value,
    });
  }

  async function saveAppointment(id) {
    setLoading(true);
    setMessage("");

    try {
      const data = await apiRequest(`/admin/appointments/${id}`, {
        method: "PUT",
        body: JSON.stringify(editForm),
      });

      setEditingId("");
      setMessage(data.message || "Appointment updated.");
      await loadDashboard();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function cancelAppointment(id) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment? This will delete its record."
    );

    if (!confirmed) return;

    setLoading(true);
    setMessage("");

    try {
      const data = await apiRequest(`/admin/appointments/${id}`, {
        method: "DELETE",
      });

      setMessage(data.message || "Appointment cancelled.");
      await loadDashboard();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="mt-4 mb-5">
      <Card className="p-4 shadow">
        {!token ? (
          <>
            <h1>Admin Sign In</h1>
            <p>Physical Therapy Administration</p>

            {message && <Alert variant="danger">{message}</Alert>}

            <Form onSubmit={login}>
              <Form.Group className="mb-3">
                <Form.Label>Admin Username</Form.Label>
                <Form.Control
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  autoComplete="username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </Form.Group>

              <Button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Form>
          </>
        ) : (
          <>
            <h1>Admin Dashboard</h1>
            <p>Physical Therapy Administration</p>

            {message && (
              <Alert variant="info" dismissible onClose={() => setMessage("")}>
                {message}
              </Alert>
            )}

            <div className="d-flex gap-2 mb-4">
              <Button
                onClick={() => loadDashboard()}
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : "Refresh Data"}
              </Button>
              <Button variant="outline-danger" onClick={logout}>
                Sign Out
              </Button>
            </div>

            <h2 className="mb-3">Client Information ({clients.length})</h2>

            {clients.length === 0 ? (
              <p>No clients found.</p>
            ) : (
              clients.map((client) => (
                <Card key={client._id} className="mb-3">
                  <Card.Body>
                    <Card.Title>
                      {[client.firstName, client.lastName]
                        .filter(Boolean)
                        .join(" ") || "Client"}
                    </Card.Title>
                    <p className="mb-1">
                      <strong>Username:</strong> {client.userName || "N/A"}
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong> {client.email || "N/A"}
                    </p>
                    {client.contactInfo?.map((contact, index) => (
                      <div key={index}>
                        {contact.phone && (
                          <p className="mb-1">
                            <strong>Phone:</strong> {contact.phone}
                          </p>
                        )}
                        {contact.address && (
                          <p className="mb-1">
                            <strong>Address:</strong> {contact.address}
                          </p>
                        )}
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              ))
            )}

            <hr className="my-4" />

            <h2 className="mb-3">
              Appointments ({appointments.length})
            </h2>

            {appointments.length === 0 ? (
              <p>No appointments found.</p>
            ) : (
              appointments.map((appointment) => {
                const client = appointment.clientId;
                const clientName =
                  client && typeof client === "object"
                    ? [client.firstName, client.lastName]
                        .filter(Boolean)
                        .join(" ") || client.userName
                    : "Client information unavailable";

                return (
                  <Card key={appointment._id} className="mb-3">
                    <Card.Body>
                      {editingId === appointment._id ? (
                        <Form>
                          <h5>Edit Appointment</h5>

                          <Form.Group className="mb-2">
                            <Form.Label>Therapy Type</Form.Label>
                            <Form.Control
                              name="therapyType"
                              value={editForm.therapyType}
                              onChange={changeEditField}
                              required
                            />
                          </Form.Group>

                          <Form.Group className="mb-2">
                            <Form.Label>Therapy Class</Form.Label>
                            <Form.Control
                              name="therapyClass"
                              value={editForm.therapyClass}
                              onChange={changeEditField}
                              required
                            />
                          </Form.Group>

                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-2">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                  type="date"
                                  name="date"
                                  value={editForm.date}
                                  onChange={changeEditField}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-2">
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                  type="time"
                                  name="time"
                                  value={editForm.time}
                                  onChange={changeEditField}
                                  required
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <Form.Group className="mb-3">
                            <Form.Label>Comments</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="comments"
                              value={editForm.comments}
                              onChange={changeEditField}
                            />
                          </Form.Group>

                          <Button
                            className="me-2"
                            disabled={loading}
                            onClick={() => saveAppointment(appointment._id)}
                          >
                            Save Changes
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => setEditingId("")}
                          >
                            Cancel Editing
                          </Button>
                        </Form>
                      ) : (
                        <>
                          <Card.Title>{clientName}</Card.Title>
                          <p className="mb-1">
                            <strong>Email:</strong> {client?.email || "N/A"}
                          </p>
                          <p className="mb-1">
                            <strong>Therapy:</strong> {appointment.therapyType}
                          </p>
                          <p className="mb-1">
                            <strong>Class:</strong> {appointment.therapyClass}
                          </p>
                          <p className="mb-1">
                            <strong>Date:</strong> {String(appointment.date).slice(0, 10)}
                          </p>
                          <p className="mb-1">
                            <strong>Time:</strong> {appointment.time}
                          </p>
                          <p>
                            <strong>Comments:</strong> {appointment.comments || "None"}
                          </p>

                          <Button
                            className="me-2"
                            onClick={() => startEditing(appointment)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            disabled={loading}
                            onClick={() => cancelAppointment(appointment._id)}
                          >
                            Cancel Appointment
                          </Button>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                );
              })
            )}
          </>
        )}
      </Card>
    </Container>
  );
}

export default Admin;

