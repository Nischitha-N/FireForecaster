// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // Wrap your app with Router

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router> {/* Wrap the app in Router to enable routing */}
    <App />
  </Router>
);
