import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/styles.css'; // Import the CSS file
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './context/UserContext'; // Importar UserProvider

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  );
} else {
  throw new Error("No 'root' component");
}

reportWebVitals();
