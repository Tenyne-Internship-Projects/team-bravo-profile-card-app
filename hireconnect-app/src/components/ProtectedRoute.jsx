// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, userData, loading } = useContext(AppContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[#302B63] text-lg font-medium">Checking access...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(userData?.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg font-semibold">Unauthorized</p>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
