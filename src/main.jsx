// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 🟨 Ku dar Redux store & Provider
import { Provider } from 'react-redux';
import { store } from './Store'; // hubi path-ka Store/index.js

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
