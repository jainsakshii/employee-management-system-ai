import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

