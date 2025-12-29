import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "./context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">BookNook</div>

      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        {user ? (
          <>
            <li style={{ color: "#fff", padding: "0 15px" }}>
              Welcome, {user.username}!
            </li>
            <li>
              <button 
                onClick={handleLogout}
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: "#fff", 
                  cursor: "pointer",
                  fontSize: "inherit",
                  textDecoration: "none"
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}


