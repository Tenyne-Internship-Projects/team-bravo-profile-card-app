import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { Menu } from "@headlessui/react";
import { Bell, Search, Briefcase } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import NotificationDropdown from "./NotificationDropdown";
import "@/styles/DashboardHeader.css";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { logoutUser, user } = useContext(AppContext);
  const [available, setAvailable] = useState(user?.availability || false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = () => {
    setAvailable(!available);
    // Optional: Trigger API to update availability
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-left">
        <img
          src="/assets/kconnect.png"
          alt="KConnect Logo"
          className="dashboard-logo"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="dashboard-center">
        {/* Availability Toggle */}
        <label className="availability-toggle">
          <input type="checkbox" checked={available} onChange={handleToggle} />
          <span>{available ? "Available" : "Unavailable"}</span>
        </label>

        {/* Search */}
        <div className="search-bar">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search projects or users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Notifications */}
        <div className="notification-bell">
          <NotificationDropdown />
          <Bell size={20} />
          <span className="notif-count">3</span> {/* Optional dynamic count */}
          {/* You can implement dropdown with latest alerts here */}
        </div>

        {/* Explore Jobs Button */}
        <button
          className="explore-button"
          onClick={() => navigate("/projects")}
        >
          <Briefcase size={16} className="mr-1" />
          Explore Jobs
        </button>
      </div>

      <div className="dashboard-right">
        <Menu as="div" className="menu-wrapper">
          <Menu.Button className="menu-button">
            <img
              src={user?.profilePic || "/assets/default-avatar.png"}
              alt="Profile"
              className="avatar-img"
            />
          </Menu.Button>

          <Menu.Items className="menu-items">
            <Menu.Item>
              <div onClick={() => navigate("/profile")} className="menu-item">
                View Profile
              </div>
            </Menu.Item>

            <Menu.Item>
              <div className="menu-item">
                <ThemeToggle />
              </div>
            </Menu.Item>

            <Menu.Item>
              <div onClick={logoutUser} className="menu-item logout">
                Logout
              </div>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </header>
  );
};

export default DashboardHeader;
