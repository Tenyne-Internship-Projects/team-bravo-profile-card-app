import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Mail, Lock, CheckCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import AuthLayout from "../layout/AuthLayout";
import { registerUser } from "../api/authApi";
import { toast } from "react-toastify";
import "../styles/auth.css";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const prefilledRole = params.get("role");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "FREELANCER", // default
    secret: "",
  });

  // Prioritize default user roles (FREELANCER, CLIENT)
  useEffect(() => {
    const validRoles = ["FREELANCER", "CLIENT", "RECRUITER", "ADMIN"];
    if (prefilledRole && validRoles.includes(prefilledRole.toUpperCase())) {
      setForm((prev) => ({ ...prev, role: prefilledRole.toUpperCase() }));
    }
  }, [prefilledRole]);

  const passwordChecks = useMemo(
    () => ({
      length: form.password.length >= 12,
      lowercase: /[a-z]/.test(form.password),
      uppercase: /[A-Z]/.test(form.password),
      number: /[0-9]/.test(form.password),
      special: /[^A-Za-z0-9]/.test(form.password),
    }),
    [form.password]
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const payload = { ...form };
      if (form.role !== "ADMIN") delete payload.secret;

      await registerUser(payload);
      toast.success("Registration successful!");

      //  Save email to localStorage for OTP verification
      localStorage.setItem("user_email", form.email.trim().toLowerCase());

      navigate("/verify-email", { state: { email: form.email } });
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  const handleOAuth = (provider) => {
    const urls = {
      google: "https://accounts.google.com/",
      github: "https://github.com/your‑username",
    };
    window.location.href = urls[provider];
  };

  const requirements = [
    { key: "length", label: "At least 12 characters" },
    { key: "lowercase", label: "Lowercase letter" },
    { key: "uppercase", label: "Uppercase letter" },
    { key: "number", label: "Includes a number" },
    { key: "special", label: "Special character" },
  ];

  return (
    <AuthLayout backTo="/">
      <h1 className="auth-title">Create your account</h1>

      <div className="w-full max-w-md space-y-3">
        <button
          onClick={() => handleOAuth("google")}
          className="auth-button-alt"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>
        <button
          onClick={() => handleOAuth("github")}
          className="auth-button-alt"
        >
          <FaGithub className="w-5 h-5 text-gray-800" />
          Continue with GitHub
        </button>
      </div>

      <div className="auth-divider">
        <span></span>Or continue with<span></span>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="relative">
          <User className="auth-icon" />
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="auth-input pl-10"
          />
        </div>

        <div className="relative">
          <Mail className="auth-icon" />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="auth-input pl-10"
          />
        </div>

        <div className="relative">
          <Lock className="auth-icon" />
          <input
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="auth-input pl-10"
          />
        </div>

        <div className="relative">
          <Lock className="auth-icon" />
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="auth-input pl-10"
          />
        </div>

        <div className="text-sm grid gap-1 mt-2">
          {requirements.map((req) => (
            <div key={req.key} className="flex items-center gap-2">
              <CheckCircle
                className={`w-4 h-4 ${
                  passwordChecks[req.key] ? "text-green-600" : "text-gray-400"
                }`}
              />
              <span
                className={
                  passwordChecks[req.key] ? "text-green-600" : "text-gray-500"
                }
              >
                {req.label}
              </span>
            </div>
          ))}
        </div>

        {/* Admin Secret */}
        {form.role === "ADMIN" && (
          <input
            type="text"
            name="secret"
            required
            placeholder="Enter Admin Secret Key"
            value={form.secret}
            onChange={handleChange}
            className="auth-input"
          />
        )}

        <button type="submit" className="auth-button">
          Sign up
        </button>
      </form>

      <p className="auth-footer">
        Already have an account?{" "}
        <span onClick={() => navigate("/signin")}>Sign in</span>
      </p>
    </AuthLayout>
  );
};

export default SignUp;
