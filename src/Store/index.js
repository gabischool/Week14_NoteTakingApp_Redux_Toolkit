import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./slices/notesSlice";


const Store = configureStore({
    reducer: {
        notes: notesReducer,

    }

})

export default Store;