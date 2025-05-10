// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <div className="fire-icon">🔥</div>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for seems to have gone up in smoke.</p>
        <Link to="/" className="home-button">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
