import React, { useEffect, useState } from "react";
import FlMetricsCard from "../components/profileStatistics/FlMetricsCard";
import FlMetricsChart from "../components/profileStatistics/FlMetricsChart";
import FlMetricsNotifications from "../components/profileStatistics/FlMetricsNotifications";
import FlMetricsProjectStatus from "../components/profileStatistics/FlMetricsProjectStatus";
import "../styles/ProfileStatistics.css";

const ProfileStatistics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const mockData = {
      earnings: 12500,
      projectsActive: 4,
      avgProjectsValue: 850,
      clientsRating: "4.8/5",
      monthlyEarnings: [
        { month: "Jan", amount: 1000 },
        { month: "Feb", amount: 1200 },
        { month: "Mar", amount: 900 },
        { month: "Apr", amount: 1400 },
        { month: "May", amount: 1100 },
        { month: "Jun", amount: 1600 },
      ],
    };

    setTimeout(() => {
      setMetrics(mockData);
    }, 500);
  }, []);

  if (!metrics) return <p className="loading-text">Loading...</p>;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Welcome back</h1>
        <FlMetricsNotifications count={3} />
      </header>

      {/* Cards Section */}
      <div className="cards-wrapper">
        <div className="cards-row">
          <FlMetricsCard
            title="Monthly Earnings"
            value={`$${metrics.earnings}`}
            link="/dashboard/client/earnings"
          />
          <FlMetricsCard
            title="Clients Rating"
            value={metrics.clientsRating}
            link="/dashboard/client/reviews"
          />
        </div>
        <br />
        <div className="cards-row">
          <FlMetricsCard
            title="AVG Project Value"
            value={`$${metrics.avgProjectsValue}`}
            link="/dashboard/client/projects"
          />
          <FlMetricsCard
            title="Active Projects"
            value={metrics.projectsActive}
            link="/dashboard/client/projects/active"
          />
        </div>
      </div>

      {/* Main Section */}
      <div className="main-section">
        {/* Earnings Chart */}
        <div className="chart-section">
          <h2 className="section-heading">Earnings Over Time</h2>
          <FlMetricsChart data={metrics.monthlyEarnings} />
        </div>

        {/* Total Earnings Summary */}
        <div className="earnings-summary">
          <h2 className="section-heading big">
            Total Earnings
            <br /> (6 Months)
          </h2>
          <p className="total-amount">
            $
            {metrics.monthlyEarnings.reduce(
              (sum, item) => sum + item.amount,
              0
            )}
          </p>
        </div>

        {/* Project Status Chart */}
        <div className="project-status-section">
          <FlMetricsProjectStatus />
        </div>
      </div>
    </div>
  );
};

export default ProfileStatistics;
