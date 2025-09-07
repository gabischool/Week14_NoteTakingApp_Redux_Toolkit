import { configureStore } from "@reduxjs/toolkit";
import Slice from './slice/slice';


const store = configureStore({
  reducer: {
    notes: Slice
  }
});

export default store;