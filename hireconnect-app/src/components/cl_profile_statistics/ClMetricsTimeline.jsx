import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './ClMetricsTimeline.css';

const ClMetricsTimeline = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Progress',
          data: [12, 19, 3, 5, 9],
          backgroundColor: '#4d0892',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    return () => chartInstance.destroy();
  }, []);

  return (
    <div className="timeline-container">
      <h2 className="timeline-title">Project Timeline</h2>
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ClMetricsTimeline;