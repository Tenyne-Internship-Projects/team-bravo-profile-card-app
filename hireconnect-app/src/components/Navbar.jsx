import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        {/* Logo on the left */}
        <div className="navbar-logo">
          <img
            src="/assets/kconnect.png"
            alt="HireConnect Logo"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Center nav links */}
        <div className="navbar-center-links">
          <button onClick={() => navigate("/signup?role=ADMIN")}>Admin</button>
          <button onClick={() => navigate("/signup?role=RECRUITER")}>
            Recruiter
          </button>
          <button onClick={() => navigate("/jobs")}>Job Listings</button>
        </div>

        {/* Right nav links */}
        <div className="navbar-right-links">
          <button onClick={() => navigate("/signin")} className="navbar-signin">
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup?role=FREELANCER")}
            className="navbar-signup"
          >
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
