// src/components/PublicRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AppContext);
  return isLoggedIn ? <Navigate to="/profile" /> : children;
};

export default PublicRoute;
