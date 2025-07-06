import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Onboarding.css";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-page">
      {/*  HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Hire Top Talents or Find Your Dream Gig
          </h1>
          <p className="hero-subtext">
            Whether you're building your team or launching your freelance
            career, HireConnect is your gateway to opportunity.
          </p>
          <button
            onClick={() => navigate("/signup?role=FREELANCER")}
            className="btn-primary"
          >
            Get Started
          </button>
        </div>
      </section>

      {/*  CLIENT SECTION */}
      <section className="client-section">
        <h2 className="client-title">
          Build your dream team with exceptional freelancers
        </h2>
        <p className="client-subtext">
          HireConnect connects skilled professionals with businesses seeking
          flexible, high-quality talent. Designed for simplicity and speed, it
          empowers you to hire smarter.
        </p>
        <button
          onClick={() => navigate("/signup?role=CLIENT")}
          className="btn-outline"
        >
          Join as a Client
        </button>
      </section>
    </div>
  );
};

export default Onboarding;
