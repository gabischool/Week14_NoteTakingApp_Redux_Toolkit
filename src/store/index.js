import { configureStore } from "@reduxjs/toolkit";
import  noteReducer from "./slices/notesSlice";

const reducer = {
    note: noteReducer,
    delete: noteReducer

}

const store =configureStore({
    reducer
})
 export default store