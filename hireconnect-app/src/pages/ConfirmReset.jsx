import React, { useState, useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import AuthLayout from "../layout/AuthLayout";
import { CheckCircle } from "lucide-react";
import { confirmResetPassword } from "../api/authApi"; // ✅ Import API wrapper
import "../styles/auth.css";

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
      await confirmResetPassword({ token, password }); // ✅ Using wrapper
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
        className="w-32 mb-6"
        style={{ objectFit: "contain", cursor: "pointer" }}
        onClick={() => navigate("/")}
      />

      <div className="auth-wrapper">
        <h1 className="auth-title text-center">Set New Password</h1>

        <form
          onSubmit={handleSubmit}
          className="auth-form bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
          style={{ marginTop: "1rem" }}
        >
          {/* New Password */}
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

          {/* Confirm Password */}
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

          {/* Password Checklist */}
          <div className="space-y-1 text-sm mt-2">
            <p
              className={`flex items-center gap-2 ${
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
              className={`flex items-center gap-2 ${
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
              className={`flex items-center gap-2 ${
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

          <button
            type="submit"
            disabled={loading}
            className={`auth-button text-lg mt-4 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ConfirmReset;
