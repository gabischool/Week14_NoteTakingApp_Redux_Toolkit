import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { BASE_URL } from "../baseUrl"
import axios from "axios"




// API CALL , use createAsyncThunk

// Fetch Notes
export const fetchNotes = createAsyncThunk (
    "notes/fetchNote" ,
    async()=> {
        const response = await axios.get(`${BASE_URL}/notes`);
        return response.data
    }
)

// Add Notes
export const addNote = createAsyncThunk(
    "notes/addNote",
    async(noteData) => {
        try {
            const response = await axios.post(`${BASE_URL}/notes`, noteData, {
                headers:{
                "Content-Type": "application/json"    
                }
            })
            return response.data
        } catch (error){
            console.error ("Server error response:", error.response?.data);
            throw error;
        }
    }
)
const initialState ={
    notes: [],
    status:"idle", 
    error: null
}

const noteSlice = createSlice ({
    name: "notes",
    initialState,
    extraReducers: (builder) => { 
        builder
        .addCase(fetchNotes.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchNotes.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.notes = action.payload;
            state.error = null;
        })
        .addCase(fetchNotes.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(addNote.fulfilled, (state, action) => {
            state.notes.push(action.payload);
            state.error = null;
        })
        .addCase(addNote.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
}) 

export default noteSlice.reducer 