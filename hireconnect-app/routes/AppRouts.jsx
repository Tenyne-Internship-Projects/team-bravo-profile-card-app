import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileCard from "./pages/ProfileCard";
import AdminDashboard from "./pages/AdminDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import DashboardHome from "@/pages/DashboardHome";
import Profile from "@/pages/Profile";
import Files from "@/pages/Files";

<Routes>
   <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="files" element={<Files />} />
        </Route>
        {/* other routes like /signin, /register, etc. */}
      </Routes>
  <Route path="/signin" element={<Signin />} />

  <Route element={<ProtectedRoute />}>
    <Route path="/profile" element={<ProfileCard />} />
  </Route>

  <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
    <Route path="/admin" element={<AdminDashboard />} />
  </Route>
</Routes>;
