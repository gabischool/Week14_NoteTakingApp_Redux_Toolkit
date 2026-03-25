import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./Slices/noteSlice"



const store = configureStore({
    reducer: {
     notes: noteReducer
    }
})

export default store;