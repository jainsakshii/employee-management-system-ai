import { useEffect, useState } from "react";
import { getOrganizations, selectOrg } from "../services/api.js";
import { useNavigate } from "react-router-dom";

const SelectOrganization = () => {
  const [organizations, setOrganizations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      const data = await getOrganizations();
      setOrganizations(data);
    };
    fetchOrganizations();
  }, []);

  const handleSelectOrg = async (orgId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("User ID missing!");

    const result = await selectOrg(userId, orgId);
    if (result.error) {
      alert(result.error);
    } else {
      localStorage.setItem("organizationId", orgId);
      alert("Organization selected successfully!");
      navigate("/home");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light">
      <div className="bg-soft p-8 rounded-xl shadow-lg w-96 border border-border">
        <h2 className="text-primary text-3xl font-semibold mb-6 text-center">
          Select Your Organization
        </h2>

        <div className="relative">
          <select
            className="w-full p-4 text-lg rounded-md bg-medium text-deep border border-border focus:outline-none focus:ring-2 focus:ring-highlight transition duration-200 cursor-pointer"
            onChange={(e) => handleSelectOrg(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Choose an organization
            </option>
            {organizations.length > 0 ? (
              organizations.map((org) => (
                <option key={org._id} value={org._id}>
                  {org.name}
                </option>
              ))
            ) : (
              <option disabled>No organizations available</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectOrganization;
