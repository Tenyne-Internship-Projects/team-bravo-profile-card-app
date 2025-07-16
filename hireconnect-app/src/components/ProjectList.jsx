import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Pagination from "./Pagination";
import JobDetailPanel from "./JobDetailPanel";
import useProjectsFilter from "@/hooks/useProjectsFilter";
import { getProjects } from "@/api/projectApi";
import "../styles/ProjectList.css";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animations";

const ProjectList = () => {
  const { filters } = useProjectsFilter();

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const query = {
        search: filters.search,
        tags: filters.tags,
        min: filters.min,
        max: filters.max,
        page: pagination.currentPage,
      };

      const response = await getProjects(query);
      setProjects(response.results || []);
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
      });
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filters, pagination.currentPage]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <div className="project-list-grid">
      {/* Left Section: Listing */}
      <div className="project-list-left">
        {loading ? (
          <p className="project-list-message">Loading projects...</p>
        ) : error ? (
          <p className="project-list-error">{error}</p>
        ) : projects.length === 0 ? (
          <p className="project-list-message">No matching projects found.</p>
        ) : (
          <motion.div
            className="project-list-wrapper"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard
                  {...project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Right Section: Job Details */}
      <div className="project-list-right">
        {selectedProject && (
          <JobDetailPanel
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectList;
