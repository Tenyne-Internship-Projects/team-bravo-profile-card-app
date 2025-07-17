import React, { useState } from 'react';
import ClMetricsCards from '../components/cl_profile_statistics/ClMetricsCards';
import ClMetricsTimeline from '../components/cl_profile_statistics/ClMetricsTimeline';
import ClMetricsBudgetStatus from '../components/cl_profile_statistics/ClMetricsBudgetStatus';
import './ClMetricsProfile.css';

const ClMetricsProfile = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="metrics-container">
      <div className="metrics-header">
        <h2 className="welcome-text">Welcome, Samson</h2>

        <div className="notification-wrapper">
          <button
            className="notification-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            🔔
            <span className="notification-count">3</span>
          </button>

          {showDropdown && (
            <div className="notification-dropdown">
              <p className="dropdown-item">New project assigned</p>
              <p className="dropdown-item">Budget updated</p>
              <p className="dropdown-item">Timeline changed</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <ClMetricsCards />
      </div>

      <div className="chart-sections">
        <ClMetricsTimeline />
        <ClMetricsBudgetStatus />
      </div>
    </div>
  );
};

export default ClMetricsProfile;