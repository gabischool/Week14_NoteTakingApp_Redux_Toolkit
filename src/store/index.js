 import { configureStore } from '@reduxjs/toolkit';
 import noticeReducer from "../store/slices/noteSlice"




 const store =  configureStore({
    //  add reducer (slice function )
    reducer: {
      notes: noticeReducer
    }
 })

 export default store