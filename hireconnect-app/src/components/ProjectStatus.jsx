import React from 'react';

const ProjectStatus = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md max-w-[360px] mx-auto lg:ml-auto lg:mr-[-5rem]">
      <h2 className="text-2xl mb-6 font-semibold text-[#4d0892]">Project Status</h2>

      <div className="flex items-center justify-center md:justify-between gap-6 flex-col md:flex-row">
        {/* Circular Progress */}
        <div className="relative w-72 h-72"> {/* Adjusted size for visibility */}
          <svg className="w-full h-full transform -rotate-70">
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
              className="hover:opacity-80 transition duration-300"
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
              className="hover:opacity-80 transition duration-300"
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
              className="hover:opacity-80 transition duration-300"
            >
              <title>Pending: 10%</title>
            </circle>
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="bg-white rounded-full p-3 text-xl font-bold text-[#4d0892]">100%</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#00A550] rounded-sm"></div>
            <span className="text-sm font-medium">Completed Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#4d0892] rounded-sm"></div>
            <span className="text-sm font-medium">Active Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#FF2C2C] rounded-sm"></div>
            <span className="text-sm font-medium">Pending Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatus;