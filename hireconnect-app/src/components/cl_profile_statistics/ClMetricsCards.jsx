import React from 'react';
import './ClMetricsCards.css';

const ClMetricsCards = () => {
  return (
    <section className="cards-section">
      {/* Project Success Card */}
      <div className="success-card">
        <p className="success-title">Project Success</p>
        <p className="success-percentage">85%</p>
        <button className="success-button">+5% ⬆️</button>
      </div>

      {/* 3 Overview Cards */}
      <div className="overview-cards">
        <div className="overview-card">
          <h2 className="overview-title text-green">Active Projects</h2>
          <p className="overview-value text-green-light">12</p>
          <span className="overview-note">4 due this week</span>
        </div>

        <div className="overview-card">
          <h3 className="overview-title text-red">Total Spending (YTD)</h3>
          <p className="overview-value text-green">$28.5K</p>
          <span className="overview-note">On Budget</span>
        </div>

        <div className="overview-card">
          <h3 className="overview-title text-purple">AVG Completion Time</h3>
          <p className="overview-value">18 Days</p>
          <button className="decline-button">-3 Days ⬇️</button>
        </div>
      </div>
    </section>
  );
};

export default ClMetricsCards;