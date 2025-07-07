import { useEffect, useState } from "react";
import { getProjects } from "@/api/projectApi";
import FilterBar from "@/components/FilterBar";
import ProjectCard from "@/components/ProjectCard";
import JobDetailPanel from "@/components/JobDetailPanel";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import "../styles/Projects.css";
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
    <div className="projects-page">
      <DashboardHeader />
      <h1 className="text-2xl font-semibold mb-4 px-6">All Projects</h1>

      <div className="projects-container">
        <Sidebar />

        <main className="projects-main">
          <FilterBar filters={filters} onChange={handleSearch} />

          {loading ? (
            <div className="projects-loading">Loading projects...</div>
          ) : error ? (
            <div className="projects-error">{error}</div>
          ) : (
            <div className="projects-grid">
              <div>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isSelected={selectedProject?.id === project.id}
                    onSelect={() => setSelectedProject(project)}
                  />
                ))}

                <div className="projects-pagination">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft size={18} className="mr-2" />
                    Prev
                  </button>

                  <span>Page {page}</span>

                  <button onClick={() => setPage((prev) => prev + 1)}>
                    Next
                    <ChevronRight size={18} className="ml-2" />
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
                  <div className="projects-empty">
                    Select a project to view details
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Projects;
