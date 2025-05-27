import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import { BASE_URL } from '../baseUrl';
import axios from 'axios';

// API CALL, use createAsynthunk

//fetch Notes
export const fetchNotes = createAsyncThunk(
    "notes/fetchNotes",
    async() => {
        const response = await axios.get(`${BASE_URL}/notes`)
        return response.data;
    }
)

//Add Notes
export const addNotes = createAsyncThunk(
    "notes/addNotes",
    async(noteData) => {
        try {
            const response = await axios.post(`${BASE_URL}/notes`, noteData, {
                headers: {
                    'content-type': 'application/json'
                }
            })
            return response.data

        } catch (error) {
            console.error("server error response:", error.response.data);
            throw error;
        }
    }
)


//Delete Note
export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async(id) => {
        try {
            
         await axios.delete(`${BASE_URL}/notes/${id}`)
        return id

        }catch (error) {
            console.log(error)
        }
    }
)


//Edit Note 
export const editNote = createAsyncThunk (
    "notes/editNote",
    async(editData) => {
        try {
            const response = await axios.put(`${BASE_URL}/notes`, editData, {
                headers: {
                    'contant-type' : 'edit/data/from-json'
                }
            })
        }catch(error) {
            console.error("server error response:", error.response.data);
            throw error;
        }
    }
)

const initialState = {
    notes: [],
    status: "idle", // "loading", "succeeded", "fiald"
    error: null
}

const notesSlice = createSlice({
    name: "notes",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.stutes = "loading"
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                //now evething is fetched,the server is ok
                state.stutes = "succeeded",
                state.notes = action.payload,
                state.error = null
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.status = "failed",
                state.error = action.error.message
            })
            .addCase(addNotes.fulfilled, (state, action) => {
                state.notes.push(action.payload)
                state.error = null;
            })
            .addCase(addNotes.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(deleteNote.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.notes = state.notes.filter((note) => note.id !== action.payload
                )
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.error = action.error.payload
            })
    }
})

export default notesSlice.reducer