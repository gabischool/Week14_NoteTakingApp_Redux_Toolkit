import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./slices/noteSlices"; 

export const store = configureStore({
  reducer: {
    note: noteReducer, 
  },
});
