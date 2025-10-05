import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// createSlice = to creat a portion/slice of the store
// creatAsyncThunk = used to call API to do CRUD operation

// Step 1: Create and Import BASE URL
import { BASE_URL } from "../BaseUrl";import { Import } from "lucide-react";

// Step 2: Fetch all notes with createAsyncThunk Function using axios

export const fetchNote = createAsyncThunk(
    "notes/fetchNote",
    async() => {
        const response = await axios.get(`${BASE_URL}/notes`)
        return response.data
    }
)
// Step 3: Update note using createAsyncThunk

// Step 4: Delete note

// Step 5: Create new note

export const addNote = createAsyncThunk(
    "notes/addNote",
    async(noteData) => {
        try {
            const response = await axios.post(`${BASE_URL}/notes`, noteData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            return response.data

        } catch(error) {
            throw error
        }
    }
)

// Step 6: Create initial State

const initialState = {
    notes: [],
    status: "idle", // "loading", "success", "failed",
    error: null
}

const noteSlice = createSlice({
    name: "notes",
    initialState,
    extraReducers: (builder) => {
        // add cases
        builder
          .addCase(fetchNote.pending, (state) => {
            state.status = "loading"
          }) 
          .addCase(fetchNote.fulfilled, (state, action) => {
            state.status = "success",
            state.notes = action.payload,
            state.error = null
          })
          .addCase(fetchNote.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message
          })
          
          // Add note cases

          .addCase(addNote.pending, (state) => {
            state.status = "loading"
          }) 
          .addCase(addNote.fulfilled, (state, action) => {
            state.status = "success",
            state.notes.push(action.payload)
            state.error = null
          })
          .addCase(addNote.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message
          })
    }
})

export default noteSlice.reducer;