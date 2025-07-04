// src/components/ProjectList.jsx
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Pagination from "./Pagination";
import JobDetailPanel from "./JobDetailPanel";
import useProjectsFilter from "@/hooks/useProjectsFilter";
import { getProjects } from "@/api/projectApi";

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
    <div className="grid grid-cols-3 gap-4 relative">
      {/* Left Section: Listing */}
      <div className="col-span-2">
        {loading ? (
          <p className="text-center py-8">Loading projects...</p>
        ) : error ? (
          <p className="text-red-500 text-center py-8">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-center py-8">No matching projects found.</p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              onClick={() => setSelectedProject(project)}
            />
          ))
        )}

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Right Section: Job Details */}
      <div className="col-span-1">
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
