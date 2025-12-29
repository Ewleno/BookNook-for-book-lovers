import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import "./Login.css";
import { useAuth } from "./context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error || "Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-text">
        <em>Welcome to <strong>NookBook</strong></em>
      </div>

      <h2>Login Page</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          required
          disabled={loading}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
          disabled={loading}
        />
        <br />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
