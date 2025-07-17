import React from 'react';
import './Notification.css'; 

const FlMetricsNotifications = ({ count }) => (
  <div className="notification-wrapper">
    <span className="notification-icon">🔔</span>
    {count > 0 && (
      <span className="notification-badge">{count}</span>
    )}
  </div>
);

export default FlMetricsNotifications;