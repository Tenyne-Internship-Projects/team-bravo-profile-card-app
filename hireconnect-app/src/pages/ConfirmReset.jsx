import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmResetPassword } from "../api/authApi";
import AuthLayout from "../layout/AuthLayout";
import { CheckCircle } from "lucide-react";
import "../styles/ConfirmReset.css"; // External CSS

const ConfirmReset = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) navigate("/reset-password");
  }, [email, navigate]);

  const passwordChecks = useMemo(() => ({
    length: newPassword.length >= 8,
    number: /\d/.test(newPassword),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  }), [newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword || !confirmPassword) {
      toast.warning("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await confirmResetPassword({ email, otp, newPassword });
      toast.success("Password reset successful!");
      navigate("/signin");
    } catch (err) {
      toast.error(err.message || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout showBack={false}>
      <div className="auth-wrapper">
        <h1 className="auth-title">Enter Reset Code</h1>
        <p className="auth-description">
          We sent a 6-digit code to <strong>{email}</strong>. Enter it below with your new password.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <label className="auth-label">Reset Code (OTP)</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the 6-digit code"
              className="auth-input"
              required
            />
          </div>

          <div>
            <label className="auth-label">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            <p className={`password-check ${passwordChecks.length ? "text-green-600" : "text-gray-500"}`}>
              <CheckCircle className={`${passwordChecks.length ? "text-green-600" : "text-gray-400"}`} />
              At least 8 characters
            </p>
            <p className={`password-check ${passwordChecks.number ? "text-green-600" : "text-gray-500"}`}>
              <CheckCircle className={`${passwordChecks.number ? "text-green-600" : "text-gray-400"}`} />
              Includes a number
            </p>
            <p className={`password-check ${passwordChecks.special ? "text-green-600" : "text-gray-500"}`}>
              <CheckCircle className={`${passwordChecks.special ? "text-green-600" : "text-gray-400"}`} />
              Includes a special character
            </p>
          </div>

          <button type="submit" disabled={loading} className="auth-button mt-2">
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ConfirmReset;
