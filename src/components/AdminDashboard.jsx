import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // TODO: Replace with actual API calls
      const [usersRes, sensorsRes, alertsRes] = await Promise.all([
        fetch('/api/users', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('/api/sensors', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('/api/alerts', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      const [usersData, sensorsData, alertsData] = await Promise.all([
        usersRes.json(),
        sensorsRes.json(),
        alertsRes.json()
      ]);

      setUsers(usersData);
      setSensors(sensorsData);
      setAlerts(alertsData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleAddSensor = () => {
    // TODO: Implement sensor addition
  };

  const handleEditSensor = (sensorId) => {
    // TODO: Implement sensor editing
  };

  const handleDeleteSensor = (sensorId) => {
    // TODO: Implement sensor deletion
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button 
            className={`tab-button ${activeTab === 'sensors' ? 'active' : ''}`}
            onClick={() => setActiveTab('sensors')}
          >
            Sensors
          </button>
          <button 
            className={`tab-button ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            Alerts
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="users-section">
            <h2>User Management</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-button edit">Edit</button>
                        <button className="action-button delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sensors Tab */}
        {activeTab === 'sensors' && (
          <div className="sensors-section">
            <div className="section-header">
              <h2>Sensor Management</h2>
              <button className="add-button" onClick={handleAddSensor}>
                Add New Sensor
              </button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Sensor ID</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Last Reading</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sensors.map(sensor => (
                    <tr key={sensor.id}>
                      <td>{sensor.id}</td>
                      <td>{sensor.location}</td>
                      <td>
                        <span className={`status-badge ${sensor.status}`}>
                          {sensor.status}
                        </span>
                      </td>
                      <td>{sensor.lastReading}</td>
                      <td>
                        <button 
                          className="action-button edit"
                          onClick={() => handleEditSensor(sensor.id)}
                        >
                          Edit
                        </button>
                        <button 
                          className="action-button delete"
                          onClick={() => handleDeleteSensor(sensor.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="alerts-section">
            <h2>Alert Overview</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Sensor</th>
                    <th>Type</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map(alert => (
                    <tr key={alert.id}>
                      <td>{new Date(alert.timestamp).toLocaleString()}</td>
                      <td>{alert.sensorId}</td>
                      <td>{alert.type}</td>
                      <td>
                        <span className={`severity-badge ${alert.severity}`}>
                          {alert.severity}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${alert.status}`}>
                          {alert.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-button view">View</button>
                        <button className="action-button resolve">Resolve</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 