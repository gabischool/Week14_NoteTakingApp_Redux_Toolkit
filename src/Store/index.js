import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./slices/noteSlice"
// Configure the redux store
const store = configureStore({
    reducer: {
        notes: noteReducer,
    }
})

export default store;