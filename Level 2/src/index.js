import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Notice the new import
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);