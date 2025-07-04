import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

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
    <div className="p-6 min-h-screen bg-blue-100">
      <h2 className="text-2xl font-semibold text-[#302B63] mb-6">
        My Job Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-600">You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm shadow bg-white rounded">
            <thead className="bg-gray-100 text-left text-[#302B63]">
              <tr>
                <th className="p-3">Project</th>
                <th className="p-3">Applied On</th>
                <th className="p-3">Availability</th>
                <th className="p-3">Expected Salary</th>
                <th className="p-3">Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{app.job?.title || "N/A"}</td>
                  <td className="p-3">
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">{app.availability_type}</td>
                  <td className="p-3">
                    {app.expected_salary_hourly
                      ? `$${app.expected_salary_hourly}/hr`
                      : `$${app.expected_salary_monthly}/mo`}
                  </td>
                  <td className="p-3 text-blue-600 underline">
                    {app.freelancer?.documents?.[0] ? (
                      <a
                        href={`${backendUrl}/uploads/${app.freelancer.documents[0]}`}
                        target="_blank"
                        rel="noopener noreferrer"
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
