import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light">
      <div className="bg-soft p-8 rounded-xl shadow-lg w-96 text-center border border-border">
        <h2 className="text-primary text-3xl font-semibold mb-4">
          Welcome to Employee Manager 🎉
        </h2>
        <p className="text-highlight mb-6">You are successfully logged in.</p>

        <button
          onClick={handleLogout}
          className="w-full bg-primary hover:bg-dark text-white font-medium py-3 rounded-md transition duration-200 shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
