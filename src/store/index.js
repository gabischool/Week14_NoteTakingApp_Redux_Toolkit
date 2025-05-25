import { configureStore } from '@reduxjs/toolkit';
import notesReducer from "./slices/noteSlice"

// configure the redux store
const store = configureStore({
    reducer: {
        notes: notesReducer
    }
})

export default store;