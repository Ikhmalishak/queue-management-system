import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setAuthToken } from '../utils/api';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await api.post('/login', {
        email: formData.email,
        password: formData.password,
      });
  
      console.log('🚀 Login Response:', response.data);
  
      const { token, user } = response.data;
      const role = user?.role;
  
      setAuthToken(token);
  
      // ✅ Clear and set localStorage properly
      localStorage.clear();  // <- Clears any old stored values
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);
  
      console.log('🔹 Updated localStorage:', {
        authToken: localStorage.getItem("authToken"),
        userRole: localStorage.getItem("userRole"),
      });
  
      // ✅ Force page refresh to apply the updated role
      window.location.href = role === "admin" ? "/admin/dashboard" :
                             role === "doctor" ? "/doctor/dashboard" :
                             role === "employee" ? "/patient/dashboard" : "/";
  
    } catch (err) {
      console.error('❌ Login failed:', err);
      setError('Invalid email or password. Please try again.');
    }
  };  
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}

          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>

          <div className="text-center mt-3">
            <a href="#" className="text-decoration-none">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
