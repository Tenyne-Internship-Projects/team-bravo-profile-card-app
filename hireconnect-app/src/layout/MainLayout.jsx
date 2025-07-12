// src/layouts/MainLayout.jsx
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar"; // Make sure this path is correct

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <div className="flex flex-1">
        {/* Sidebar for navigation */}
        <Sidebar />

        {/* Page content */}
        <main className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
