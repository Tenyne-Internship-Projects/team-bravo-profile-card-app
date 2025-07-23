import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { FaGithub } from "react-icons/fa";
import { loginWithGoogle } from "../api/authApi";
import { loginWithGitHub } from "../api/oauthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OAuthLoginButtons = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const id_token = credentialResponse.credential;
      const { user, accessToken } = await loginWithGoogle(id_token); // send token to your backend

      localStorage.setItem("token", accessToken);
      toast.success(`Welcome, ${user.name || user.email}`);
      navigate("/profile"); // Or based on role
    } catch (err) {
      toast.error("Google login failed");
      console.error(err);
    }
  };

  return (
    <div className="oauth-buttons">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error("Google login failed")}
      />

      <button onClick={loginWithGitHub} className="oauth-button">
        <FaGithub className="text-gray-800" />
        Continue with GitHub
      </button>
    </div>
  );
};

export default OAuthLoginButtons;
