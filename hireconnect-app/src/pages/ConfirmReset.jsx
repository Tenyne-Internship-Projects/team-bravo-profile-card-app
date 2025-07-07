import React, { useState, useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import AuthLayout from "../layout/AuthLayout";
import { CheckCircle } from "lucide-react";
import { confirmResetPassword } from "../api/authApi";

import "../styles/auth.css";
import "../styles/ConfirmReset.css"; // ✅ External styles here

const ConfirmReset = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordChecks = useMemo(
    () => ({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }),
    [password]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.warning("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await confirmResetPassword({ token, password });
      toast.success("Password reset successful! Redirecting...");
      setTimeout(() => navigate("/signin"), 3000);
    } catch (err) {
      toast.error(err.message || "Reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout showBack={false}>
      <img
        src="/assets/kconnect.png"
        alt="KConnect Logo"
        className="logo-img"
        onClick={() => navigate("/")}
      />

      <div className="auth-wrapper">
        <h1 className="auth-title text-center">Set New Password</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <label className="auth-label">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="auth-input"
              required
            />
          </div>

          <div>
            <label className="auth-label">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="auth-input"
              required
            />
          </div>

          <div className="password-checklist">
            <p
              className={`password-check ${
                passwordChecks.length ? "text-green-600" : "text-gray-500"
              }`}
            >
              <CheckCircle
                className={`w-4 h-4 ${
                  passwordChecks.length ? "text-green-600" : "text-gray-400"
                }`}
              />
              At least 8 characters
            </p>
            <p
              className={`password-check ${
                passwordChecks.number ? "text-green-600" : "text-gray-500"
              }`}
            >
              <CheckCircle
                className={`w-4 h-4 ${
                  passwordChecks.number ? "text-green-600" : "text-gray-400"
                }`}
              />
              Includes a number
            </p>
            <p
              className={`password-check ${
                passwordChecks.special ? "text-green-600" : "text-gray-500"
              }`}
            >
              <CheckCircle
                className={`w-4 h-4 ${
                  passwordChecks.special ? "text-green-600" : "text-gray-400"
                }`}
              />
              Includes a special character
            </p>
          </div>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ConfirmReset;
