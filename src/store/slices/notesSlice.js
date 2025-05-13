import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../baseUrl";
import axios from 'axios'


export const fetchNotes = createAsyncThunk (
    "notes/fetchNotes",
    async ()=>{
        const response = await axios.get (`${BASE_URL}`)
        return response.data;
    }
)

export const addNotes = createAsyncThunk(
    "notes/addNotes",
    async (notesData)=>{
        try {            
            const response = await axios.post (`${BASE_URL}`, notesData, {
                header:{
                    "Content-Type": "application/json"
                }
            })
            return response.data
        } catch(error){
            console.error("Server error response", error.response?.data);
            throw error;
        }
    }
)
 // Initial state should include:
 const initialState = {
    notes: [],
    loading: false,
    error: null,
  };

  const notesSlice = createSlice({
    name: "notes",
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(fetchNotes.pending,(state)=>{
                state.loading="loading"
            })
            .addCase(fetchNotes.fulfilled, (state, action)=> {
                state.loading= "succeeded",
                state.notes = action.payload
                state.error = null
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = "failed",
                state.error = action.error.message
            })
            .addCase(addNotes.fulfilled,(state, action)=>{
                state.notes.push(action.payload);
                state.error = null;
            })
            .addCase(addNotes.rejected, (state, action)=>{
                state.error = action.error.message;
            })
    }
  })
  export default notesSlice.reducer