// src/components/Sidebar.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Upload,
  User,
  FileText,
  Heart,
  Settings,
  Eye,
  Power,
} from "lucide-react";
import "@/styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <Upload size={20} />, label: "Uploads", path: "/uploads" },
    { icon: <User size={20} />, label: "Profile", path: "/profile" },
    { icon: <FileText size={20} />, label: "Files", path: "/files" },
    { icon: <Heart size={20} />, label: "Favourites", path: "/favorites" },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/settings",
    },
    {
      icon: <Eye size={20} />,
      label: "Metrics",
      path: "/metrics",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`sidebar ${expanded ? "expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="sidebar-wrapper">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`sidebar-btn ${isActive(item.path) ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {expanded && <span className="sidebar-label">{item.label}</span>}
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        <button className="sidebar-btn logout" onClick={() => navigate("/logout")}>
          <Power size={20} />
          {expanded && <span className="sidebar-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
