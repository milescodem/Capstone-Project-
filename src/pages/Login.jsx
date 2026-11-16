
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
      const apiUrl = import.meta.env.VITE_API_URL;

      if (!apiUrl) {
        throw new Error("VITE_API_URL is missing.");
      }

      const response = await fetch(`${apiUrl}/clients/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userName,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed.");
        return;
      }

      if (!data.client?.id || !data.token) {
        alert("Login response is missing account information.");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.client.userName);
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
