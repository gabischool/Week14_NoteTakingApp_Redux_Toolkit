import { configureStore } from "@reduxjs/toolkit";
// import notesReducer from "../slices/noteslice"
import notesReducer from "./slices/noteslice"
const store = configureStore ({
    reducer:{
        notes:notesReducer,
    }
})

export default store;