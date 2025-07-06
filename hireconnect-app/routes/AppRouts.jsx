import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileCard from "./pages/ProfileCard";
import AdminDashboard from "./pages/AdminDashboard";

<Routes>
  <Route path="/signin" element={<Signin />} />

  <Route element={<ProtectedRoute />}>
    <Route path="/profile" element={<ProfileCard />} />
  </Route>

  <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
    <Route path="/admin" element={<AdminDashboard />} />
  </Route>
</Routes>;
