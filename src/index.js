import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
root.render(
  <>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  <div className="header">
    <span className="active">BOT</span>
    <span>¿QUÉ HACEMOS?</span>
    <span>CASOS</span>
    <span>CLIENTES</span>
  </div>
  </>
  
);

reportWebVitals();
