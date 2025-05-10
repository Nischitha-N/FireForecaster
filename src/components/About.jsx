// About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Fire Forecaster</h1>
        
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>To revolutionize fire safety through advanced IoT technology, providing real-time monitoring and early warning systems that save lives and protect property.</p>
        </section>

        <section className="vision-section">
          <h2>Our Vision</h2>
          <p>To become the global leader in smart fire detection systems, making advanced fire prevention technology accessible to everyone.</p>
        </section>

        <section className="project-section">
          <h2>Project Overview</h2>
          <p>Fire Forecaster is an innovative IoT-based fire detection system that combines cutting-edge sensors with advanced analytics to provide comprehensive fire prevention solutions. Our system offers:</p>
          <ul>
            <li>Real-time temperature and smoke monitoring</li>
            <li>Instant alert notifications</li>
            <li>Historical data analysis</li>
            <li>Predictive risk assessment</li>
            <li>User-friendly dashboard interface</li>
          </ul>
        </section>

        <div className="about-cta">
          <Link to="/" className="back-home-button">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default About;
