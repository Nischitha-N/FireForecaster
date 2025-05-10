import React, { useState, useEffect } from 'react';
import './UserDashboard.css';

const UserDashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 25,
    smoke: 0,
    status: 'normal'
  });

  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchSensorData = async () => {
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
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <div className="status-indicator" style={{ backgroundColor: getStatusColor(sensorData.status) }}>
          {sensorData.status.toUpperCase()}
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Sensor Data Card */}
        <div className="sensor-data-card">
          <h2>Sensor Readings</h2>
          <div className="sensor-readings">
            <div className="reading">
              <h3>Temperature</h3>
              <p className="value">{sensorData.temperature}°C</p>
              <p className="status">{sensorData.temperature > 35 ? 'High' : sensorData.temperature > 28 ? 'Warning' : 'Normal'}</p>
            </div>
            <div className="reading">
              <h3>Smoke Level</h3>
              <p className="value">{sensorData.smoke} ppm</p>
              <p className="status">{sensorData.smoke > 80 ? 'High' : sensorData.smoke > 50 ? 'Warning' : 'Normal'}</p>
            </div>
          </div>
        </div>

        {/* Danger Level Indicator */}
        <div className="danger-level-card">
          <h2>Current Risk Level</h2>
          <div className="danger-indicator" style={{ backgroundColor: getStatusColor(sensorData.status) }}>
            <span className="level">{sensorData.status}</span>
            <p className="description">
              {sensorData.status === 'normal' ? 'No immediate risk detected' :
               sensorData.status === 'warning' ? 'Elevated risk level - Monitor closely' :
               'High risk - Immediate attention required'}
            </p>
          </div>
        </div>

        {/* Alert Log Table */}
        <div className="alert-log-card">
          <h2>Recent Alerts</h2>
          <div className="alert-table">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Severity</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert, index) => (
                  <tr key={index}>
                    <td>{new Date(alert.timestamp).toLocaleString()}</td>
                    <td>{alert.type}</td>
                    <td>
                      <span className="severity-badge" style={{ backgroundColor: getStatusColor(alert.severity) }}>
                        {alert.severity}
                      </span>
                    </td>
                    <td>{alert.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 