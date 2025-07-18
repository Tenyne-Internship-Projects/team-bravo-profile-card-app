// src/components/PublicRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const PublicRoute = ({ children }) => {
  const { loading } = useContext(AppContext);

  if (loading) return <p>Loading...</p>;

  return children;
};
export default PublicRoute;
