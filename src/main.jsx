import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './store'
import { Provider } from "react-redux"; // ✅ sax


createRoot(document.getElementById('root')).render(
   <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);