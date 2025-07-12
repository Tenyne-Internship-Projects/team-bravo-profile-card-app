import { useState, useRef, useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import "../styles/NotificationDropdown.css"; // create this

const mockNotifications = [
  {
    id: 1,
    message: "New project matches your skills: UI Design Role",
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: 2,
    message: "Your profile has been approved!",
    timestamp: "Yesterday",
    isRead: false,
  },
  {
    id: 3,
    message: "You applied for Frontend Dev Role",
    timestamp: "2 days ago",
    isRead: true,
  },
];

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="notification-wrapper" ref={dropdownRef}>
      <button
        className="notification-icon"
        onClick={() => setOpen((prev) => !prev)}
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>

      <Transition
        show={open}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllAsRead}>Mark all as read</button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="empty-state">No notifications yet</div>
          ) : (
            <ul className="dropdown-list">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`dropdown-item ${n.isRead ? "read" : "unread"}`}
                >
                  <p>{n.message}</p>
                  <span className="timestamp">{n.timestamp}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Transition>
    </div>
  );
};

export default NotificationDropdown;
