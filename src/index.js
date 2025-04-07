// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: Add CSS if needed
import App from './app';  // Ensure the App component is set up correctly
//import reportWebVitals from './reportWebVitals';  // Optional, can remove if not using

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

