// ✅ main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 🧠 Redux Provider & Store
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* 🔄 Provides Redux store to the app */}
      <App />
    </Provider>
  </StrictMode>
);
