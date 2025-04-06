import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../CSS/Login.css';

export default function Login({ onAuth }) {  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('https://new-mini-project.onrender.com/login', { username, password });
            setSuccessMessage('Login successful!');
            onAuth();
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Login failed.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    // Handle Register
    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('https://new-mini-project.onrender.com/register', { username, password });
            setSuccessMessage('Registration successful! You can now log in.');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Registration failed.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
      <div className="container">
        <div className="card">
          <h2 className="heading">Welcome Back</h2>
          {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button login-button">
              Log In
            </button>
          </form>

          {/* Register Button */}
          <form onSubmit={handleRegister}>
            <button type="submit" className="button register-button">
              Register
            </button>
          </form>
        </div>
      </div>
    );
}
