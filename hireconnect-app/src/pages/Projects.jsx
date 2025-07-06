import { useEffect, useState } from "react";
import { getProjects } from "@/api/projectApi";
import FilterBar from "@/components/FilterBar";
import ProjectCard from "@/components/ProjectCard";
import JobDetailPanel from "@/components/JobDetailPanel";
import Sidebar from "@/components/Sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    tags: [],
    location: "",
    minBudget: null,
    maxBudget: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await getProjects({ ...filters, page });
        setProjects(data.results);
        setError(null);
      } catch (err) {
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [filters, page]);

  const handleSearch = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <FilterBar filters={filters} onChange={handleSearch} />

        {loading ? (
          <div className="text-center text-purple-600 mt-10">
            Loading projects...
          </div>
        ) : error ? (
          <div className="text-red-600 text-center mt-10">{error}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mt-6">
            <div>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isSelected={selectedProject?.id === project.id}
                  onSelect={() => setSelectedProject(project)}
                />
              ))}

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                  disabled={page === 1}
                >
                  <ChevronLeft size={18} className="mr-2" /> Prev
                </button>

                <span className="text-gray-600 dark:text-gray-300">
                  Page {page}
                </span>

                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                >
                  Next <ChevronRight size={18} className="ml-2" />
                </button>
              </div>
            </div>

            <div>
              {selectedProject ? (
                <JobDetailPanel
                  project={selectedProject}
                  onClose={() => setSelectedProject(null)}
                />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                  Select a project to view details
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;
