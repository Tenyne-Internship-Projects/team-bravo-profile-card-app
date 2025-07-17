// import React, { useEffect, useState } from 'react';
// import Card from '../components/Card';
// import Chart from '../components/Chart';
// import ProjectStatus from '../components/ProjectStatus';
// import Notification from '../components/Notification';

// const Dashboard = () => {
//   const [metrics, setMetrics] = useState(null);

//   useEffect(() => {
//     // Simulate backend data
//     const mockData = {
//       earnings: 12500,
//       projectsActive: 4,
//       avgProjectsValue: 850,
//       clientsRating: '4.8/5',
//       monthlyEarnings: [
//         { month: 'Jan', amount: 1000 },
//         { month: 'Feb', amount: 1200 },
//         { month: 'Mar', amount: 900 },
//         { month: 'Apr', amount: 1400 },
//         { month: 'May', amount: 1100 },
//         { month: 'Jun', amount: 1600 },
//       ],
//     };

//     setTimeout(() => {
//       setMetrics(mockData);
//     }, 500);
//   }, []);

//   if (!metrics) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="p-4 space-y-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <header className="flex justify-between items-center flex-wrap gap-2">
//         <h1 className="text-5xl font-bold text-[#4d0892]">Welcome back</h1>
//         <Notification count={3} />
//       </header>

//       {/* Cards Section */}
//       <div className="py-4 px-6">
//         <div className="flex flex-wrap mt-4 gap-4 justify-center md:justify-center w-full">
//           <Card title="Monthly Earnings" value={`$${metrics.earnings}`} link="/earnings" />
//           <Card title="Clients Rating" value={metrics.clientsRating} link="/clients/rating" />
//         </div>
//         <br />
//         <div className="flex flex-wrap gap-4 justify-between md:justify-center">
//           <Card title="AVG Project Value" value={`$${metrics.avgProjectsValue}`} link="/projects/completed" />
//           <Card title="Active Projects" value={metrics.projectsActive} link="/projects/active" />
//         </div>
//       </div>
//       {/* Chart and Project Status Section */}
//       <div className="flex flex-col md:flex-row gap-6 mt-6">
//         {/* Chart Section (Left) */}
//         <div className="flex-1 bg-white rounded-xl p-6 shadow-lg">
//           <h2 className="text-xl mb-4 font-semibold text-[#4d0892]">Earnings Over Time</h2>
//           <Chart data={metrics.monthlyEarnings} />
//         </div>
        
//       {/* Total Earnings Section - Vertical Flow */}
//       <div className=" bg-white rounded-xl p-6 shadow-2xl px-6 ml-15">
//         <h2 className="text-[35px] mb-6 font-semibold text-[#4d0892]">Total Earnings<br/> (6 Months)</h2><br/>
//         <p className="text-3xl px-12 font-bold text-gray-700">
//           ${metrics.monthlyEarnings.reduce((sum, item) => sum + item.amount, 0)}
//         </p>
//       </div>

//         {/* Project Status Section (Right) */}
//         <div className="flex-1 ">
//           <ProjectStatus />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Chart from '../components/Chart';
import ProjectStatus from '../components/ProjectStatus';
import Notification from '../components/Notification';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    // Simulate backend data
    const mockData = {
      earnings: 12500,
      projectsActive: 4,
      avgProjectsValue: 850,
      clientsRating: '4.8/5',
      monthlyEarnings: [
        { month: 'Jan', amount: 1000 },
        { month: 'Feb', amount: 1200 },
        { month: 'Mar', amount: 900 },
        { month: 'Apr', amount: 1400 },
        { month: 'May', amount: 1100 },
        { month: 'Jun', amount: 1600 },
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
        <Notification count={3} />
      </header>

      {/* Cards Section */}
      <div className="cards-wrapper">
        <div className="cards-row">
          <Card title="Monthly Earnings" value={`$${metrics.earnings}`} link="/earnings" />
          <Card title="Clients Rating" value={metrics.clientsRating} link="/clients/rating" />
        </div>
        <br />
        <div className="cards-row">
          <Card title="AVG Project Value" value={`$${metrics.avgProjectsValue}`} link="/projects/completed" />
          <Card title="Active Projects" value={metrics.projectsActive} link="/projects/active" />
        </div>
      </div>

      {/* Chart and Project Status Section */}
      <div className="main-section">
        {/* Chart */}
        <div className="chart-section">
          <h2 className="section-heading">Earnings Over Time</h2>
          <Chart data={metrics.monthlyEarnings} />
        </div>

        {/* Total Earnings */}
        <div className="earnings-summary">
          <h2 className="section-heading big">Total Earnings<br /> (6 Months)</h2>
          <p className="total-amount">
            ${metrics.monthlyEarnings.reduce((sum, item) => sum + item.amount, 0)}
          </p>
        </div>

        {/* Project Status */}
        <div className="project-status-section">
          <ProjectStatus />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
