import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div>&copy; 2025 NookBook</div>
      <div className="footer-links">
        <Link to="/home">Home</Link>          {/* ✅ Go to Home page */}
        <Link to="/">Login</Link>             {/* ✅ Go to Login page */}
        <Link to="/register">Register</Link>  {/* ✅ Register page */}
        <Link to="/about">About</Link>        {/* ✅ About page */}
      </div>
    </footer>
  );
}

export default Footer;


