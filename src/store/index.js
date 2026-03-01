import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./slices/noteSlices"
const store = configureStore (
    {
        reducer: {
notes: noteReducer
        }
    }
)
export default store;