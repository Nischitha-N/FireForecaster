import React from 'react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: "🔥",
      title: "Real-time Monitoring",
      description: "24/7 monitoring of temperature, smoke, and gas levels across your facility"
    },
    {
      icon: "📱",
      title: "Mobile Alerts",
      description: "Instant notifications on your mobile device for any detected anomalies"
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Comprehensive data visualization and trend analysis"
    },
    {
      icon: "🔒",
      title: "Automated Response",
      description: "Smart system that automatically triggers safety protocols"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Detection Accuracy" },
    { value: "< 30s", label: "Response Time" },
    { value: "24/7", label: "Monitoring" },
    { value: "100+", label: "Sensors Supported" }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Smart Fire Detection & Prevention System</h1>
          <p className="hero-subtitle">
            Advanced IoT-powered solution for proactive fire safety and prevention
          </p>
          <div className="hero-buttons">
            <button className="primary-button">Get Started</button>
            <button className="secondary-button">Learn More</button>
          </div>
        </div>
        {/* <div className="hero-image">
          <img src="/path-to-your-hero-image.png" alt="Fire Detection System" />
        </div> */}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sensor Network</h3>
            <p>Distributed IoT sensors monitor environmental conditions</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Data Analysis</h3>
            <p>AI algorithms analyze patterns and detect anomalies</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Alert System</h3>
            <p>Instant notifications to relevant personnel</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Automated Response</h3>
            <p>Smart system triggers appropriate safety measures</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Why Choose Our System?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Early Detection</h3>
            <p>Identify potential fire hazards before they escalate</p>
          </div>
          <div className="benefit-card">
            <h3>Cost Effective</h3>
            <p>Reduce insurance costs and prevent property damage</p>
          </div>
          <div className="benefit-card">
            <h3>Easy Integration</h3>
            <p>Seamlessly integrates with existing infrastructure</p>
          </div>
          <div className="benefit-card">
            <h3>Scalable Solution</h3>
            <p>Grows with your business needs</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Enhance Your Fire Safety?</h2>
        <p>Join hundreds of businesses already protected by our system</p>
        <button className="cta-button">Schedule a Demo</button>
      </section>
    </div>
  );
};

export default Home; 