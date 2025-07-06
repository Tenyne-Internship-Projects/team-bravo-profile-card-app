import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "../layout/AuthLayout";
import { loginUser } from "../api/authApi";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import "../styles/auth.css";

const Signin = () => {
  const navigate = useNavigate();
  const { setUserData, setIsLoggedIn, getUserData } = useContext(AppContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");

      setIsLoggedIn(true);
      await getUserData?.(); // fetch profile to update context

      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  const handleOAuth = (provider) => {
    const authWindow = window.open(
      `${backendUrl}/api/auth/${provider}`,
      "_blank",
      "width=600,height=600"
    );

    const checkPopup = setInterval(() => {
      try {
        if (authWindow.closed) {
          clearInterval(checkPopup);
          // After OAuth window closes, you can call is-auth
          // to check if login succeeded
          getUserData(); // Assuming it sets isLoggedIn
          toast.success("Logged in via OAuth");
          navigate("/profile");
        }
      } catch (err) {
        // Ignore cross-origin error
      }
    }, 1000);
  };

  return (
    <AuthLayout backTo="/signup">
      <h1 className="auth-title">Sign in to your account</h1>

      {/* OAuth Buttons */}
      <div className="w-full space-y-3">
        <button
          onClick={() => handleOAuth("google")}
          className="auth-button-alt"
        >
          <FcGoogle className="w-5 h-5 text-[#4285F4]" />
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

      {/* Divider */}
      <div className="auth-divider">
        <span />
        <p>Or continue with</p>
        <span />
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="auth-form">
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

        {/* Forgot Password */}
        <div className="w-full text-right mb-2">
          <button
            type="button"
            onClick={() => navigate("/reset-password")}
            className="text-sm text-[#4d0892] hover:underline cursor-pointer bg-transparent"
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className="auth-button">
          Sign in
        </button>
      </form>

      {/* Signup Redirect */}
      <p className="auth-footer">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/signup")}>Sign up</span>
      </p>
    </AuthLayout>
  );
};

export default Signin;
