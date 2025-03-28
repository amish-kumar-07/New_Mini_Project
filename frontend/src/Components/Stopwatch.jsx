import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Stopwatch.css";

const API_URL = "http://localhost:5000";  // Update with your server URL

const Stopwatch = ({ userId }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Fetch stopwatch status on mount and when isRunning changes
  useEffect(() => {
    const fetchStopwatch = async () => {
      try {
        const response = await axios.get(`${API_URL}/status/${userId}`);
        if (response.data) {
          setTime(Math.floor(response.data.elapsed_time || 0));
          setIsRunning(response.data.is_running);
        }
      } catch (error) {
        console.error("Error fetching stopwatch status:", error);
      }
    };
    fetchStopwatch();
  }, [userId, isRunning]);

  // Update timer when running
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

  // Handle Start/Pause
  const toggleStopwatch = async () => {
    try {
      if (isRunning) {
        await axios.post(`${API_URL}/stop`, { user_id: userId });
      } else {
        await axios.post(`${API_URL}/start`, { user_id: userId });
      }
      setIsRunning(!isRunning);
    } catch (error) {
      console.error("Error toggling stopwatch:", error);
    }
  };

  // Handle Reset
  const resetTime = async () => {
    try {
      await axios.post(`${API_URL}/reset`, { user_id: userId });
      setTime(0);
      setIsRunning(false);
    } catch (error) {
      console.error("Error resetting stopwatch:", error);
    }
  };

  // Format time (HH:MM:SS)
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Circular Progress Bar
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const progress = ((time % 60) / 60) * circumference;

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-card">
        <div className="progress-container">
          <svg className="progress-ring" width="250" height="250">
            <circle
              className="progress-background"
              cx="125"
              cy="125"
              r={radius}
            />
            <circle
              className="progress"
              cx="125"
              cy="125"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={Math.max(0, circumference - progress)}
            />
          </svg>
          <div className="time-display">{formatTime(time)}</div>
        </div>
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
