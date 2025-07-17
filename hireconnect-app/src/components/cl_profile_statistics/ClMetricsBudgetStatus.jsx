import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './ClMetricsBudgetStatus.css';

const ClMetricsBudgetStatus = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        labels: ['$28.5K', '$35K'],
        datasets: [
          {
            data: [40, 60],
            backgroundColor: ['red', 'green'],
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) => ctx.label,
            },
          },
        },
      },
    });

    return () => chartInstance.destroy();
  }, []);

  return (
    <div className="budget-container">
      <h2 className="budget-title">Budget Status</h2>
      <div className="chart-wrapper">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ClMetricsBudgetStatus;