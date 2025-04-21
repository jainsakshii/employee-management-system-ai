import React, { useEffect, useState } from "react";
import { getUsersByOrganization } from "../services/api.js";
import { useNavigate } from "react-router-dom";

const OrganizationDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const history = useNavigate(); // Hook to navigate to different routes

  const organizationId = localStorage.getItem("organizationId");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!organizationId) {
        setError("Organization ID not found.");
        return;
      }

      const response = await getUsersByOrganization(organizationId);
      if (response.error) {
        setError(response.error);
      } else {
        const filtered = response.filter((user) => user.role !== "admin");
        setUsers(filtered);
      }
    };

    fetchUsers();
  }, [organizationId]);

  const handleCreateProject = () => {
    // Navigate to the CreateProject page when the button is clicked
    history("/create-project");
  };

  return (
    <div className="min-h-screen bg-light text-deep px-8 py-10">
      <h1 className="text-primary text-3xl font-bold mb-8 text-center">
        Employees in your Organization
      </h1>

      {error && (
        <p className="text-red-500 text-center mb-6 text-lg">{error}</p>
      )}

      {!error && users.length === 0 ? (
        <p className="text-highlight text-center">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-deep bg-medium">
            <thead>
              <tr className="text-highlight border-b border-border">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-dark border-b border-border transition duration-150"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 text-center">
        {/* Create Project Button */}
        <button
          onClick={handleCreateProject}
          className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Create New Project
        </button>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
