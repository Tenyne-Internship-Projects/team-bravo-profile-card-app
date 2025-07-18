import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { loginWithGoogle, loginWithGitHub } from "../api/oauthApi";
import "../styles/OAuthLoginButtons.css";

const OAuthLoginButtons = () => {
  return (
    <div className="oauth-buttons">
      <button onClick={loginWithGoogle} className="oauth-button">
        <FcGoogle />
        Continue with Google
      </button>

      <button onClick={loginWithGitHub} className="oauth-button">
        <FaGithub className="text-gray-800" />
        Continue with GitHub
      </button>
    </div>
  );
};

export default OAuthLoginButtons;
