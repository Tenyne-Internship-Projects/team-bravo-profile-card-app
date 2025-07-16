import { useEffect, useState } from "react";
import { getProjects } from "@/api/projectApi";
import FilterBar from "@/components/FilterBar";
import PublicHeader from "@/components/PublicHeader";
import ProjectCard from "@/components/ProjectCard";
import JobDetailModal from "@/components/JobDetailModal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openJobDetailModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <div className="projects-page">
      <PublicHeader />

      <main className="projects-main">
        <FilterBar filters={filters} onChange={handleSearch} />

        {loading ? (
          <div className="projects-loading">Loading projects...</div>
        ) : error ? (
          <div className="projects-error">{error}</div>
        ) : (
          <>
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDetailsClick={() => openJobDetailModal(project)}
                />
              ))}
            </div>

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
          </>
        )}
      </main>

      {/* Job Detail Modal - opened when a project is selected */}
      {isModalOpen && selectedProject && (
        <JobDetailModal isOpen={true} project={selectedProject} onClose={closeModal}>
          <div className="modal-actions">
            <button className="btn-primary">Apply Now</button>
            <button className="btn-outline">Save to Favorites</button>
          </div>
        </JobDetailModal>
      )}
    </div>
  );
};

export default Projects;
