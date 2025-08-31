import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">DeepSea</h2>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to DeepSea</h1>
        <p>Your comfort, our priority. Manage your hotel with ease.</p>
        
      </header>
      {/*Add images of hotel*/}
      {/* Features Section */}
      <section className="features">
        <h2>Our Services</h2>
        <div className="feature-list">
          <div className="feature-card">
            <h3>Room Booking</h3>
            <p>Book and manage rooms efficiently with real-time availability.</p>
          </div>
          <div className="feature-card">
            <h3>Restaurant</h3>
            <p>Order food directly from our in-house restaurant service.</p>
          </div>
          <div className="feature-card">
            <h3>Staff Management</h3>
            <p>Keep track of hotel staff and assign responsibilities easily.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 DeepSea. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
