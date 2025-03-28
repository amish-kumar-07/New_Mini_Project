import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../CSS/Login.css';

export default function Login({ onAuth }) {  
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // **Handle Login**
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:5000/login', { name, password });
            setSuccessMessage('Login successful!');
            onAuth(); // Call authentication function
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Login failed.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    // **Handle Register**
    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:3000/register', { name, password });
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
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

          {/* Register Form */}
          <form onSubmit={handleRegister}>
            <button type="submit" className="button register-button">
              Register
            </button>
          </form>

        </div>
      </div>
    );
}
