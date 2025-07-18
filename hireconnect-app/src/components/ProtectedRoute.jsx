// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../styles/ProtectedRoute.css";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, userData, loading } = useContext(AppContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="protected-loading">
        <p className="protected-loading-text">Checking access...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(userData?.role)) {
    return (
      <div className="protected-unauthorized">
        <p className="protected-unauthorized-text">Unauthorized</p>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
