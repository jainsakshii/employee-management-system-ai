import React, { useState, useEffect } from "react";
import { createProject, getUsersByOrganization } from "../services/api.js";

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    deadline: "",
    employeeIds: [],
  });
  const [employees, setEmployees] = useState([]);

  const organizationId = localStorage.getItem("organizationId");

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await getUsersByOrganization(organizationId);
      setEmployees(res || []);
    };
    fetchEmployees();
  }, [organizationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: projectData.name,
      description: projectData.description,
      deadline: projectData.deadline,
      employeeIds: projectData.employeeIds,
      organization_id: organizationId,
    };

    const response = await createProject(payload);

    if (response.error) {
      console.error("Project creation error:", response.error);
    } else {
      console.log("✅ Project created successfully:", response);
      setProjectData({
        name: "",
        description: "",
        deadline: "",
        employeeIds: [],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto space-y-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-center">Create New Project</h2>

      <input
        type="text"
        name="name"
        placeholder="Project Name"
        value={projectData.name}
        onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Project Description"
        value={projectData.description}
        onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="date"
        name="deadline"
        value={projectData.deadline}
        onChange={(e) => setProjectData({ ...projectData, deadline: e.target.value })}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <select
        multiple
        name="employeeIds"
        value={projectData.employeeIds}
        onChange={(e) =>
          setProjectData({
            ...projectData,
            employeeIds: Array.from(e.target.selectedOptions, (option) => option.value),
          })
        }
        className="w-full border px-3 py-2 rounded"
      >
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
      >
        Create Project
      </button>
    </form>
  );
};

export default CreateProject;
