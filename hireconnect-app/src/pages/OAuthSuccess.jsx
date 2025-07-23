// pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      toast.success("OAuth login successful!");

      // Navigate based on user role if needed
      navigate("/profile");
    } else {
      toast.error("OAuth failed: No token received");
      navigate("/signin");
    }
  }, [navigate]);

  return <p>Processing OAuth login...</p>;
};

export default OAuthSuccess;
