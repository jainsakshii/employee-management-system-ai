import { useState } from "react";
import { loginUser } from "../services/api.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", organizationId: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(formData);

    if (result.error) {
      setMessage(result.error);
    } else {
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);
      localStorage.setItem("organizationId", result.organizationId || "");
      setMessage("Login successful!");
      navigate("/home"); // Redirect to Home page
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light">
      <div className="bg-soft p-8 rounded-xl shadow-lg w-96 border border-border">
        <h2 className="text-primary text-3xl font-semibold mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-primary text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-medium text-deep border border-border focus:outline-none focus:ring-2 focus:ring-highlight placeholder-highlight transition duration-200"
            />
          </div>

          <div>
            <label className="block text-primary text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-medium text-deep border border-border focus:outline-none focus:ring-2 focus:ring-highlight placeholder-highlight transition duration-200"
            />
          </div>

          <div>
            <label className="block text-primary text-sm font-medium mb-2">
              Organization ID (Optional for Admins)
            </label>
            <input
              type="text"
              name="organizationId"
              placeholder="Enter your organization ID (if admin)"
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-medium text-deep border border-border focus:outline-none focus:ring-2 focus:ring-highlight placeholder-highlight transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-dark text-white font-medium py-3 rounded-md transition duration-200 shadow-md"
          >
            Sign In
          </button>
        </form>

        {message && (
          <p className="text-primary text-center mt-4 text-lg font-medium">
            {message}
          </p>
        )}

        <p className="text-highlight text-sm text-center mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-primary hover:underline transition duration-200"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
