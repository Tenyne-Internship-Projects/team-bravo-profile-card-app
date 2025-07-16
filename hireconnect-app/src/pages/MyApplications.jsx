import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import "../styles/MyApplications.css";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/applications`, {
          withCredentials: true,
        });
        setApplications(res.data.applications || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="my-applications-container">
      <h2 className="my-applications-heading">My Job Applications</h2>

      {applications.length === 0 ? (
        <p className="no-applications-text">
          You haven’t applied to any jobs yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Applied On</th>
                <th>Availability</th>
                <th>Expected Salary</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.job?.title || "N/A"}</td>
                  <td>{new Date(app.created_at).toLocaleDateString()}</td>
                  <td>{app.availability_type}</td>
                  <td>
                    {app.expected_salary_hourly
                      ? `$${app.expected_salary_hourly}/hr`
                      : `$${app.expected_salary_monthly}/mo`}
                  </td>
                  <td>
                    {app.freelancer?.documents?.[0] ? (
                      <a
                        href={`${backendUrl}/uploads/${app.freelancer.documents[0]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-link"
                      >
                        View
                      </a>
                    ) : (
                      "No file"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
