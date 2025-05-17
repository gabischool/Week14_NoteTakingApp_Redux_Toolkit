import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { BASE_URL } from "../baseUrl";
import axios from "axios";
import { act } from "react";


export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async() => {
    const response = await axios.get(`${BASE_URL}/notes`);
    return response.data;
  }
)

export const addNotes = createAsyncThunk(
  'notes/addNotes',
  async(noteData) => {
    try{
     const response = await axios.post (`${BASE_URL}/notes` , noteData , {
      headers: {
        "Content-Type": "application/json"
      }
     });

     return response.data
    } catch (error){
      console.log("server error response", error,response?.data);
      throw error;
    }
  })

  export const deleteNotes = createAsyncThunk(
    'notes/deleteNotes',
    async(delateData) =>  {
      try{
        const response = await axios.delete(`${BASE_URL}/notes`, deleteNotes, {
          headers: {
            "content-type": "application.json"
          }
        });

        return response.data
      }catch(error) {
        throw error;
      }
    }
  )
    
  const initialState = {
    notes: [],
    status: "idle", // "loading", "succeeded" , "failed";
    error: "null"
}

const noteSlice = createSlice ({
    name: "notes",
    initialState,
    extraReducers: (builder) => {
        builder
          .addCase(fetchNotes.pending,(state) => {
            state.status= "loading"
          })
          .addCase(fetchNotes.fulfilled, (state, action) => {
            state.status= "succeeded"
            state.notes= action.payload
            state.error= null
          })
          .addCase(fetchNotes.rejected, (state,action) => {
            state.status= "failed"
            state.error= action.error.message
          })
          .addCase(addNotes.fulfilled, (state,action) => {
            state.notes.push [action.payload];
            state.error = 'null'
          })
           .addCase(addNotes.rejected, (state,action) => {
            state.error= action.error.message
          })
          .addCase(deleteNotes.fulfilled, (state, action) => {
            state.notes.shift [action.payload];
            state.error= 'null'
          })
          .addCase(deleteNotes.rejected, (state,action) => {
            state.error= action.error.message
          })
          
    }
})


export default noteSlice.reducer