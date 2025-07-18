import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/ErrorPage.css"; // ✅ Import the stylesheet

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="error-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src="/assets/kconnect.png"
        alt="KConnect Logo"
        className="error-logo"
        whileHover={{ scale: 1.1 }}
        onClick={() => navigate("/")}
      />

      <motion.img
        src="/assets/404.jpg"
        alt="404 Illustration"
        className="error-image"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.h1
        className="error-title"
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Page Not Found
      </motion.h1>

      <motion.p
        className="error-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        The page you’re looking for doesn’t exist or has been moved. You’ll be
        redirected to the homepage shortly.
      </motion.p>

      <motion.button
        onClick={() => navigate("/")}
        className="error-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go Home Now
      </motion.button>
    </motion.div>
  );
};

export default ErrorPage;
