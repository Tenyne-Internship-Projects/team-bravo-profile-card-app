import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Menu } from "@headlessui/react";
import "../styles/DashboardHeader.css";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { logoutUser, user } = useContext(AppContext);

  return (
    <header className="dashboard-header">
      {/* Left: Logo and Navigation */}
      <div className="dashboard-left">
        <img
          src="/assets/kconnect.png"
          alt="KConnect Logo"
          className="dashboard-logo"
          onClick={() => navigate("/")}
        />

        <nav className="dashboard-nav">
          <button onClick={() => navigate("/jobs")}>Job Listings</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button onClick={() => navigate("/edit-profile")}>
            Edit Profile
          </button>
        </nav>
      </div>

      {/* Right: Avatar Menu */}
      <Menu as="div" className="menu-wrapper">
        <Menu.Button className="menu-button">
          <img
            src={user?.profilePic || "/assets/default-avatar.png"}
            alt="Profile"
          />
        </Menu.Button>

        <Menu.Items className="menu-items">
          <Menu.Item>
            {({ active }) => (
              <div
                onClick={() => navigate("/profile")}
                className={`menu-item ${active ? "active" : ""}`}
              >
                Avatar
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                onClick={logoutUser}
                className={`menu-item ${active ? "active" : ""}`}
              >
                Logout
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </header>
  );
};

export default DashboardHeader;
