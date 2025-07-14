import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { checkOAuthAuth } from "./api/oauthApi";
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
import EditProfile from "./pages/EditProfile";
import ErrorPage from "./pages/ErrorPage";
import Projects from "./pages/Projects";
import DashboardLayout from "@/layout/DashboardLayout";
import DashboardHome from "@/pages/DashboardHome";
import Profile from "@/pages/Profile";
import Files from "@/pages/Files";

// Layouts & Guards
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "@/layout/MainLayout";
import PublicLayout from "@/layout/PublicLayout";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //  Global OAuth Auto-login Effect
  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const isOAuthRedirect =
        location.pathname === "/signin" || location.pathname === "/signup";

      if (isOAuthRedirect) {
        try {
          const { user, accessToken } = await checkOAuthAuth();
          if (accessToken) {
            localStorage.setItem("token", accessToken);
          }

          toast.success(`Welcome back, ${user.name || user.email}`);
          navigate("/profile");
        } catch (err) {
          console.log("OAuth session not authenticated:", err.message);
        }
      }
    };

    handleOAuthRedirect();
  }, [location.pathname, navigate]);

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
          path="/confirm-reset"
          element={
            <PublicRoute>
              <PublicLayout>
                <ConfirmReset />
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
              <Projects /> {/* No MainLayout here */}
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/profile"
            element={
              <MainLayout>
                <Profile />
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
          {/* Dashboard Routes - Nested Layout */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="files" element={<Files />} />
            {/* Add more dashboard routes here */}
          </Route>
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
