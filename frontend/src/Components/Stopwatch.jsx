import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Stopwatch.css";

const API_URL = "http://localhost:3000"; 

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [userId, setUserId] = useState(null);

  // Fetch logged-in user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${API_URL}/current-user`);
        setUserId(response.data.loggedInUserId);
      } catch (error) {
        console.error("❌ Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Fetch stopwatch status
  useEffect(() => {
    if (userId) {
      const fetchStopwatch = async () => {
        try {
          const response = await axios.get(`${API_URL}/status/${userId}`);
          if (response.data) {
            setTime(Math.floor(response.data.elapsed_time || 0));
            setIsRunning(response.data.is_running);
          }
        } catch (error) {
          console.error("❌ Error fetching stopwatch status:", error);
        }
      };

      fetchStopwatch();
    }
  }, [userId]);

  // Update time every second when running
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Start/Stop Stopwatch
  const toggleStopwatch = async () => {
    if (!userId) return;
    try {
      if (isRunning) {
        await axios.post(`${API_URL}/stop`, { user_id: userId });
      } else {
        await axios.post(`${API_URL}/start`, { user_id: userId });
      }
      setIsRunning(!isRunning);
    } catch (error) {
      console.error("❌ Error toggling stopwatch:", error);
    }
  };

  // Reset Stopwatch
  const resetTime = async () => {
    if (!userId) return;
    try {
      await axios.post(`${API_URL}/reset`, { user_id: userId });
      setTime(0);
      setIsRunning(false);
    } catch (error) {
      console.error("❌ Error resetting stopwatch:", error);
    }
  };

  // Format Time Display (hh:mm:ss)
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}h:${String(minutes).padStart(2, "0")}m:${String(secs).padStart(2, "0")}s`;
  };

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-card">
        <div className="time-display">{formatTime(time)}</div>
        <div className="button-container">
          <button onClick={toggleStopwatch}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={resetTime}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
