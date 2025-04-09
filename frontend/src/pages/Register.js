import { useState } from "react";
import { registerUser } from "../services/api.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", organizationId: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // For redirecting after successful registration

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine role based on organizationId presence
    const role = formData.organizationId ? "admin" : "employee";

    const result = await registerUser({ ...formData, role }); // Send role with form data
    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage("User registered successfully!");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login page
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light">
      <div className="bg-soft p-8 rounded-xl shadow-lg w-96 border border-border">
        <h2 className="text-primary text-3xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-primary text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-medium text-deep border border-border focus:outline-none focus:ring-2 focus:ring-highlight placeholder-highlight transition duration-200"
            />
          </div>

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
              Organization ID (Optional for Employees)
            </label>
            <input
              type="text"
              name="organizationId"
              placeholder="Enter your organization ID if admin"
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-medium text-deep border border-border focus:outline-none focus:ring-2 focus:ring-highlight placeholder-highlight transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-dark text-white font-medium py-3 rounded-md transition duration-200 shadow-md"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="text-primary text-center mt-4 text-lg font-medium">
            {message}
          </p>
        )}

        <p className="text-highlight text-sm text-center mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary hover:underline transition duration-200"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
