import { configureStore } from "@reduxjs/toolkit";
import  noteReducer  from "./slices/noteSlice";

//configure the store the redux store
const store = configureStore({
    reducer :{
      notes: noteReducer
    }

})

export  {store};