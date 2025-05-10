import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      console.log('Attempting to connect to:', `${config.API_URL}/auth/${isLogin ? 'login' : 'register'}`);
      console.log('Sending data:', { ...formData, password: '***' });

      const response = await fetch(`${config.API_URL}/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', formData.role);
          navigate(formData.role === 'admin' ? '/admin/dashboard' : '/dashboard');
        } else {
          setSuccess('Account created successfully! Please login.');
          setIsLogin(true);
          setFormData(prev => ({ ...prev, password: '' }));
        }
      } else {
        setError(data.message || `${isLogin ? 'Login' : 'Registration'} failed`);
      }
    } catch (err) {
      console.error('Error details:', err);
      setError('An error occurred. Please try again. Make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({
      username: '',
      password: '',
      role: 'user'
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Fire Detection System</h1>
          <p>{isLogin ? 'Login to access your dashboard' : 'Create a new account'}</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder={isLogin ? "Enter your password" : "Choose a password (min 6 characters)"}
              minLength={isLogin ? undefined : 6}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              disabled={isLoading}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={toggleForm} 
              className="toggle-form-button"
              disabled={isLoading}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 