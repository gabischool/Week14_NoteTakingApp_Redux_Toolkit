import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notesSlice";
import categoriesReducer from "./slices/categoriesSlice";


export const store = configureStore({
  reducer: {
    notes: notesReducer,
    categories: categoriesReducer,
  },
});
