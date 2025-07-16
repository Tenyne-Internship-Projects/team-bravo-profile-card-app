import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthLayout.css";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="auth-layout-bg">
      <main className="auth-main">
        <div className="auth-card">
          {/* Left Background Section */}
          <div className="auth-bg"></div>

          {/* Right Form Section */}
          <div className="auth-content">
            {/* Logo - Clickable */}
            <img
              src="/assets/kconnect.png"
              alt="KConnect Logo"
              className="w-32 mb-4 cursor-pointer"
              onClick={() => navigate("/")}
              style={{ objectFit: "contain" }}
            />

            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
