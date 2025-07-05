import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice'; // Ensure this path is correct

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export { store };