import { configureStore } from "@reduxjs/toolkit"
import NotesReducer from "./slices/noteSlice"

const store = configureStore({
    reducer: {
        notes: NotesReducer,
    }
})

export default store