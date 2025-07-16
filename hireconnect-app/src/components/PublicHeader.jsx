import NotificationDropdown from "./NotificationDropdown";
import {
  BellIcon,
  UserCircleIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import "../styles/PublicHeader.css";

const PublicHeader = () => {
  return (
    <header className="public-header">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src="/assets/kconnect.png" alt="Kconnect Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/projects">Explore Jobs</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      {/* Right-side Icons */}
      <div className="header-icons">
        {/* Available Jobs Button */}
        <button title="Available Jobs" className="available-jobs-button">
          <BriefcaseIcon className="icon" />
          <span>Available Jobs</span>
        </button>

        {/* Notification Icon */}
        <BellIcon className="icon" title="Notifications" />

        {/* Profile / Menu Icon */}
        <NotificationDropdown />
        <UserCircleIcon className="icon" title="Account" />
      </div>
    </header>
  );
};

export default PublicHeader;
