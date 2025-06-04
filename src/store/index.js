// ✅ store/index.js
import { configureStore } from '@reduxjs/toolkit';
// Import your notes slice reducer
import notesReducer from './slices/notesSlice';

// 🏗️ Configure and export the Redux store
export const store = configureStore({
  reducer: {
    notes: notesReducer, // 💾 This manages the notes state
  },
});
