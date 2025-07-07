import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Pages
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
import Projects from "./pages/Projects";

// Layouts & Guards
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "@/layout/MainLayout";
import PublicLayout from "@/layout/PublicLayout";

const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        {/* Public Landing Pages */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <PublicLayout>
                <Home />
              </PublicLayout>
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <PublicLayout>
                <SignUp />
              </PublicLayout>
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <PublicLayout>
                <Signin />
              </PublicLayout>
            </PublicRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <PublicRoute>
              <PublicLayout>
                <Onboarding />
              </PublicLayout>
            </PublicRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <PublicRoute>
              <PublicLayout>
                <Emailverify />
              </PublicLayout>
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <PublicLayout>
                <Resetpswd />
              </PublicLayout>
            </PublicRoute>
          }
        />
        <Route
          path="/confirm-reset/:token"
          element={
            <PublicRoute>
              <PublicLayout>
                <ConfirmReset />
              </PublicLayout>
            </PublicRoute>
          }
        />

        {/* Public Projects Page (visible without login) */}
        <Route
          path="/projects"
          element={
            <PublicRoute>
              <MainLayout>
                <Projects />
              </MainLayout>
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/profile"
            element={
              <MainLayout>
                <Profilecard />
              </MainLayout>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <MainLayout>
                <EditProfile />
              </MainLayout>
            }
          />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
