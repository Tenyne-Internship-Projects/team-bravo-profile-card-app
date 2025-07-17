import React from 'react';
import '../styles/ProjectStatus.css';

const FlMetricsProjectStatus = () => {
  return (
    <div className="project-status-container">
      <h2 className="project-status-heading">Project Status</h2>

      <div className="project-status-content">

        {/* Circular Progress */}
        <div className="progress-chart-wrapper">
          <svg className="progress-chart">
            <circle
              cx="50%"
              cy="50%"
              r="85"
              stroke="#e5e7eb"
              strokeWidth="20"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="85"
              stroke="#00A550"
              strokeWidth="20"
              strokeDasharray={`${(60 / 100) * 534} 534`}
              strokeLinecap="round"
              fill="none"
              className="progress-segment"
            >
              <title>Completed: 60%</title>
            </circle>
            <circle
              cx="50%"
              cy="50%"
              r="85"
              stroke="#4d0892"
              strokeWidth="20"
              strokeDasharray={`${(30 / 100) * 534} 534`}
              strokeDashoffset={`-${(60 / 100) * 534}`}
              strokeLinecap="round"
              fill="none"
              className="progress-segment"
            >
              <title>Active: 30%</title>
            </circle>
            <circle
              cx="50%"
              cy="50%"
              r="85"
              stroke="#FF2C2C"
              strokeWidth="20"
              strokeDasharray={`${(10 / 100) * 534} 534`}
              strokeDashoffset={`-${(90 / 100) * 534}`}
              strokeLinecap="round"
              fill="none"
              className="progress-segment"
            >
              <title>Pending: 10%</title>
            </circle>
          </svg>
          <div className="chart-center-text">
            <div className="percentage-text">100%</div>
          </div>
        </div>

        {/* Legend section */}
        <div className="project-legend">
          <div className="legend-item">
            <div className="legend-color completed"></div>
            <span>Completed Projects</span>
          </div>
          <div className="legend-item">
            <div className="legend-color active"></div>
            <span>Active Projects</span>
          </div>
          <div className="legend-item">
            <div className="legend-color pending"></div>
            <span>Pending Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlMetricsProjectStatus;