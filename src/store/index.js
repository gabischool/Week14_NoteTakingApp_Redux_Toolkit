import { configureStore, ReducerType } from "@reduxjs/toolkit";
import noteReducer from "./slices/noteslice"
//configur the redux store
const store = configureStore ( {


    reducer:{
        note:noteReducer,
       
    }

})

export default store;
