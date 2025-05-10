import React, { useState, useEffect } from 'react';
import './AlertDashboard.css';

const AlertDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({
    totalAlerts: 0,
    activeAlerts: 0,
    resolvedAlerts: 0,
    criticalAlerts: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/alerts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setAlerts(data.alerts);
      setStats(data.stats);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      setIsLoading(false);
    }
  };

  const handleAcknowledge = async (alertId) => {
    try {
      await fetch(`/api/alerts/${alertId}/acknowledge`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchAlerts(); // Refresh alerts after acknowledgment
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

  const handleResolve = async (alertId) => {
    try {
      await fetch(`/api/alerts/${alertId}/resolve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchAlerts(); // Refresh alerts after resolution
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  const getAlertIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'fire':
        return '🔥';
      case 'smoke':
        return '💨';
      case 'temperature':
        return '🌡️';
      case 'system':
        return '⚙️';
      default:
        return '⚠️';
    }
  };

  if (isLoading) {
    return <div className="loading">Loading alerts...</div>;
  }

  return (
    <div className="alert-dashboard">
      <div className="dashboard-header">
        <h2>Alert Dashboard</h2>
      </div>

      <div className="dashboard-stats">
        <div className="stat-item">
          <div className="stat-value">{stats.totalAlerts}</div>
          <div className="stat-label">Total Alerts</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.activeAlerts}</div>
          <div className="stat-label">Active Alerts</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.resolvedAlerts}</div>
          <div className="stat-label">Resolved</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.criticalAlerts}</div>
          <div className="stat-label">Critical</div>
        </div>
      </div>

      <div className="alerts-container">
        {alerts.map((alert) => (
          <div key={alert.id} className="alert-card">
            <div className="alert-header">
              <div className="alert-type">
                <span className="alert-icon">{getAlertIcon(alert.type)}</span>
                <span className="alert-location">{alert.location}</span>
              </div>
              <span className="alert-timestamp">
                {new Date(alert.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="alert-content">
              <p className="alert-message">{alert.message}</p>
            </div>
            <div className="alert-actions">
              {alert.status === 'active' && (
                <>
                  <button 
                    className="action-button acknowledge"
                    onClick={() => handleAcknowledge(alert.id)}
                  >
                    Acknowledge
                  </button>
                  <button 
                    className="action-button resolve"
                    onClick={() => handleResolve(alert.id)}
                  >
                    Resolve
                  </button>
                </>
              )}
              {alert.status === 'acknowledged' && (
                <button 
                  className="action-button resolve"
                  onClick={() => handleResolve(alert.id)}
                >
                  Resolve
                </button>
              )}
              {alert.status === 'resolved' && (
                <span className="status-badge resolved">Resolved</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertDashboard; 