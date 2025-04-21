import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import SelectOrganization from "./pages/SelectOrganization.jsx";
import OrganizationDashboard from "./pages/OrganizationDashboard.jsx";
import CreateProject from "./pages/CreateProject.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/select-organization" element={<SelectOrganization />} />
        <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
        <Route path="/create-project" element={<CreateProject/>}/>
      </Routes>
    </Router>
  );
}

export default App;

