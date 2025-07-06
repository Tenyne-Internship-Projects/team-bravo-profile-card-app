import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-4 h-full hidden md:block">
      <h2 className="text-xl font-semibold text-purple-700 mb-6">
        HireConnect
      </h2>

      <nav className="space-y-4">
        <button
          onClick={() => navigate("/")}
          className="w-full text-left px-4 py-2 rounded hover:bg-purple-100 dark:hover:bg-gray-700"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/jobs")}
          className="w-full text-left px-4 py-2 rounded hover:bg-purple-100 dark:hover:bg-gray-700"
        >
          Jobs
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="w-full text-left px-4 py-2 rounded hover:bg-purple-100 dark:hover:bg-gray-700"
        >
          Profile
        </button>
        <button
          onClick={() => navigate("/edit-profile")}
          className="w-full text-left px-4 py-2 rounded hover:bg-purple-100 dark:hover:bg-gray-700"
        >
          Edit Profile
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
