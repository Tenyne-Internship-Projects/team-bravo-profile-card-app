import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Onboarding.css";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Hire skilled freelancers or land your next big freelance gig.
          </h1>
          <p className="hero-subtext">
            Whether you're kickstarting your freelance journey or landing your
            next big gig, HireConnect connects you with the right opportunities
            to grow and thrive.
          </p>
          <div className="text-center space-y-2">
            <div className="button-with-label">
              <span className="freelancer-label">As a Freelancer</span>
              <div className="freelancer-line"></div>
            </div>
            <div className=".freelancer-card-content">
              <button
                onClick={() => navigate("/signup?role=FREELANCER")}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* CLIENT SECTION */}
      <section className="client-section">
        <h2 className="client-title">
          Build your dream team with exceptional freelancers
        </h2>
        <p className="client-subtext">
          HireConnect connects skilled professionals with businesses seeking
          flexible, high-quality talent. Designed for simplicity and speed, it
          empowers you to hire smarter.
        </p>
      </section>
    </div>
  );
};

export default Onboarding;
