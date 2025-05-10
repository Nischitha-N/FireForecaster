// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 25,
    smoke: 0,
    status: 'normal'
  });

  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      updateSensorData();
    }, 5000);

    fetchInitialData();

    return () => clearInterval(interval);
  }, []);

  const fetchInitialData = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/sensors/data', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setSensorData(data.sensorData);
      setAlerts(data.alerts);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const updateSensorData = () => {
    // Simulate sensor data updates
    const newTemp = Math.random() * 10 + 20; // 20-30°C
    const newSmoke = Math.random() * 100; // 0-100 ppm
    let newStatus = 'normal';

    if (newTemp > 28 || newSmoke > 50) {
      newStatus = 'warning';
    }
    if (newTemp > 35 || newSmoke > 80) {
      newStatus = 'danger';
    }

    setSensorData({
      temperature: newTemp.toFixed(1),
      smoke: newSmoke.toFixed(1),
      status: newStatus
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return '#4CAF50';
      case 'warning':
        return '#FFC107';
      case 'danger':
        return '#F44336';
      default:
        return '#4CAF50';
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Fire Detection Dashboard</h1>
        <div className="status-indicator" style={{ backgroundColor: getStatusColor(sensorData.status) }}>
          {sensorData.status.toUpperCase()}
        </div>
      </div>

      <div className="sensor-grid">
        <div className="sensor-card">
          <h3>Temperature</h3>
          <div className="sensor-value">
            {sensorData.temperature}°C
          </div>
          <div className="sensor-status">
            {sensorData.temperature > 35 ? 'High' : sensorData.temperature > 28 ? 'Warning' : 'Normal'}
          </div>
        </div>

        <div className="sensor-card">
          <h3>Smoke Level</h3>
          <div className="sensor-value">
            {sensorData.smoke} ppm
          </div>
          <div className="sensor-status">
            {sensorData.smoke > 80 ? 'High' : sensorData.smoke > 50 ? 'Warning' : 'Normal'}
          </div>
        </div>
      </div>

      <div className="alerts-section">
        <h2>Recent Alerts</h2>
        <div className="alerts-list">
          {alerts.map((alert, index) => (
            <div key={index} className="alert-item" style={{ borderLeftColor: getStatusColor(alert.severity) }}>
              <div className="alert-header">
                <span className="alert-severity">{alert.severity}</span>
                <span className="alert-time">{new Date(alert.timestamp).toLocaleString()}</span>
              </div>
              <p className="alert-message">{alert.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
