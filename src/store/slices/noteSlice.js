import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../BaseUrl"


export const fetchNote = createAsyncThunk(
    "Notes/fetchNotes",
    async() => {
        const response = await axios.get(`${BASE_URL}/notes`)
        return response.data
    }
)

export const addNote= createAsyncThunk(
    "Notes/addNote",
    async(NotesData) => {
        try {

            const response = await axios.post(`${BASE_URL}/notes`,
                 NotesData, {
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