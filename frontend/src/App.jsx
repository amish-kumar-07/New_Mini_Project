import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Video from "./Components/Video";
import Teachings from "./Components/Teachings";
import ContactUs from "./Components/ContactUs";
import GitaBotPage from "./Components/GitaBotPage"; // Import Bot Page

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onAuth={handleAuth} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/teachings" element={<Teachings />} />
        <Route path="/video" element={<Video />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/gita-bot" element={<GitaBotPage />} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
