import {configureStore} from "@reduxjs/toolkit";
import notesReducer from "../store/slices/noteSlices"

const store = configureStore({
reducer: {
    notes: notesReducer
}
})

export default store;