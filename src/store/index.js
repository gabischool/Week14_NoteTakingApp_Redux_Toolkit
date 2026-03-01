import { configureStore } from '@reduxjs/toolkit' 
import notesReducer from './slices/notesSlice' 
import { Provider } from "react-redux";
import { store } from "./store";



export const store = configureStore({
     reducer: {
         notes: notesReducer, 
         
        <Provider store={store}>
  <App />
</Provider> 

     }, 
    }) 






export default store