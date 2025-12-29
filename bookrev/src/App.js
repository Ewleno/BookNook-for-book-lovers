import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./navBar";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import Home from "./HomePage";
import AboutUs from "./AboutUs";
import { useAuth } from "./context/AuthContext";

// Protected Route component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;
  }

  return user ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path="/about" element={<AboutUs />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;