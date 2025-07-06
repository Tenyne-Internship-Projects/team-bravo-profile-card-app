import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Page imports
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Onboarding from "./pages/Onboarding";
import Emailverify from "./pages/Emailverify";
import Resetpswd from "./pages/Resetpswd";
import ConfirmReset from "./pages/ConfirmReset";
import Profilecard from "./pages/Profilecard";
import EditProfile from "./pages/EditProfile";
import ErrorPage from "./pages/ErrorPage";
// import Projects from "./pages/Projects";

// Layouts and guards
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar /> {/* Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/verify-email" element={<Emailverify />} />
        <Route path="/reset-password" element={<Resetpswd />} />
        <Route path="/confirm-reset/:token" element={<ConfirmReset />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profilecard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
