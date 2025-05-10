// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import the CSS for Navbar
import logo from '../assets/logo.PNG';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Fire Forecaster Logo" className="logo-image" />
        </Link>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            About
          </Link>
          
          {token ? (
            <>
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/alerts" 
                className={`nav-link ${isActive('/alerts') ? 'active' : ''}`}
              >
                Alerts
              </Link>
              {role === 'admin' && (
                <Link 
                  to="/admin/dashboard" 
                  className={`nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
                >
                  Admin Panel
                </Link>
              )}
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={`nav-link ${isActive('/login') ? 'active' : ''}`}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
