import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "./store/notesReducer";

export const store = configureStore({
  reducer: notesReducer, 
});