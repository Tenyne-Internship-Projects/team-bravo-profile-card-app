import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { sendResetOtp } from "../api/authApi";
import AuthLayout from "../layout/AuthLayout";
import "../styles/auth.css";

const Resetpswd = () => {
  const [state, setState] = useState("unreset");
  const [email, setEmail] = useState("");
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Please enter your email");
      return;
    }

    try {
      await sendResetOtp(email);
      setState("sent");
      toast.success("Reset OTP sent! Check your inbox.");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout backTo="/signin">
      {state === "unreset" ? (
        <div className="auth-wrapper">
          <h1 className="auth-title">Reset your password</h1>
          <p className="auth-description">
            Enter the email address associated with your account and we’ll send
            you a code to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                className="auth-input"
                required
              />
            </div>

            <button type="submit" className="auth-button mt-2">
              Send Reset Code
            </button>
          </form>
        </div>
      ) : (
        <div className="auth-wrapper">
          <h1 className="auth-title">Check your inbox</h1>
          <p className="auth-description">
            We’ve sent a password reset code to your email. If you don’t see it
            in your inbox, check your spam or junk folder. The code expires in
            15–30 minutes.
          </p>

          <button
            onClick={() => {
              setState("unreset");
              setEmail("");
            }}
            className="auth-button"
          >
            Send Another Code
          </button>
        </div>
      )}

      <p className="auth-footer">
        {state === "unreset" ? (
          <>
            Remembered your password?{" "}
            <span onClick={() => navigate("/signin")}>Sign in here</span>
          </>
        ) : (
          <>
            Return to <span onClick={() => navigate("/signin")}>Sign in</span>
          </>
        )}
      </p>
    </AuthLayout>
  );
};

export default Resetpswd;
