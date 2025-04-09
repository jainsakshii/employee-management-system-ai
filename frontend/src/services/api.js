import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response.data);
    return { error: error.response.data.msg };
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response.data);
    return { error: error.response.data.msg };
  }
};
