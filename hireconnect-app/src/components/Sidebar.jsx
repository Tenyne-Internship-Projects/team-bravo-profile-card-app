// src/components/Sidebar.jsx
import { useNavigate } from "react-router-dom";
import "@/styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Dashboard</div>

      <nav className="sidebar-nav">
        <button onClick={() => navigate("/")} className="sidebar-button">
          Home
        </button>
        <button
          onClick={() => navigate("/projects")}
          className="sidebar-button"
        >
          Favourites
        </button>
        <button onClick={() => navigate("/profile")} className="sidebar-button">
          Profile
        </button>
        <button
          onClick={() => navigate("/edit-profile")}
          className="sidebar-button"
        >
          Edit Profile
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
