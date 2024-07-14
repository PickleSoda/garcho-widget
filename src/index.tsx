import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
const root = ReactDOM.createRoot(document.getElementById('Garcho') as HTMLElement);
root.render(
  <React.StrictMode>
    <App domElement={document.getElementById('Garcho')}  />
  </React.StrictMode>
);