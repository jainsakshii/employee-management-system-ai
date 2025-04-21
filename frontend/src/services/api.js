import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response.data);
    return { error: error.response.data.msg };
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    console.log("!!!!LOGIN RESPONSE!!!!!", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response.data.msg);
    return { error: error.response.data };
  }
};


// ✅ New API for fetching organizations
export const getOrganizations = async () => {
  try {
    const response = await axios.get(`${API_URL}/organizations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching organizations:", error.response.data);
    return [];
  }
};

// ✅ New API for selecting an organization
export const selectOrg = async (userId, organizationId) => {
  try {
    const response = await axios.post(`${API_URL}/organizations/selectOrg`, {
      userId,
      organizationId,
    });
    console.log("!!!!RESPONSE!!!!!", response.data);
    return response.data;
  } catch (error) {
    console.error("Organization selection error:", error.response.data);
    return { error: error.response.data.msg };
  }
};

// ✅ New API to fetch users by organization ID
export const getUsersByOrganization = async (organizationId) => {
  try {
    const response = await axios.get(`${API_URL}/organizations/${organizationId}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users by organization:", error.response.data);
    return { error: error.response.data.msg };
  }
};

// Create a new Project
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error.response.data);
    return { error: error.response.data.msg };
  }
};
