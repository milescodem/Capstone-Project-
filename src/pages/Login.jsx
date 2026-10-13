
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.REACT_API_URL;

      console.log("API URL:", apiUrl);
      console.log("Login endpoint:", `${apiUrl}/clients/login`);

      if (!apiUrl) {
        throw new Error(
          "REACT_APP_API_URL is missing. Check your .env and vite.config.js files."
        );
      }

      const response = await fetch(`${apiUrl}/clients/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      const responseText = await response.text();

      console.log("Login response status:", response.status);
      console.log("Login response:", responseText);

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Server returned a non-JSON response (HTTP ${response.status}).`
        );
      }

      if (!response.ok) {
        alert(data.error || data.message || "Login failed.");
        return;
      }

      if (!data.client?.id) {
        alert("Login response is missing the client ID.");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "userName",
        data.client.userName || userName
      );
      localStorage.setItem("clientId", data.client.id);
      localStorage.setItem("userEmail", data.client.email || "");

      alert("Login successful!");
      navigate("/appointment");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Unable to connect to the server.");
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Username
          </label>
          <input
            id="userName"
            type="text"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>

      <p className="mt-3">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;