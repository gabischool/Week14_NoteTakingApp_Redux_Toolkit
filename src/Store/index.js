// src/Store/index.js

import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice'; // ✅ reducer default export

export const store = configureStore({
  reducer: {
    notes: notesReducer, // ✅ ma aha notesSlice
  },
});
