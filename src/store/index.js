import {configureStore} from '@reduxjs/toolkit';
import notesReducer from '../store/slices/notesSlice';

const store = configureStore({
  reducer: {
    // Add your reducers here
    notes: notesReducer,
  },
});

export default store;