import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Video from "./Components/Video";
import Teachings from "./Components/Teachings";
import ContactUs from "./Components/ContactUs";
import GitaBotPage from "./Components/GitaBotPage";
import QuizPage from "./Components/QuizPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check cookie on first load
  useEffect(() => {
    const authCookie = Cookies.get("isAuthenticated");
    if (authCookie === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Update cookie whenever auth changes
  useEffect(() => {
    if (isAuthenticated) {
      Cookies.set("isAuthenticated", "true", { expires: 7 }); // expires in 7 days
    } else {
      Cookies.remove("isAuthenticated");
    }
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
        <Route path="/gita-bot" element={<GitaBotPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
